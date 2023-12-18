import genRandString from '@/utils/generators/genRandString';
import authenticate from '@/utils/authenticate';
import prisma from '@/configs/prisma';
import axios from '@/configs/axios';
import { hash } from 'bcrypt';

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');

    const url = 'https://oauth2.googleapis.com/token';
    const options = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
    };

    try {
        const res = await axios.post(url, options);

        const googleUser = (await axios.get(
            `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${res.data.access_token}`,
            {
                headers: {
                    'Authorization': `Bearer ${res.data.id_token}`,
                },
            },
        )).data;

        const user = await prisma.user.upsert({
            where: {
                email: googleUser.email,
            },
            update: {
                email: googleUser.email,
            },
            create: {
                email: googleUser.email,
                name: googleUser.given_name.replace(/[^a-zA-Z0-9_]/g, '_'),
                password: await hash(genRandString(8), 10),
                image: googleUser.picture,
                verified: googleUser.verified_email,
                provider: 'google',
            },
        });

        authenticate(user.id);
        return Response.redirect(new URL(`/users/${user.name}`, req.url));
    } catch (err) {
        const error = err.response ? err.response.data : err;
        return Response.json({ error });
    }
}