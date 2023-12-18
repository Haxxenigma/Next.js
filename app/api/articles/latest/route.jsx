import prisma from '@/configs/prisma';

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const qty = searchParams.get('qty') || 5;

    const articles = await prisma.article.findMany({
        take: qty,
        orderBy: {
            createdAt: 'desc',
        },
    });

    return Response.json({ articles });
}