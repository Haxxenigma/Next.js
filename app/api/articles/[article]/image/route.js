import path from 'path';
import prisma from '@/configs/prisma';
import { rm, writeFile } from 'fs/promises';

export async function POST(req, { params }) {
    const formData = await req.formData();
    const preview = formData.get('preview');
    const articleId = params.article;

    const ext = path.extname(preview.name);
    const basename = path.basename(preview.name, ext);
    const buffer = Buffer.from(await preview.arrayBuffer());
    const imagePath = `/previews/${basename}-${Date.now()}${ext}`;
    await writeFile(`./public${imagePath}`, buffer);

    const article = await prisma.article.findUnique({
        where: {
            id: parseInt(articleId),
        },
        select: {
            preview: true,
        },
    });

    if (article.preview) await rm(`./public${article.preview}`);

    await prisma.article.update({
        where: {
            id: parseInt(articleId),
        },
        data: {
            preview: imagePath,
        },
    });

    return Response.json({ success: true });
}