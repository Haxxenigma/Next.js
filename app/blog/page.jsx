import Link from 'next/link';
import styles from './blog.module.scss';
import prisma from '@/configs/prisma';
import Articles from '@/components/Articles/articles';
import { FaRegEdit } from 'react-icons/fa'

export const metadata = {
    title: 'Blog',
    description: 'Blog page',
};

export default async function Blog({ searchParams }) {
    const tags = searchParams.tags?.split(' ');

    const articles = await prisma.article.findMany({
        where: tags && {
            tags: {
                hasSome: tags,
            },
        },
        include: {
            author: {
                select: {
                    image: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className={styles.blog}>
            <div className={styles.links}>
                <Link className={styles.link} href={'/articles/create'}>
                    <FaRegEdit size={18} />Create article
                </Link>
            </div>
            <Articles articles={articles} />
        </div>
    );
}