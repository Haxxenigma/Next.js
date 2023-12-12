'use client';
import Form from './form';
import axios from '@/configs/axios';
import { useEffect } from 'react';
import { useStore } from '@/hooks/useStore';
import { observer } from 'mobx-react';

function PostForm() {
    const { userDataStore: { getUserData, userData } } = useStore();

    useEffect(() => {
        getUserData();
    }, []);

    const author = userData?.value?.name;

    const onSubmit = async (data) => {
        try {
            const { preview, ...postData } = data;
            const res = await axios.post('/articles', { ...postData, author });

            if (preview.length) {
                const formData = new FormData();
                formData.append('preview', preview[0]);

                await axios.post(`/articles/${res.data.id}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            return res.data;
        } catch (err) {
            return { error: err.response.statusText };
        }
    };

    return <Form onSubmit={onSubmit} />;
}

export default observer(PostForm);