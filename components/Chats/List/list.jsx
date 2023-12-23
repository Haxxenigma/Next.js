'use client';
import Link from 'next/link';
import axios from '@/configs/axios';
import styles from './list.module.scss';
import ChatsForm from '@/components/Chats/Form/form';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';

export default function ChatsList({ user, users }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isMediaMatches, setIsMediaMatches] = useState(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setIsMediaMatches(window.matchMedia('(max-width: 650px)').matches);
    }, []);

    useEffect(() => {
        setIsModalVisible(false);
    }, [pathname]);

    const create = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('image', data.image[0]);
            formData.append('members', [...data.members, user.name]);

            const res = await axios.post('/chats', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            router.push(`/chats/${res.data.id}`);
            router.refresh();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {isModalVisible && (
                <ChatsForm
                    setIsModalVisible={setIsModalVisible}
                    users={users}
                    onSubmit={create}
                />
            )}
            <div
                className={styles.listCnt}
                style={isMediaMatches && /^\/chats\/\d+$/.test(pathname) ? { display: 'none' } : null}
            >
                <div className={styles.topbar}>
                    <div className={styles.title}>Chats</div>
                    <button
                        type='button'
                        className={styles.btn}
                        onClick={() => setIsModalVisible(true)}
                    >
                        <IoIosAdd size={32} />
                        <div className={styles.tooltip}>
                            New chat
                        </div>
                    </button>
                </div>
                <div className={styles.list}>
                    {user.chats.map((chat, index) => (
                        <Link
                            className={`${styles.item} ${pathname === `/chats/${chat.id}` && styles.active}`}
                            href={`/chats/${chat.id}`}
                            key={index}>
                            <div className={styles.imageCnt}>
                                <img className={styles.image} src={chat.image} />
                            </div>
                            <div className={styles.column}>
                                <div className={styles.name}>
                                    {chat.name}
                                </div>
                                {chat.messages[0] && (
                                    <div className={styles.message}>
                                        <div className={styles.author}>
                                            {chat.messages[0]?.authorName}:
                                        </div>
                                        <div className={styles.text}>
                                            {chat.messages[0]?.text}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}