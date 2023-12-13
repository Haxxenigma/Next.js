import path from 'path';
import prisma from '@/configs/prisma';
import { put, del } from '@vercel/blob';

export async function POST(req, { params }) {
    const formData = await req.formData();
    const image = formData.get('image');
    const name = params.user;

    const user = await prisma.user.findUnique({
        where: {
            name: name,
        },
        select: {
            image: true,
        },
    });

    if (user.image !== '/media/avatar.svg') {
        await del(user.image);
    }

    const ext = path.extname(image.name);

    const blob = await put(`${name}-${Date.now()}${ext}`, image, {
        access: 'public',
        addRandomSuffix: false,
    });

    await prisma.user.update({
        where: {
            name: name,
        },
        data: {
            image: blob.url,
        },
    });

    return Response.json({ message: 'You have successfully updated your profile picture' });
}

export async function DELETE(_, { params }) {
    const name = params.user;

    const user = await prisma.user.findUnique({
        where: {
            name: name,
        },
        select: {
            image: true,
        },
    });

    if (user.image === '/media/avatar.svg') {
        const statusText = 'Image already deleted';
        return Response.json({ error: statusText }, { status: 400 });
    }

    await del(user.image);
    await prisma.user.update({
        where: {
            name: name,
        },
        data: {
            image: '/media/avatar.svg',
        },
    });

    return Response.json({ message: 'You have successfully deleted your profile picture' });
}