import PatchForm from '@/components/ArticleForms/patch-form';
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
        title: `${article.title} | Article Edit`,
        description: `${article.title} | Article Edit page`,
    };
}

export default async function ArticleEdit({ params }) {
    const article = await prisma.article.findUnique({
        where: {
            id: parseInt(params.article),
        },
    });

    return <PatchForm article={article} />;
}