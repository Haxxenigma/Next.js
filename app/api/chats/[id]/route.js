import prisma from '@/configs/prisma';
import { post, del } from '@/utils/imgur';
import { validateFields } from '@/utils/validators';

export async function PATCH(req, { params }) {
    const id = params.id;
    const data = await req.formData();
    const name = data.get('name');
    const image = data.get('image');
    const members = data.get('members').split(',').map((member) => ({ name: member }));
    const requiredFields = ['name', 'members'];

    const res = await validateFields({ name, members }, requiredFields);
    if (res) return res;

    const chat = await prisma.chat.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name: name,
            members: {
                set: [],
                connect: members,
            },
        },
        select: {
            imageHash: true,
        },
    });

    if (image.name) {
        if (chat.imageHash) await del(chat.imageHash);
        const buffer = await image.arrayBuffer();
        const { link, deletehash } = await post(buffer);

        await prisma.chat.update({
            where: {
                id: parseInt(id),
            },
            data: {
                image: link,
                imageHash: deletehash,
            },
        });
    }

    return Response.json({ message: 'You have successfully updated your chat settings' });
}

export async function DELETE(_, { params }) {
    const id = params.id;
    const chat = await prisma.chat.delete({
        where: {
            id: parseInt(id),
        },
        select: {
            imageHash: true,
        },
    });

    if (chat.imageHash) await del(chat.imageHash);

    return Response.json({ message: 'You have successfully deleted the chat' });
}

export async function PUT(req, { params }) {
    const data = await req.json();
    const id = params.id;

    await prisma.chat.update({
        where: {
            id: parseInt(id),
        },
        data: {
            members: {
                disconnect: {
                    name: data.name,
                },
            },
        },
    });

    return Response.json({ message: 'You have successfully left the chat' });
}