# Coap-Express
This simple website was created in the **Full Stack Software Engineering for IoT**.

Its purpose is to show you how you can use web services to interact with a Iot devices.

## How to use
you have 3 approaches to use this project:

1. Use the website hosted on Versel: [https://coap-express.vercel.app/](https://coap-express.vercel.app/)

2. Clone the project locally, install the dependencies and then run it:

```bash
git clone https://github.com/DraouiBilal/Coap-Express.git
cd Coap-Express
npm install
npm run build
npm run start
```
You will need to specify the port you want to use in the .env file.

Then go to [http://localhost:YOUR_PORT/](http://localhost:YOUR_PORT/)

3. Use docker to run the project:

```bash
git clone https://github.com/DraouiBilal/Coap-Express.git
cd Coap-Express
docker build --build-arg PORT=YOUR_PORT -t coap .
docker run -it -p 5000:5000 --name=coap coap:latest