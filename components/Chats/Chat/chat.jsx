'use client';
import Link from 'next/link';
import ChatInfo from './Info/info';
import axios from '@/configs/axios';
import Modal from '@/components/Modals/modal';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { TbReload } from 'react-icons/tb';
import { ImExit } from 'react-icons/im';
import { IoSend } from 'react-icons/io5';

export default function Chat({ styles, chat, user, users }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModal2Visible, setIsModal2Visible] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const messages = useRef();
    const refresh = useRef();
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            isSubmitting,
        },
    } = useForm();

    useEffect(() => {
        messages.current.scrollTo(0, messages.current.scrollHeight);
    }, [pathname, chat]);

    const leave = async () => {
        try {
            await axios.put(`/chats/${chat.id}`, { name: user.name });
            router.push('/chats');
            router.refresh();
        } catch (err) {
            console.error(err);
        }
    };

    const send = async (data) => {
        try {
            await axios.post(
                `/chats/${chat.id}/messages`,
                { ...data, name: user.name },
            );
            router.refresh();
            reset();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {isModalVisible && (
                <ChatInfo
                    chat={chat}
                    user={user}
                    users={users}
                    setIsModalVisible={setIsModalVisible}
                />
            )}
            {isModal2Visible && (
                <Modal
                    message={'Are you sure you want to leave the chat?'}
                    actionFn={leave}
                    setVisibleModal={setIsModal2Visible}
                />
            )}
            <div className={styles.chat}>
                <div className={styles.header}>
                    <Link className={styles.back} href={'/chats'}>
                        <IoIosArrowBack size={24} />
                    </Link>
                    <button className={styles.headerBtn} onClick={() => setIsModalVisible(true)}>
                        <div className={styles.imageCnt}>
                            <img className={styles.image} src={chat.image} />
                        </div>
                        <div className={styles.name}>
                            {chat.name}
                        </div>
                    </button>
                    <button className={styles.leave} onClick={() => setIsModal2Visible(true)}>
                        <ImExit size={24} />
                        <div className={styles.tooltip}>
                            Leave chat
                        </div>
                    </button>
                </div>
                <div className={styles.body} ref={messages}>
                    {chat.messages.length ? (
                        chat.messages.map((message, index) => (
                            <div
                                className={
                                    `${styles.messageCnt} ${message.authorName === user.name && styles.author}`
                                }
                                key={index}
                            >
                                <Link className={styles.imageCnt} href={`/users/${message.authorName}`}>
                                    <img className={styles.image} src={message.author.image} />
                                </Link>
                                <div className={styles.message}>
                                    <div className={styles.column}>
                                        <Link className={styles.author} href={`/users/${message.authorName}`}>
                                            {message.authorName}
                                        </Link>
                                        <div className={styles.text}>
                                            {message.text}
                                        </div>
                                    </div>
                                    <div className={styles.time}>
                                        {message.createdAt.toLocaleTimeString('en-US', {
                                            hour: 'numeric', minute: 'numeric',
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.empty}>
                            <span>No messages yet</span>
                        </div>
                    )}
                </div>
                <form className={styles.form} onSubmit={handleSubmit(send)}>
                    <button
                        type='button'
                        ref={refresh}
                        className={styles.refresh}
                        onClick={() => {
                            router.refresh();
                            refresh.current.disabled = true;
                            setTimeout(() => {
                                refresh.current.disabled = false;
                            }, 3000);
                        }}
                    ><TbReload size={20} /></button>
                    <input
                        className={styles.input}
                        type='text'
                        id='text'
                        name='text'
                        autoFocus
                        {...register('text', {
                            required: true,
                        })}
                    />
                    <button
                        className={styles.submit}
                        disabled={isSubmitting}
                        type='submit'
                    ><IoSend size={25} /></button>
                </form>
            </div>
        </>
    );
}