import prisma from '@/configs/prisma';
import { post } from '@/utils/imgur';

export async function POST(req) {
    const data = await req.formData();
    const name = data.get('name');
    const image = data.get('image');
    const members = data.get('members').split(',').map((member) => ({ name: member }));

    const chat = await prisma.chat.create({
        data: {
            name: name,
            members: {
                connect: members,
            },
        },
        select: {
            id: true,
        },
    });

    if (image.name) {
        const buffer = await image.arrayBuffer();
        const { link, deletehash } = await post(buffer);

        await prisma.chat.update({
            where: {
                id: chat.id,
            },
            data: {
                image: link,
                imageHash: deletehash,
            },
        });
    }

    return Response.json(chat);
}