module.exports = (time, option) => {
    let totalSeconds = time / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    totalSeconds %= 60;
    let seconds = Math.floor(totalSeconds);

    let data = {
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
    }

    if (option?.returnData) return data
    if (option?.isSymbol) return `${data.days}\/${data.hours}\:${data.minutes}\:${data.seconds}`;
    return `${data.days} days ${data.hours} hours ${data.minutes} minutes ${data.seconds} seconds`;
}
