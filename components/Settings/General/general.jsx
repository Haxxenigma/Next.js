'use client';
import Link from 'next/link';
import Upload from './upload';
import axios from '@/configs/axios';
import Modal from '@/components/Modals/modal';
import styles from '../settings-form.module.scss';
import Submit from '@/components/Forms/FormComponents/submit';
import { GiCheckMark } from 'react-icons/gi';
import { FaXmark } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const fields = [
    {
        id: 'name',
        label: 'Name',
        required: 'Name is required',
    },
    {
        id: 'email',
        label: 'E-mail',
        required: 'E-mail address is required',
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Entered value does not match email format',
        },
    },
    {
        id: 'bio',
        label: 'Bio',
    },
    {
        id: 'birth',
        type: 'date',
        label: 'Birth date',
    },
    {
        id: 'image',
        type: 'file',
        label: 'Image',
        validate: (file) => {
            if (file.length) {
                const type = file[0].type;
                if (type !== 'image/png' && type !== 'image/jpeg') {
                    return 'Only png/jpeg files are valid';
                }
            }
        },
    },
];

export default function General({ user }) {
    const [isVisibleModal, setVisibleModal] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: {
            isSubmitting,
            isDirty,
            errors,
        },
    } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            bio: user.bio || '',
            birth: user.birth || '',
            image: {},
        },
    });
    const router = useRouter();

    const postAvatar = async (image, name) => {
        try {
            clearErrors();
            const formData = new FormData();
            formData.append('image', image);
            await axios.post(`/users/${name}/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (err) {
            setError('root', { type: 'root', message: err.response.statusText });
        }
    };

    const deleteAvatar = async () => {
        try {
            clearErrors();
            await axios.delete(`/users/${user.name}/avatar`);
            router.refresh();
        } catch (err) {
            setError('root', { type: 'root', message: err.response.statusText });
            setVisibleModal(false);
        }
    };

    const updateUser = async (data) => {
        try {
            clearErrors();
            data.name = data.name.replace(/[^a-zA-Z0-9_]/g, '_');
            await axios.patch(`/users/${user.name}`, data);
            if (data.image.length) await postAvatar(data.image[0], data.name);
            router.push(`/users/${data.name}/settings`);
            router.refresh();
        } catch (err) {
            setError('root', { type: 'root', message: err.response.statusText });
        }
    };

    return (
        <>
            {isVisibleModal && <Modal
                message={'Are you sure you want to delete the image?'}
                actionFn={deleteAvatar}
                setVisibleModal={setVisibleModal}
            />}
            <form
                className={styles.form}
                onSubmit={handleSubmit(updateUser)}
                encType='multipart/form-data'
            >
                <div className={styles.title}>
                    <h1>General</h1>
                </div>
                {fields.map((field, index) => (
                    <div className={styles.fieldCnt} key={index}>
                        <div className={`${styles.field} ${errors[field.id] && styles.errors}`}>
                            {field.id === 'image' && (
                                <Upload
                                    styles={styles}
                                    userImage={user.image}
                                    watch={watch}
                                    setVisibleModal={setVisibleModal}
                                />
                            )}
                            <input
                                className={styles.input}
                                type={field.type || 'text'}
                                id={field.id}
                                name={field.id}
                                autoComplete='off'
                                {...register(field.id, {
                                    required: field.required,
                                    pattern: field.pattern,
                                    validate: field.validate,
                                })}
                            />
                            <div className={styles.label}>{field.label}</div>
                        </div>
                        <div className={styles.field}>
                            {errors[field.id] && <span className={styles.errors}>{errors[field.id].message}</span>}
                            <div className={styles.label} />
                        </div>
                    </div>
                ))}
                <div className={styles.fieldCnt}>
                    <div className={styles.field}>
                        <div className={styles.submitCnt}>
                            <div className={styles.submitBtnCnt}>
                                <Submit
                                    styles={styles}
                                    isSubmitting={isSubmitting}
                                    isDirty={isDirty}
                                    image={<GiCheckMark size={16} />}
                                    value={'Save'}
                                />
                            </div>
                            <div className={styles.submitBtnCnt}>
                                <Link href={`/users/${user.name}`}><FaXmark size={20} />Cancel</Link>
                            </div>
                        </div>
                        <div className={styles.label} />
                    </div>
                    <div className={styles.field}>
                        {errors.root && <span className={styles.errors}>{errors.root.message}</span>}
                        <div className={styles.label} />
                    </div>
                </div>
            </form>
        </>
    );
}