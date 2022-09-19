require("dotenv").config();

const fs = require("fs");
const os = require("os");
const path = require("path");
const sio = require("socket.io-client");
const diskUsage = require("diskusage");
const cpuStats = require("cpu-stats");

const uri = process.env.PCSC_URI || "https://pcss.eov2.com";
const PASS = process.env.PASS;
const isWin = os.platform() === "win32";
const isMac = os.platform() === "darwin";

const client = sio(uri);

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

function getData(result) {
    const du = diskUsage.checkSync(path.parse(process.cwd()).root)
    const version = isWin ? os.version() : getOSRelease()?.pretty_name;
    const _os = `${version}(${os.type()} ${os.platform()} ${os.arch()} ${os.release()})`;
    const model = os.cpus()[0] ? os.cpus()[0].model : "unknown cpu";
    const loadavg = isWin ? null : os.loadavg();
    const data = {
        _os,
        hostname: os.hostname(),
        version: process.version,
        cpu: {
            model,
            cpus: result,
            percent: result.length === 0 ? 0 : Math.floor(result.map((a) => a.cpu).reduce((a, b) => a + b) / result.length),
        },
        ram: {
            free: os.freemem(),
            total: os.totalmem(),
            percent: Math.floor((1 - os.freemem() / os.totalmem()) * 100),
        },
        storage: {
            free: du.free,
            total: du.total,
            percent: Math.floor((1 - du.free / du.total) * 100),
        },
        uptime: unixToDate(os.uptime() * 1000),
        loadavg,
    };

    return data;
}

function unixToDate(time, option) {
    let totalSeconds = time / 1000
    let days = Math.floor(totalSeconds / 86400)
    totalSeconds %= 86400
    let hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    let minutes = Math.floor(totalSeconds / 60)
    totalSeconds %= 60
    let seconds = Math.floor(totalSeconds)

    let data = {
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
    }

    if (option?.returnData) return data
    if (option?.isSymbol)
        return `${data.days}\/${data.hours}\:${data.minutes}\:${data.seconds}`
    return `${data.days} days ${data.hours} hours ${data.minutes} minutes ${data.seconds} seconds`
}

function getOSRelease() {
    let releaseDetails;
    try {
        const data = fs.readFileSync("/etc/os-release", "utf8");
        const lines = data.split("\n");
        releaseDetails = Object.fromEntries(new Map(lines.filter(l=>l).map(l => {
            const line = l.split("=");
            line[0] = line[0].trim().toLowerCase();
            line[1] = line[1]?.replace(/"/g, "");
            return line;
        })));
    } catch (error) {
        releaseDetails = null;
    }
    return releaseDetails;
}
