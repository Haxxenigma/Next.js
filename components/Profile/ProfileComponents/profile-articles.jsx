import Articles from '@/components/Articles/articles';
import Link from 'next/link';

export default function ProfileArticles({ styles, user }) {
    const articles = [];
    for (const article of user.articles) {
        articles.push({
            ...article,
            author: {
                image: user.image,
            },
        });
    }

    return (
        <div className={styles.articles}>
            <Link className={styles.title} href={`/users/${user.name}#articles`}>
                <h2 id='articles'>{user.name}'s articles</h2>
            </Link>
            <Articles articles={articles} />
        </div>
    );
}