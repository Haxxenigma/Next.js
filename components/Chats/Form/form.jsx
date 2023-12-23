import styles from './form.module.scss';
import Submit from '@/components/Forms/FormComponents/submit';
import { MdAddAPhoto, MdOutlineGroupAdd } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { useForm } from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';

export default function ChatsForm({ setIsModalVisible, users, chat, onSubmit }) {
    const [objDataUrl, setObjDataUrl] = useState(null);
    const form = useRef();
    const {
        register,
        handleSubmit,
        watch,
        formState: {
            isSubmitSuccessful,
            isSubmitting,
            isDirty,
            errors,
        },
    } = useForm({
        defaultValues: {
            image: {},
            name: chat ? chat.name : '',
            members: chat ? chat.members.map((member) => member.name) : [],
        },
    });

    useEffect(() => {
        if (watch('image')[0]) {
            setObjDataUrl(URL.createObjectURL(watch('image')[0]));
        } else {
            setObjDataUrl(null);
        }
    }, [watch('image')]);

    const closeModal = (e) => {
        if (!form.current.contains(e.target)) {
            setIsModalVisible(false);
        }
    };

    return (
        <div className={styles.wrapper} onClick={(e) => closeModal(e)}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} ref={form}>
                <div className={styles.title}>
                    {chat ? (
                        <span>Edit Chat</span>
                    ) : (
                        <span>New Chat</span>
                    )}
                </div>
                <button
                    type='button'
                    className={styles.closeModal}
                    onClick={() => setIsModalVisible(false)}
                ><FaXmark size={30} />
                </button>
                <div className={styles.box}>
                    <input
                        type='file'
                        id='image'
                        name='image'
                        className={styles.file}
                        {...register('image')}
                    />
                    <label htmlFor='image' className={styles.upload}>
                        {objDataUrl || chat ? (
                            <img src={objDataUrl ? objDataUrl : chat.image} />
                        ) : (
                            <MdAddAPhoto size={24} />
                        )}
                    </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        className={`${styles.input} ${errors.name && styles.error}`}
                        placeholder='Chat name'
                        {...register('name', {
                            required: 'Name is requred',
                        })}
                    />
                </div>
                <div className={styles.select}>
                    <div className={styles.head}>
                        <MdOutlineGroupAdd size={24} />Add{chat && '/Remove'} members
                    </div>
                    <div className={styles.options}>
                        {users.map((user, index) => (
                            <label className={styles.option} htmlFor={index} key={index}>
                                <input
                                    type='checkbox'
                                    id={index}
                                    name={index}
                                    value={user.name}
                                    {...register('members')}
                                /><div className={styles.imageCnt}>
                                    <img className={styles.image} src={user.image} />
                                </div>{user.name}
                            </label>
                        ))}
                    </div>
                </div>
                <div className={styles.box}>
                    <button
                        type='button'
                        className={styles.cancel}
                        onClick={() => setIsModalVisible(false)}
                    >
                        <FaXmark size={20} />Cencel
                    </button>
                    <Submit
                        styles={styles}
                        isDirty={isDirty}
                        isSubmitting={isSubmitting}
                        isSubmitSuccessful={isSubmitSuccessful}
                        image={<GiCheckMark size={16} />}
                        value={chat ? 'Edit' : 'Create'}
                    />
                </div>
                {errors.root && <span className={styles.error}>{errors.root}</span>}
            </form>
        </div>
    );
}