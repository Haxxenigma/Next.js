export default function genRandString(len) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;
    let counter = 0;
    let res = '';

    while (counter < len) {
        res += chars.charAt(Math.floor(Math.random() * charsLength));
        counter += 1;
    }

    return res;
}