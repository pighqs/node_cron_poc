import cron from 'node-cron'; // https://github.com/node-cron/node-cron
import express from 'express';

const app = express();
const https = require("https");

app.listen(7000);

const options = {
    compteur: 0,
    seconds: 10,
    url : 'https://api.kanye.rest',
}

console.log(`A new Kanye quote will be displayed every ${options.seconds} seconds`);
console.log(`***`);

cron.schedule(`*/${options.seconds} * * * * *`, async () => {
    const quote = await https.get(options.url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            console.log(`KANYE SAY : ${body.quote}`);
            console.log(`Cron Job has ran ${options.compteur} times (Running every ${options.seconds} seconds)`);
            console.log(`***`);
        });
    });
    options.compteur++;
});
