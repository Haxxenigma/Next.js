import Link from 'next/link';
import styles from './articles.module.scss';
import { FaArrowRight } from 'react-icons/fa';

export default function Articles({ articles }) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    return (
        <div className={styles.articles}>
            {articles.map((article, index) => (
                <div className={styles.article} key={index}>
                    <div className={styles.stack}>
                        {article.preview && (
                            <Link className={styles.preview} href={'/articles/' + article.id}>
                                <img src={article.preview} />
                            </Link>
                        )}
                        <Link className={styles.title} href={'/articles/' + article.id}>
                            {article.title}
                        </Link>
                        <Link className={styles.author} href={'/users/' + article.authorName}>
                            <div className={styles.image}>
                                <img src={article.author.image} />
                            </div>
                            <div className={styles.body}>
                                <div className={styles.name}>
                                    {article.authorName}
                                </div>
                                <div className={styles.date}>
                                    {article.createdAt.toLocaleDateString('en-US', options)}
                                </div>
                            </div>
                        </Link>
                        <div className={styles.tags}>
                            {article.tags[0] ? (
                                article.tags.map((tag, index) => (
                                    <Link className={styles.tag} href={{
                                        pathname: '/blog',
                                        query: { tags: tag },
                                    }} key={index}>#{tag}</Link>
                                ))
                            ) : (
                                <span className={styles.noTags}>No tags</span>
                            )}
                        </div>
                        <div className={styles.content}>
                            {article.content}
                        </div>
                    </div>
                    <Link className={styles.button} href={'/articles/' + article.id}>
                        Read more<FaArrowRight size={14} />
                    </Link>
                </div>
            ))}
        </div>
    );
}