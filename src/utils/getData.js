const os = require("os");
const path = require("path");
const diskUsage = require("diskusage");
const getMacOSRelease = require("./getMacOSRelease");
const getOSRelease = require("./getOSRelease");
const unixToDate = require("./unixToDate");
const getGPUInfo = require("./getGPUInfo");

const HOSTNAME = process.env.HOSTNAME || os.hostname();

module.exports = (result) => {
    const isWin = os.platform() === "win32";
    const isMac = os.platform() === "darwin";

    const du = diskUsage.checkSync(path.parse(process.cwd()).root)
    const version = isWin ? os.version() : isMac ? getMacOSRelease().name : getOSRelease()?.pretty_name;
    const _os = `${version}(${os.type()} ${os.platform()} ${os.arch()} ${os.release()})`;
    const model = os.cpus()[0] ? os.cpus()[0].model : "unknown cpu";
    const loadavg = isWin ? null : os.loadavg();
    const gpu = getGPUInfo();

    const data = {
        _os,
        hostname: HOSTNAME,
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
        gpu,
    };

    return data;
}
