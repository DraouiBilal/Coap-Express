const button1 = document.getElementById('s1');
const button2 = document.getElementById('s2');
const buttonavg = document.getElementById('avg');
const ress = document.getElementById('res') as HTMLSpanElement;

const url = window.location.href;

const getTemp = async (server:number) => {
    const res = await fetch(`${url}server/${server}/temp`);
    const json = await res.json();
    return json.payload.temp;
}

button1!.addEventListener('click', async () => {
    const temp = await getTemp(1);
    ress!.innerHTML = `${temp}°C from server 1`;
})

button2!.addEventListener('click', async () => {
    const temp = await getTemp(1);
    ress!.innerHTML = `${temp}°C from server 2`;
})

buttonavg!.addEventListener('click', async () => {
    const res = await fetch(`${url}server/average`);
    const json = await res.json();
    const temp = json.payload.average;
    ress!.innerHTML = `${temp}°C which is the average`
})

