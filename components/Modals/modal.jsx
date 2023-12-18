import Submit from '../Forms/FormComponents/submit';
import styles from './modal.module.scss';
import { useForm } from 'react-hook-form';
import { GiCheckMark } from 'react-icons/gi';
import { useRef } from 'react';
import { FaXmark } from 'react-icons/fa6';

export default function Modal({ message, actionFn, setVisibleModal }) {
    const modal = useRef();
    const modalCnt = useRef();
    const {
        handleSubmit,
        formState: {
            isSubmitSuccessful,
            isSubmitting,
        },
    } = useForm();

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
                <form className={styles.btns} onSubmit={handleSubmit(actionFn)}>
                    <button type='button' onClick={() => setVisibleModal(false)}>
                        <FaXmark size={20} />Cancel
                    </button>
                    <Submit
                        styles={styles}
                        isDirty={true}
                        isSubmitting={isSubmitting}
                        isSubmitSuccessful={isSubmitSuccessful}
                        image={<GiCheckMark size={16} />}
                        value={'Submit'}
                    />
                </form>
            </div>
        </div>
    );
}