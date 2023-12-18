'use client';
import Form from './form';
import axios from '@/configs/axios';

export default function PostForm({ author }) {
    const onSubmit = async (data) => {
        try {
            const { preview, ...postData } = data;
            const res = await axios.post('/articles', { ...postData, author });

            if (preview.length) {
                const formData = new FormData();
                formData.set('preview', preview[0]);

                await axios.post(`/articles/${res.data.id}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            return res.data;
        } catch (err) {
            return { error: err.response.data.error };
        }
    };

    return <Form onSubmit={onSubmit} />;
}