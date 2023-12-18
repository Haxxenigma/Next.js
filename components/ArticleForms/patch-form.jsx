'use client';
import Form from './form';
import axios from '@/configs/axios';

export default function PatchForm({ article }) {
    const onSubmit = async (data) => {
        try {
            const { preview, ...postData } = data;
            const res = await axios.patch(`/articles/${article.id}`, {
                ...postData, author: article.authorName,
            });

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

    return <Form onSubmit={onSubmit} article={article} />;
}