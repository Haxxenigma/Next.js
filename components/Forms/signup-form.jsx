'use client';
import axios from '@/configs/axios';
import styles from './form.module.scss';
import Input from './FormComponents/input';
import Submit from './FormComponents/submit';
import { FaUserPlus } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function SignUpForm() {
    const router = useRouter();
    const {
        register,
        watch,
        handleSubmit,
        setError,
        clearErrors,
        formState: {
            errors,
            isDirty,
            isSubmitting,
        },
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password1: '',
            password2: '',
        },
    });

    const fields = [
        {
            id: 'name',
            type: 'text',
            label: 'Name',
        },
        {
            id: 'email',
            type: 'text',
            label: 'E-mail address',
            pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
            },
        },
        {
            id: 'password1',
            type: 'password',
            label: 'Password',
        },
        {
            id: 'password2',
            type: 'password',
            label: 'Confirm password',
            validate: (value) => {
                if (value !== watch('password1')) {
                    return 'Passwords must match';
                }
            },
        },
    ];

    const signup = async (data) => {
        try {
            clearErrors();
            data.name = data.name.replace(/[^a-zA-Z0-9_]/g, '_');
            await axios.post('/users', data);
            router.push(`/users/${data.name}`);
            router.refresh();
        } catch (err) {
            setError('root', { type: 'root', message: err.response.data.error });
        }
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit(signup)}>
                <div className={styles.title}>
                    <h1>SIGN UP</h1>
                </div>
                {fields.map((field, index) => (
                    <Input
                        styles={styles}
                        field={field}
                        register={register}
                        errors={errors}
                        key={index}
                    />
                ))}
                <div className={styles.field}>
                    <Submit
                        styles={styles}
                        isSubmitting={isSubmitting}
                        isDirty={isDirty}
                        image={<FaUserPlus size={20} />}
                        value={'Create account'}
                    />
                    {errors.root && <span className={styles.errors}>{errors.root.message}</span>}
                </div>
            </form>
        </div>
    );
}