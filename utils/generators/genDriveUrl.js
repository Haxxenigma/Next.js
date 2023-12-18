export default function genDriveUrl() {
    const url = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        redirect_uri: process.env.NEXT_PUBLIC_DRIVE_REDIRECT_URI,
        response_type: 'code',
        scope: [
            'https://www.googleapis.com/auth/drive',
        ].join(' '),
        access_type: 'offline',
        prompt: 'consent',
    };

    const qs = new URLSearchParams(options);

    return `${url}?${qs.toString()}`;
}