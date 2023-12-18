'use client';
import Link from 'next/link';
import styles from './form.module.scss';
import Submit from '../Forms/FormComponents/submit';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ImUpload } from 'react-icons/im';
import { GiCheckMark } from 'react-icons/gi';
import { FaXmark } from 'react-icons/fa6';

const fields = [
    {
        id: 'title',
        label: 'Title',
        required: 'Title is required',
    },
    {
        id: 'tags',
        label: 'Tags (separated by spaces)',
    },
];

export default function Form({ onSubmit, article }) {
    const [objDataUrl, setObjDataUrl] = useState();
    const router = useRouter();
    const {
        register,
        watch,
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
            title: article ? article.title : '',
            content: article ? article.content : '',
            tags: article?.tags[0] ? article.tags.join(' ') : '',
            preview: {},
        },
    });

    useEffect(() => {
        if (watch('preview')[0]) {
            setObjDataUrl(URL.createObjectURL(watch('preview')[0]));
        } else {
            setObjDataUrl(null);
        }
    }, [watch('preview')]);

    const submit = async (data) => {
        clearErrors();
        const res = await onSubmit(data);
        if (res.error) {
            return setError('root', { type: 'root', message: res.error });
        }
        router.push('/articles/' + res.id);
        router.refresh();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
            {fields.map((field, index) => (
                <div className={`${styles.field} ${errors[field.id] && styles.errors}`} key={index}>
                    <input
                        className={`${styles[field.id]} ${watch(field.id) && styles.notEmpty}`}
                        id={field.id}
                        name={field.id}
                        type='text'
                        autoComplete='off'
                        {...register(field.id, {
                            required: field.required,
                        })}
                    />
                    <div className={styles.label}>{field.label}</div>
                    {errors[field.id] && <span className={styles.errors}>{errors[field.id].message}</span>}
                </div>
            ))}
            <div className={`${styles.field} ${errors.content && styles.errors}`}>
                <textarea
                    className={`${styles.content} ${watch('content') && styles.notEmpty}`}
                    id='content'
                    name='content'
                    rows='7'
                    {...register('content', {
                        required: 'Content is required',
                    })}
                />
                <div className={styles.label}>Content</div>
                {errors.content && <span className={styles.errors}>{errors.content.message}</span>}
            </div>
            <div className={`${styles.field} ${errors.preview && styles.errors}`}>
                <div className={styles.upload}>
                    <label className={styles.uploadBtn} htmlFor='preview'>
                        <ImUpload size={20} />Upload preview
                        <input
                            className={styles.preview}
                            id='preview'
                            name='preview'
                            type='file'
                            {...register('preview', {
                                validate: (file) => {
                                    if (file.length) {
                                        const type = file[0].type;
                                        if (type !== 'image/png' && type !== 'image/jpeg') {
                                            return 'Only png/jpeg files are valid';
                                        } else if (file[0].size > 5242880) {
                                            return 'Please upload an image smaller than 5 MB';
                                        }
                                    }
                                },
                            })}
                        />
                    </label>
                </div>
                <div className={styles.uploadedImage}>
                    <img className={styles.image} src={objDataUrl ? objDataUrl : article?.preview} />
                </div>
                {errors.preview && <span className={styles.errors}>{errors.preview.message}</span>}
            </div>
            <div className={styles.field}>
                <div className={styles.buttons}>
                    <Submit
                        styles={styles}
                        isDirty={isDirty}
                        isSubmitting={isSubmitting}
                        isSubmitSuccessful={isSubmitSuccessful}
                        image={<GiCheckMark size={16} />}
                        value={'Submit'}
                    />
                    <Link className={styles.cancel} href={'/blog'}><FaXmark size={20} />Cancel</Link>
                </div>
                {errors.root && <span className={styles.errors}>{errors.root.message}</span>}
            </div>
        </form>
    );
}