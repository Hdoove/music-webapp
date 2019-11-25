export function changeTime(time: number) {
    let minutes = Math.floor(time / 60);
    let seconds: string = Math.floor(time - (minutes * 60)).toString();

    if (Number(seconds) < 10) {
        seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
}