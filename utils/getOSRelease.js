const fs = require("fs");

module.exports = () => {
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
