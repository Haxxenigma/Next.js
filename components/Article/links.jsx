'use client';
import Link from 'next/link';
import { useStore } from '@/hooks/useStore';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

function Links({ styles, article, setVisibleModal }) {
    const { userDataStore: { getUserData, userData } } = useStore();
    const user = userData?.value?.name;

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className={styles.links}>
            <Link className={styles.link} href={'/blog'}>Back</Link>
            {user === article.authorName && (
                <>
                    <Link className={styles.link} href={`/articles/${article.id}/edit`}>Edit</Link>
                    <Link
                        className={styles.link}
                        href={`/articles/${article.id}/delete`}
                        onClick={(e) => {
                            e.preventDefault();
                            setVisibleModal(true);
                        }}
                    >Delete</Link>
                </>
            )}
        </div>
    );
}

export default observer(Links);