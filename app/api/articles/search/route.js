import prisma from '@/configs/prisma';

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) return Response.json({});

    const articles = await prisma.article.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                {
                    tags: {
                        has: query,
                    },
                },
                {
                    content: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
            ],
        },
    });

    return Response.json({ articles });
}