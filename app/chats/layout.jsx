import getUser from '@/utils/getUser';
import prisma from '@/configs/prisma';
import styles from './chats.module.scss';
import ChatsList from '@/components/Chats/List/list';

export const metadata = {
    title: {
        template: '%s | Chat',
        default: 'Chats',
    },
    description: 'Chats',
};

export default async function ChatsLayout({ children }) {
    const user = await getUser(true);

    const users = await prisma.user.findMany({
        where: {
            NOT: {
                name: user.name,
            },
        },
    });

    return (
        <div className={styles.wrapper}>
            <ChatsList user={user} users={users} />
            {children}
        </div>
    );
}