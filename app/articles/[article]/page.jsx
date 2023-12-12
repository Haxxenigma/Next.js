import Article from '@/components/Article/article';
import prisma from '@/configs/prisma';

export async function generateMetadata({ params }) {
    const article = await prisma.article.findUnique({
        where: {
            id: parseInt(params.article),
        },
        select: {
            title: true,
        },
    });

    return {
        title: `${article.title} | Blog`,
        description: `${article.title} | Blog page`,
    };
}

export default async function RootArticle({ params }) {
    const article = await prisma.article.findUnique({
        where: {
            id: parseInt(params.article),
        },
        include: {
            author: {
                select: {
                    image: true,
                },
            },
        },
    });

    return (
        <Article article={article} />
    );
}