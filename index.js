require("dotenv").config();

const sio = require("socket.io-client");
const cpuStats = require("cpu-stats");
const getData = require("./utils/getData");

const URI = process.env.PCSC_URI || "https://pcss.eov2.com/server";
const PASS = process.env.PASS;

const client = sio(URI);

client.on("hi", () => {
    console.log("hi from server");
    cpuStats(1000, (error, result) => {
        const data = getData(result);
        client.emit("hi", { pass: PASS, data });
    });
});

client.on("sync", () => {
    cpuStats(1000, (error, result) => {
        const data = getData(result);
        client.emit("sync", data);
    });
});
