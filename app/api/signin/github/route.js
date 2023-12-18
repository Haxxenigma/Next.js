import genRandString from '@/utils/genRandString';
import authenticate from '@/utils/authenticate';
import prisma from '@/configs/prisma';
import axios from '@/configs/axios';
import { hash } from 'bcrypt';

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');

    const url = 'https://github.com/login/oauth/access_token';
    const options = {
        code: code,
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
    };

    try {
        const res = await axios.post(url, options);

        const githubUser = (await axios.get(
            `https://api.github.com/user`,
            {
                headers: {
                    Authorization: `bearer ${res.data.access_token}`,
                },
            },
        )).data;

        const [githubUserEmail] = (await axios.get(
            `https://api.github.com/user/emails`,
            {
                headers: {
                    Authorization: `bearer ${res.data.access_token}`,
                },
            },
        )).data;

        const { login, avatar_url, email, verified } = { ...githubUser, ...githubUserEmail };

        const user = await prisma.user.upsert({
            where: {
                email: email,
            },
            update: {
                email: email,
            },
            create: {
                email: email,
                name: login.replace(/[^a-zA-Z0-9_]/g, '_'),
                password: await hash(genRandString(8), 10),
                image: avatar_url,
                verified: verified,
                provider: 'github',
            },
        });

        authenticate(user.id);
        return Response.redirect(new URL(`/users/${user.name}`, req.url));
    } catch (err) {
        const error = err.response ? err.response.data : err;
        return Response.json({ error });
    }
}