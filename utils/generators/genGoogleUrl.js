export default function genGoogleUrl() {
    const url = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        response_type: 'code',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
        access_type: 'offline',
        prompt: 'consent',
    };

    const qs = new URLSearchParams(options);

    return `${url}?${qs.toString()}`;
}