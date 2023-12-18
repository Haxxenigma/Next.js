import axios from '@/configs/axios';

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');

    const url = 'https://oauth2.googleapis.com/token';
    const options = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_DRIVE_REDIRECT_URI,
        grant_type: 'authorization_code',
    };

    try {
        const res = await axios.post(url, options);

        // list all drive files:
        const drive = (await axios.get(
            `https://www.googleapis.com/drive/v3/files?key=${process.env.GOOGLE_API}`,
            {
                headers: {
                    'Authorization': `Bearer ${res.data.access_token}`,
                },
            },
        )).data;
        console.log('DRIVE: ', drive);

        // upload to drive
        const contentType = 'text/plain';
        const boundary = '314159265358979323846';
        const delim = `\r\n--${boundary}\r\n`;
        const closeDelim = `\r\n--${boundary}--`;
        const metadata = {
            name: 'test.txt',
            mimeType: contentType,
        };

        const requestBody =
            delim + 'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delim + 'Content-Type:' + contentType + '\r\n\r\n' +
            'FC U MFS AAAAA Y THIS IS SO HARD FC UUUUUU!!!!!!!!!!' + closeDelim;

        const res2 = await fetch(
            `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&access_token=${res.data.access_token}`, {
            method: 'POST',
            body: requestBody,
            headers: {
                'Content-Type': `multipart/related; boundary="${boundary}"`,
            },
        });

        const upload = await res2.text();
        console.log('UPLOAD: ', upload);
        return Response.json(upload);
    } catch (err) {
        console.error(err);
        const error = err.response ? err.response.data : err;
        return Response.json({ error });
    }
}