import axios from '@/configs/axios';
import styles from './modal.module.scss';
import Submit from '@/components/Forms/FormComponents/submit';
import { GiCheckMark } from 'react-icons/gi';
import { FaXmark } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';

export default function ModalWInput({ setVisibleModal, username }) {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: {
            isSubmitSuccessful,
            isSubmitting,
            isDirty,
            errors,
        },
    } = useForm({
        defaultValues: {
            password: '',
        },
    });

    const router = useRouter();
    const modal = useRef();
    const modalCnt = useRef();

    const closeModal = (e) => {
        if (!modal.current.contains(e.target)) {
            setVisibleModal(false);
        }
    };

    const deleteAcc = async (data) => {
        try {
            clearErrors();
            await axios.delete(`/users/${username}`, { params: { password: data.password } });
            router.push('/');
            router.refresh();
        } catch (err) {
            setError('password', { type: 'password', message: err.response.data.error });
        }
    };

    return (
        <div className={styles.modalCnt} ref={modalCnt} onClick={e => closeModal(e)}>
            <form className={styles.modal} ref={modal} onSubmit={handleSubmit(deleteAcc)}>
                <div className={styles.question}>
                    <span>Are you sure you want to delete your profile?</span>
                    <span>Please, enter your password</span>
                </div>
                <div className={`${styles.inputCnt} ${errors.password && styles.errors}`}>
                    <input
                        type='password'
                        autoComplete='off'
                        id='password'
                        name='password'
                        className={styles.input}
                        {...register('password', {
                            required: 'Please, enter your password',
                        })}
                    />
                    {errors.password && <span className={styles.errors}>{errors.password.message}</span>}
                </div>
                <div className={styles.btns}>
                    <button type='button' onClick={() => setVisibleModal(false)}>
                        <FaXmark size={20} />Cancel
                    </button>
                    <Submit
                        styles={styles}
                        isDirty={isDirty}
                        isSubmitting={isSubmitting}
                        isSubmitSuccessful={isSubmitSuccessful}
                        image={<GiCheckMark size={16} />}
                        value={'Submit'}
                    />
                </div>
            </form>
        </div>
    );
}