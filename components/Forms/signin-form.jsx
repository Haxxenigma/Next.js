'use client';
import Link from 'next/link';
import Image from 'next/image';
import axios from '@/configs/axios';
import styles from './form.module.scss';
import Input from './FormComponents/input';
import Submit from './FormComponents/submit';
import { PiSignInBold } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const fields = [
    {
        id: 'name',
        type: 'text',
        label: 'Name',
    },
    {
        id: 'password',
        type: 'password',
        label: 'Password',
    },
];

export default function SignInForm() {
    const router = useRouter();
    const {
        register,
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
            password: '',
        },
    });

    const signin = async (data) => {
        try {
            clearErrors();
            await axios.post('/signin', data);
            router.push(`/users/${data.name}`);
            router.refresh();
        } catch (err) {
            setError('root', { type: 'root', message: err.response.statusText });
        }
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit(signin)}>
                <div className={styles.title}>
                    <h1>SIGN IN</h1>
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
                    <Link className={styles.link} href={'/pwdreset'}>Forgot password?</Link>
                </div>
                <div className={styles.field}>
                    <Submit
                        styles={styles}
                        isSubmitting={isSubmitting}
                        isDirty={isDirty}
                        image={<PiSignInBold size={20} />}
                        value={'Sign In'}
                    />
                    {errors.root && <span className={styles.errors}>{errors.root.message}</span>}
                </div>
                <hr className={styles.hr} />
                <div className={styles.providers}>
                    <div className={styles.header}>
                        Continue with
                    </div>
                    <Link className={styles.provider} href={'/auth/google'}>
                        <Image src={'/media/google.svg'} alt='' width={25} height={25} />
                    </Link>
                    <Link className={styles.provider} href={'/auth/github'}>
                        <Image src={'/media/github.svg'} alt='' width={25} height={25} />
                    </Link>
                </div>
            </form>
        </div>
    );
}