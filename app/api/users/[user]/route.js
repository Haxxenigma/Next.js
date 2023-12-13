import prisma from '@/configs/prisma';
import { validateFields, validateEmail } from '@/utils/validators';
import { cookies } from 'next/headers';
import { compare } from 'bcrypt';
import { rmSync } from 'fs';

export async function PATCH(req, { params }) {
    const data = await req.json();
    const username = params.user;
    const requiredFields = ['name', 'email'];

    const res = await validateFields(data, requiredFields);
    if (res) return res;

    const res2 = await validateEmail(data.email);
    if (res2) return res2;

    const user = await prisma.user.findUnique({
        where: {
            name: username,
        },
        select: {
            email: true,
        },
    });

    const isExist = await prisma.user.findMany({
        where: {
            OR: [
                {
                    AND: [
                        {
                            name: {
                                equals: data.name,
                            },
                        },
                        {
                            NOT: {
                                name: {
                                    equals: username,
                                },
                            },
                        },
                    ],
                },
                {
                    AND: [
                        {
                            email: {
                                equals: data.email,
                            },
                        },
                        {
                            NOT: {
                                email: {
                                    equals: user.email,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        select: {
            id: true,
        },
    });

    if (isExist.length) {
        const statusText = 'Name or email already exists';
        return Response.json({ error: statusText }, { status: 409 });
    }

    data.birth = data.birth ? `${data.birth}T00:00:00.000Z` : null;

    await prisma.user.update({
        where: {
            name: username,
        },
        data: {
            name: data.name,
            email: data.email,
            bio: data.bio,
            birth: data.birth,
        },
    });

    return Response.json({ message: 'You have successfully updated your profile settings' });
}

export async function DELETE(req, { params }) {
    const searchParams = req.nextUrl.searchParams;
    const password = searchParams.get('password');
    const name = params.user;
    const requiredFields = ['name', 'password'];

    const res = await validateFields({ name, password }, requiredFields);
    if (res) return res;

    const user = await prisma.user.findUnique({
        where: {
            name: name,
        },
        select: {
            password: true,
            image: true,
        },
    });

    if (user && await compare(password, user.password)) {
        await prisma.user.delete({
            where: {
                name: name,
            },
        });

        if (user.image !== '/media/avatar.svg') {
            rmSync(`./public/${user.image}`);
        }

        cookies().delete('auth');
        return Response.json({ message: 'Account deleted successfully' });
    }

    const statusText = 'Incorrect password';
    return Response.json({ error: statusText }, { status: 401 });
}