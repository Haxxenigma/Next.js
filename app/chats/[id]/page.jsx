import Forbidden from '@/components/Forbidden/forbidden';
import styles from '@/app/chats/chats.module.scss';
import Chat from '@/components/Chats/Chat/chat';
import getUser from '@/utils/getUser';
import prisma from '@/configs/prisma';

export async function generateMetadata({ params }) {
    const chat = await prisma.chat.findUnique({
        where: {
            id: parseInt(params.id),
        },
        select: {
            name: true,
        },
    });

    return {
        title: chat.name,
        description: chat.name,
    };
}

export default async function ChatPage({ params }) {
    const chat = await prisma.chat.findUnique({
        where: {
            id: parseInt(params.id),
        },
        include: {
            members: {
                select: {
                    name: true,
                    image: true,
                },
            },
            messages: {
                include: {
                    author: {
                        select: {
                            image: true,
                        },
                    },
                },
            },
        },
    });

    const user = await getUser();

    const found = chat.members.find((member) => member.name === user.name);

    if (!found) return (
        <div className={styles.forbidden}>
            <Forbidden />
        </div>
    );

    const users = await prisma.user.findMany({
        where: {
            NOT: {
                name: user.name,
            },
        },
    });

    return (
        <Chat styles={styles} chat={chat} user={user} users={users} />
    );
}