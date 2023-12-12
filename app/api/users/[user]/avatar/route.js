import path from 'path';
import prisma from '@/configs/prisma';
import { rm, writeFile } from 'fs/promises'
import { existsSync } from 'fs';

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
        await rm(`./public/${user.image}`);
    }

    const ext = path.extname(image.name);
    const buffer = Buffer.from(await image.arrayBuffer());
    const imagePath = `/avatars/${name}-${Date.now()}${ext}`;
    await writeFile(`./public${imagePath}`, buffer);

    await prisma.user.update({
        where: {
            name: name,
        },
        data: {
            image: imagePath,
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

    if (!existsSync(`./public${user.image}`) || user.image === '/media/avatar.svg') {
        const statusText = 'Image already deleted';
        return Response.json({ message: statusText }, { status: 400, statusText });
    }

    await rm(`./public/${user.image}`);
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