import * as coap from 'coap'
import { Payload, PayloadType } from './interfaces/payload'


const server = coap.createServer()

server.on('request', (req: coap.IncomingMessage & { options: { name: string, value: any }[] }, res) => {
  const isObservable = req.options.find((option) => option.name === 'Observe')

  const payload: Payload = JSON.parse(req.payload.toString())
  const url = req.url.split('/')[1]
  if (url === 'time') {
    switch (payload.type) {
      case PayloadType.EPOCH:
        if (isObservable) {
          setInterval(() => {
            res.write(`epochs: ${Date.now()}`)
          }, 100)
        }

        else {
          res.end(`epochs: ${Date.now()}`)
        }
        break;

      case PayloadType.ISO:
        if (isObservable) {
          setInterval(() => {
            res.write(`ISO: ${new Date().toISOString()}`)
          }, 100)
        }

        else {
          res.end(`ISO: ${new Date().toISOString()}`)
        }
        break;

      default:
        break;
    }
  }
  else {
    res.end('404')
  }

})

// the default CoAP port is 5683
server.listen(() => {
  console.log('server started on port 5683')
})