import Link from 'next/link';
import axios from '@/configs/axios';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { IoMdSearch } from 'react-icons/io';
import { MdArticle } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';

export default function Search({ styles }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [articles, setArticles] = useState();
    const [query, setQuery] = useState('');
    const searchModal = useRef();
    const pathname = usePathname();

    useEffect(() => {
        if (query) fetchByQuery();
        else fetchLatest();
    }, [query]);

    useEffect(() => {
        setIsModalVisible(false);
    }, [pathname]);

    useEffect(() => {
        setQuery('');
    }, [isModalVisible]);

    const fetchLatest = async () => {
        const res = await axios.get('/articles');
        setArticles(res.data.articles);
    };

    const fetchByQuery = async () => {
        const res = await axios.get('search', { params: { query } });
        setArticles(res.data.articles);
    };

    return (
        <>
            <button
                className={styles.search}
                onClick={() => {
                    setIsModalVisible(true);
                    setTimeout(() => {
                        searchModal.current.querySelector('input').focus();
                    }, 200);
                }}
            >
                <IoMdSearch /><span>Search...</span>
            </button>
            <div
                className={`${styles.modalCnt} ${isModalVisible && styles.show}`}
                onClick={(e) => {
                    if (!searchModal.current.contains(e.target)) {
                        setIsModalVisible(false);
                    }
                }}
            >
                <div className={styles.searchModal} ref={searchModal}>
                    <input
                        className={styles.input}
                        value={query}
                        type='text'
                        id='q'
                        name='q'
                        placeholder='Search...'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className={styles.closeModal} onClick={() => setIsModalVisible(false)}>
                        <FaXmark size={24} />
                    </div>
                    {articles?.length ? (
                        <div className={styles.results}>
                            {articles?.map((article, index) => (
                                <Link className={styles.article} href={`/articles/${article.id}`} key={index}>
                                    <div className={styles.image}>
                                        <MdArticle size={25} />
                                    </div>
                                    <div className={styles.title}>
                                        {article.title}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.notFound}>
                            No results found for <span>'{query}'</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}