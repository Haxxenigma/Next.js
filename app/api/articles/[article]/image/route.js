import prisma from '@/configs/prisma';
import { post, del } from '@/utils/imgur';

export async function POST(req, { params }) {
    const formData = await req.formData();
    const preview = formData.get('preview');
    const articleId = params.article;

    const article = await prisma.article.findUnique({
        where: {
            id: parseInt(articleId),
        },
        select: {
            preview: true,
            previewHash: true,
        },
    });

    if (article.previewHash) await del(article.previewHash);
    const buffer = await preview.arrayBuffer();
    const { link, deletehash } = await post(buffer);

    await prisma.article.update({
        where: {
            id: parseInt(articleId),
        },
        data: {
            preview: link,
            previewHash: deletehash,
        },
    });

    return Response.json({ message: 'You have successfully updated the article preview' });
}