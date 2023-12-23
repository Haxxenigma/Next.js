'use client';
import Link from 'next/link';
import axios from '@/configs/axios';
import styles from './info.module.scss';
import Modal from '@/components/Modals/modal';
import ChatsForm from '@/components/Chats/Form/form';
import { MdDeleteForever, MdGroup } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';
import { useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ChatInfo({ chat, user, users, setIsModalVisible }) {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const router = useRouter();
    const modal = useRef();

    const closeModal = (e) => {
        if (!modal.current.contains(e.target)) {
            setIsModalVisible(false);
        }
    };

    const remove = async () => {
        try {
            await axios.delete(`/chats/${chat.id}`);
            router.push('/chats');
            router.refresh();
        } catch (err) {
            console.error(err);
        }
    }

    const update = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('image', data.image[0]);
            formData.append('members', [...data.members, user.name]);

            await axios.patch(`/chats/${chat.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            router.refresh();
            setTimeout(() => {
                setIsEditModalVisible(false);
            }, 500);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {isEditModalVisible && (
                <ChatsForm
                    setIsModalVisible={setIsEditModalVisible}
                    users={users}
                    chat={chat}
                    onSubmit={update}
                />
            )}
            {isDeleteModalVisible && (
                <Modal
                    message={'Are you sure you want to delete the chat?'}
                    actionFn={remove}
                    setVisibleModal={setIsDeleteModalVisible}
                />
            )}
            <div className={styles.wrapper} onClick={(e) => closeModal(e)}>
                <div className={styles.modal} ref={modal}>
                    <div className={styles.title}>
                        Chat info
                    </div>
                    <button
                        type='button'
                        className={styles.closeModal}
                        onClick={() => setIsModalVisible(false)}
                    ><FaXmark size={30} />
                    </button>
                    <div className={styles.header}>
                        <div className={styles.imageCnt}>
                            <img className={styles.image} src={chat.image} />
                        </div>
                        {chat.name}
                        <button className={styles.delete} onClick={() => setIsDeleteModalVisible(true)}>
                            <MdDeleteForever size={26} />
                            <div className={styles.tooltip}>
                                Delete chat
                            </div>
                        </button>
                        <button className={styles.edit} onClick={() => setIsEditModalVisible(true)}>
                            <FaEdit size={24} />
                            <div className={styles.tooltip}>
                                Edit chat
                            </div>
                        </button>
                    </div>
                    <div className={styles.subtitle}>
                        <MdGroup size={24} />Members
                    </div>
                    <div className={styles.members}>
                        {chat.members.map((member, index) => (
                            <Link className={styles.member} href={`/users/${member.name}`} key={index}>
                                <div className={styles.imageCnt}>
                                    <img className={styles.image} src={member.image} />
                                </div>
                                {member.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}