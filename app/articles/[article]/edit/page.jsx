import PatchForm from '@/components/ArticleForms/patch-form';
import Forbidden from '@/components/Forbidden/forbidden';
import prisma from '@/configs/prisma';
import getUser from '@/utils/getUser';

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
    const user = await getUser();
    const article = await prisma.article.findUnique({
        where: {
            id: parseInt(params.article),
        },
    });

    if (!user || user.name !== article.authorName) return <Forbidden />;

    return <PatchForm article={article} />;
}