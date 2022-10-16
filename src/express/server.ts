import * as coap from 'coap'
import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.static(__dirname + '/client/public'))

const getTemp = async (port:number): Promise<number> => {
    const temp:{server:string,temp:number} = await new Promise((resolve, reject) => {
        const req = coap.request({
            pathname: 'temp',
            port: port,
            confirmable: false,
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

app.get('/',(_, response) => {
    response.sendFile('./client/public/index.html',{root: __dirname})
})

app.get('/server/:id/temp', async (request, response) => {
    const port = parseInt(request.params.id) === 1 ? 5683 : 5684
    const temp = await getTemp(port)
    response.json({ payload: {temp} })    
})

app.get('/server/average',async (_, response) => {
    const temp1 = await getTemp(5683)
    const temp2 = await getTemp(5684)
    const average = (temp1 + temp2) / 2
    response.json({ payload: { average } })
})

const PORT = process.env.PORT || 80

app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}`)
})