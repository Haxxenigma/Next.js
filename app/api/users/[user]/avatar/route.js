import prisma from '@/configs/prisma';
import { post, del } from '@/utils/imgur';

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
            imageHash: true,
        },
    });

    if (user.imageHash) await del(user.imageHash);

    const buffer = await image.arrayBuffer();
    const { link, deletehash } = await post(buffer);

    await prisma.user.update({
        where: {
            name: name,
        },
        data: {
            image: link,
            imageHash: deletehash,
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
            imageHash: true,
        },
    });

    if (user.image === '/media/avatar.svg') {
        return Response.json({ error: 'Image already deleted' }, { status: 400 });
    }

    if (user.imageHash) await del(user.imageHash);

    await prisma.user.update({
        where: {
            name: name,
        },
        data: {
            image: '/media/avatar.svg',
            imageHash: null,
        },
    });

    return Response.json({ message: 'You have successfully deleted your profile picture' });
}