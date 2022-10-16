import * as coap from 'coap'

const server1 = coap.createServer()
const server2 = coap.createServer()

const handler = (server: number) => {
    return (req: coap.IncomingMessage, res: coap.OutgoingMessage) => {
        const url = req.url.split('/')[1]
        if (url === 'temp') {
            const randomTemp = Math.floor(Math.random() * 100)
            res.end(JSON.stringify({server, temp: randomTemp}))
        }
        else {
            res.end('404')
        }
    }
}

server1.on('request', handler(1))
server2.on('request', handler(2))

// the default CoAP port is 5683
server1.listen(5683,() => {
    console.log('Coap server started on port 5683')
})

server2.listen(5684,() => {
    console.log('Coap server started on port 5684')
})