'use client';
import Link from 'next/link';
import axios from '@/configs/axios';
import styles from '../settings-form.module.scss';
import Submit from '@/components/Forms/FormComponents/submit';
import { GiCheckMark } from 'react-icons/gi';
import { FaXmark } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function Password({ username }) {
    const [success, setSuccess] = useState(null);
    const {
        register,
        handleSubmit,
        setError,
        watch,
        reset,
        formState: {
            isSubmitting,
            isDirty,
            errors,
        },
    } = useForm({
        defaultValues: {
            password1: '',
            password2: '',
            password3: '',
        },
    });

    const fields = [
        {
            id: 'password1',
            label: 'Old password',
        },
        {
            id: 'password2',
            label: 'New password',
        },
        {
            id: 'password3',
            label: 'Confirm new password',
            validate: (value) => {
                if (value !== watch('password2')) {
                    return 'Passwords must match';
                }
            },
        },
    ];

    const changePwd = async (data) => {
        try {
            const res = await axios.patch(`/users/${username}/password`, data);
            setSuccess(res.data.message);
            reset();
        } catch (err) {
            setError('root', { type: 'root', message: err.response.data.error });
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(changePwd)}>
            <div className={styles.title}>
                <h1>Change password</h1>
            </div>
            {fields.map((field, index) => (
                <div className={styles.fieldCnt} key={index}>
                    <div className={`${styles.field} ${errors[field.id] && styles.errors}`}>
                        <input
                            className={styles.input}
                            id={field.id}
                            name={field.id}
                            type='password'
                            autoComplete='off'
                            {...register(field.id, {
                                required: `${field.label} is required`,
                                validate: field.validate,
                            })}
                        />
                        <div className={styles.label}>{field.label}</div>
                    </div>
                    <div className={styles.field}>
                        {errors[field.id] && <span className={styles.errors}>{errors[field.id].message}</span>}
                        <div className={styles.label}></div>
                    </div>
                </div>
            ))}
            <div className={styles.fieldCnt}>
                <div className={styles.field}>
                    <div className={styles.submitCnt}>
                        <div className={styles.submitBtnCnt}>
                            <Submit
                                styles={styles}
                                isDirty={isDirty}
                                isSubmitting={isSubmitting}
                                image={<GiCheckMark size={16} />}
                                value={'Change'}
                            />
                        </div>
                        <div className={styles.submitBtnCnt}>
                            <Link href={`/users/${username}`}><FaXmark size={20} />Cancel</Link>
                        </div>
                    </div>
                    <div className={styles.label} />
                </div>
                <div className={styles.field}>
                    {errors.root && <span className={styles.errors}>{errors.root.message}</span>}
                    <div className={styles.label} />
                </div>
                {success && (
                    <div className={styles.field}>
                        <span className={styles.success}>{success}</span>
                        <div className={styles.label} />
                    </div>
                )}
            </div>
        </form>
    );
}