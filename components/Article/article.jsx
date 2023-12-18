'use client';
import Link from 'next/link';
import Links from './links';
import axios from '@/configs/axios';
import Modal from '../Modals/modal';
import styles from './article.module.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Article({ article, user }) {
    const router = useRouter();
    const [isModalVisible, setVisibleModal] = useState(false);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    const deleteArticle = async () => {
        await axios.delete(`/articles/${article.id}`, { params: { preview: article.preview } });
        router.push('/blog');
        router.refresh();
    };

    return (
        <div className={styles.article}>
            {isModalVisible && (
                <Modal
                    message={'Are you sure you want to delete the article?'}
                    actionFn={deleteArticle}
                    setVisibleModal={setVisibleModal}
                />
            )}
            <Links styles={styles} article={article} user={user} setVisibleModal={setVisibleModal} />
            <div className={styles.title}>
                {article.title}
            </div>
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
            {article.preview && (
                <div className={styles.preview}>
                    <img src={article.preview} />
                </div>
            )}
            <div className={styles.content}>
                {article.content}
            </div>
        </div>
    );
}