import prisma from '@/configs/prisma';

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) return Response.json({});

    const articles = await prisma.article.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: query,
                    },
                },
                {
                    tags: {
                        contains: query,
                    },
                },
                {
                    content: {
                        contains: query,
                    },
                },
            ],
        },
    });

    return Response.json({ articles });
}