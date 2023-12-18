'use client';
import Image from 'next/image';
import axios from '@/configs/axios';
import styles from './form.module.scss';
import Input from './FormComponents/input';
import Submit from './FormComponents/submit';
import genGoogleUrl from '@/utils/generators/genGoogleUrl';
import genGithubUrl from '@/utils/generators/genGithubUrl';
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
            isSubmitSuccessful,
            isSubmitting,
            isDirty,
            errors,
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
            setError('root', { type: 'root', message: err.response.data.error });
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
                    <button type='button' className={styles.link}>Forgot password?</button>
                </div>
                <div className={styles.field}>
                    <Submit
                        styles={styles}
                        isDirty={isDirty}
                        isSubmitting={isSubmitting}
                        isSubmitSuccessful={isSubmitSuccessful}
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
                    <button
                        type='button'
                        className={styles.provider}
                        onClick={() => router.push(genGoogleUrl())}
                    >
                        <Image src={'/media/google.svg'} alt='' width={25} height={25} />
                    </button>
                    <button
                        type='button'
                        className={styles.provider}
                        onClick={() => router.push(genGithubUrl())}
                    >
                        <Image src={'/media/github.svg'} alt='' width={25} height={25} />
                    </button>
                </div>
            </form>
        </div>
    );
}