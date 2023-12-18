import PostForm from '@/components/ArticleForms/post-form';
import getUser from '@/utils/getUser';

export const metadata = {
    title: 'Article creation',
    description: 'Article creation page',
};

export default async function ArticlesCreate() {
    const user = await getUser();

    return <PostForm author={user.name} />;
}