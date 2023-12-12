import PostForm from '@/components/ArticleForms/post-form';

export const metadata = {
    title: 'Article creation',
    description: 'Article creation page',
};

export default function ArticlesCreate() {
    return <PostForm />;
}