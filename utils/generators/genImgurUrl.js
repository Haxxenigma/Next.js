export default function genImgurUrl() {
    const url = 'https://api.imgur.com/oauth2/authorize';
    const options = {
        client_id: process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID,
        response_type: 'token',
    };

    const qs = new URLSearchParams(options);

    return `${url}?${qs.toString()}`;
}