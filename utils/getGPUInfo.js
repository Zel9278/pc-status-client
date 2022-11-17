const child_process = require("child_process");

module.exports = () => {
    let res = {name: 0, usage: 0, memory: {free: 0, total: 0, percent: 0}};
    try {
        const gpuInfo = child_process.execSync("nvidia-smi --format=csv --query-gpu=name,utilization.gpu,memory.free,memory.total", {
            windowsHide: true,
            stdio: "pipe",
        })
        .toString();
        gpuInfo.split("\n")
            .filter(e=>e)
            .map(e => e.replace(/ %| MiB| GiB|\r/g, "").split(/, /g))
            .at(1)
            .forEach((e, i) => {
                switch (i) {
                    case 0:
                        res.name = e;
                        break;
                    case 1:
                        res.usage = parseInt(e, 10);
                        break;
                    case 2:
                        res.memory.free = parseInt(e, 10)*1024*1024;
                        break;
                    case 3:
                        res.memory.total = parseInt(e, 10)*1024*1024;
                        break;
                }
            });
        res.memory.percent = Math.floor((1 - res.memory.free / res.memory.total) * 100);
    } catch (error) {
        res = null;
    }

    return res;
}
