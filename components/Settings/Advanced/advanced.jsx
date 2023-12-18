'use client';
import Link from 'next/link';
import styles from '../settings-form.module.scss';
import ModalWInput from '@/components/Modals/modal-w-input';
import { MdDeleteForever } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';
import { useState } from 'react';

export default function Password({ username }) {
    const [isModalVisible, setVisibleModal] = useState(false);

    return (
        <>
            {isModalVisible && <ModalWInput
                setVisibleModal={setVisibleModal}
                username={username}
            />}
            <form className={styles.form}>
                <div className={styles.title}>
                    <h1>Advanced</h1>
                </div>
                <div className={styles.fieldCnt}>
                    <div className={styles.field}>
                        <button
                            className={`${styles.btn} ${styles.dang}`}
                            onClick={(e) => {
                                e.preventDefault();
                                setVisibleModal(true);
                            }}
                        ><MdDeleteForever size={20} />Delete</button>
                        <div className={styles.label}>Delete account</div>
                    </div>
                </div>

                <div className={styles.fieldCnt}>
                    <div className={styles.field}>
                        <div className={styles.submitCnt}>
                            <div className={styles.submitBtnCnt}>
                                <Link href={`/users/${username}`}><FaXmark size={20} />Exit</Link>
                            </div>
                        </div>
                        <div className={styles.label} />
                    </div>
                    <div className={styles.field}>
                        {/* {errors.root && <span className={styles.errors}>{errors.root.message}</span>} */}
                        <div className={styles.label} />
                    </div>
                </div>
            </form>
        </>
    );
}