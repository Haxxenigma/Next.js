import jwt from 'jsonwebtoken';
import prisma from '@/configs/prisma';
import { validateFields, validateEmail } from '@/utils/validators';
import { hash, genSalt } from 'bcrypt';
import { cookies } from 'next/headers';

export async function GET() {
    const cookie = cookies().get('auth');

    if (!cookie) return Response.json({ auth: false });

    try {
        const decoded = jwt.verify(cookie.value, process.env.JWT_KEY);
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: decoded.id,
            },
        });
        const { password, ...userData } = user;
        return Response.json(userData);
    } catch (err) {
        console.log('ERROR', err)
        return Response.json({ message: 'Forbidden' }, { status: 403 });
    }
}

export async function POST(req) {
    const data = await req.json();

    const res = await validateFields(data);
    if (res) return res;

    const res2 = await validateEmail(data.email);
    if (res2) return res2;

    if (data.password1 !== data.password2) {
        const statusText = 'Passwords don\'t match';
        return Response.json({ error: statusText }, { status: 400, statusText });
    }

    const isExist = await prisma.user.findMany({
        where: {
            OR: [
                {
                    name: {
                        equals: data.name,
                    },
                },
                {
                    email: {
                        equals: data.email,
                    },
                },
            ],
        },
        select: {
            id: true,
        },
    });

    if (isExist.length) {
        const statusText = 'Name or email already exists';
        return Response.json({ error: statusText }, { status: 409, statusText });
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(data.password1, salt);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: passwordHash,
        },
        select: {
            id: true,
        },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '7d' });
    cookies().set('auth', token, { path: '/', });
    return Response.json({ message: 'User created successfully' });
}