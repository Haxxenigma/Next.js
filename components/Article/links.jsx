'use client';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import { RiEdit2Fill, RiDeleteBinFill } from 'react-icons/ri'

export default function Links({ styles, article, user, setVisibleModal }) {
    return (
        <div className={styles.links}>
            <Link className={styles.link} href={'/blog'}>
                <MdArrowBack size={20} /><span>Back</span>
                <div className={styles.tooltip}>Back</div>
            </Link>
            {user && user.name === article.authorName && (
                <>
                    <Link className={styles.link} href={`/articles/${article.id}/edit`}>
                        <RiEdit2Fill size={20} /><span>Edit</span>
                        <div className={styles.tooltip}>Edit</div>
                    </Link>
                    <button type='button' className={styles.link} onClick={() => setVisibleModal(true)}>
                        <RiDeleteBinFill size={20} /><span>Delete</span>
                        <div className={styles.tooltip}>Delete</div>
                    </button>
                </>
            )}
        </div>
    );
}