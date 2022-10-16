import * as coap from 'coap'
import express from "express"
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.static(__dirname + '/public'))

const getTemp = async (port:number): Promise<number> => {
    const temp:{server:string,temp:number} = await new Promise((resolve, reject) => {
        const req = coap.request({
            pathname: 'temp',
            port: port,
            confirmable: false,
            // observe: true
        })
    
        req.on('timeout', (err) => {
            reject(err)
            process.exit(1)
        })
    
        req.on('response', (res: coap.IncomingMessage) => {
            resolve(JSON.parse(res.payload.toString()))
            res.on('end', () => {
                process.exit(0)
            })
        })

        req.end()
    })
    return temp.temp
}

app.get('/',(request, response) => {
    response.sendFile('./index.html',{root: __dirname})
})

app.get('/server/:id/temp', (request, response) => {
    const port = parseInt(request.params.id) === 1 ? 5683 : 5684
    const req = coap.request({
        pathname: 'temp',
        port,
        confirmable: false,
        // observe: true
    })

    req.on('timeout', (err) => {
        console.log('timeout')
        process.exit(1)
    })

    req.on('response', (res: coap.IncomingMessage) => {
        response.json({ payload: JSON.parse(res.payload.toString()) })
        res.on('end', () => {
            process.exit(0)
        })
    })

    req.end()
})

app.get('/server/average',async (request, response) => {
    const temp1 = await getTemp(5683)
    const temp2 = await getTemp(5684)
    const average = (temp1 + temp2) / 2
    response.json({ payload: { average } })
})

app.listen(80, () => {
    console.log('Express server started on port 80')
})