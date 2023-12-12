import styles from './modal.module.scss';
import { useRef } from 'react';

export default function Modal({ message, actionFn, setVisibleModal }) {
    const modal = useRef();
    const modalCnt = useRef();

    const closeModal = (e) => {
        if (!modal.current.contains(e.target)) {
            setVisibleModal(false);
        }
    };

    return (
        <div className={styles.modalCnt} ref={modalCnt} onClick={(e) => closeModal(e)}>
            <div className={styles.modal} ref={modal}>
                <div className={styles.question}>
                    <span>{message}</span>
                </div>
                <div className={styles.btns}>
                    <button type='button' onClick={() => setVisibleModal(false)}>Cancel</button>
                    <button type='button' onClick={actionFn}>Submit</button>
                </div>
            </div>
        </div>
    );
}