import prisma from '@/configs/prisma';

export async function POST(req, { params }) {
    const data = await req.json();
    const id = params.id;

    const message = await prisma.message.create({
        data: {
            chatId: parseInt(id),
            authorName: data.name,
            text: data.text,
        },
    });

    return Response.json(message);
}