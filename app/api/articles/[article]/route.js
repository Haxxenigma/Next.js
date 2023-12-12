import prisma from '@/configs/prisma';
import { validateFields } from '@/utils/validators';
import { rm } from 'fs/promises';

export async function PATCH(req, { params }) {
    const data = await req.json();
    const articleId = params.article;

    const res = await validateFields(data);
    if (res) return res;

    const article = await prisma.article.update({
        data: {
            title: data.title,
            content: data.content,
            tags: data.tags,
            authorName: data.author,
        },
        select: {
            id: true,
        },
        where: {
            id: parseInt(articleId),
        },
    });

    return Response.json({ id: article.id });
}

export async function DELETE(req, { params }) {
    const searchParams = req.nextUrl.searchParams;
    const preview = searchParams.get('preview');
    const articleId = params.article;

    const res = await prisma.article.delete({
        where: {
            id: parseInt(articleId),
        },
        select: {
            id: true,
        },
    });

    if (preview) await rm(`public/${preview}`);

    return Response.json({ success: true, res });
}