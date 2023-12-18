import prisma from '@/configs/prisma';
import { validateFields } from '@/utils/validators';
import { del } from '@/utils/imgur';

export async function PATCH(req, { params }) {
    const data = await req.json();
    const articleId = params.article;
    const requiredFields = ['title', 'content', 'author'];

    const res = await validateFields(data, requiredFields);
    if (res) return res;

    const article = await prisma.article.update({
        data: {
            title: data.title,
            content: data.content,
            tags: data.tags?.split(' '),
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

export async function DELETE(_, { params }) {
    const articleId = params.article;

    const article = await prisma.article.delete({
        where: {
            id: parseInt(articleId),
        },
        select: {
            previewHash: true,
        },
    });

    if (article.previewHash) await del(article.previewHash);

    return Response.json({ message: 'You have successfully deleted the article' });
}