import prisma from '@/configs/prisma';
import { validateFields } from '@/utils/validators';

export async function POST(req) {
    const data = await req.json();
    const requiredFields = ['title', 'content', 'tags', 'author'];

    const res = await validateFields(data, requiredFields);
    if (res) return res;

    const article = await prisma.article.create({
        data: {
            title: data.title,
            content: data.content,
            tags: data.tags,
            authorName: data.author,
        },
        select: {
            id: true,
        },
    });

    return Response.json({ id: article.id });
}

export async function GET() {
    const articles = await prisma.article.findMany({
        take: 5,
        orderBy: {
            createdAt: 'desc',
        },
    });

    return Response.json({ articles });
}