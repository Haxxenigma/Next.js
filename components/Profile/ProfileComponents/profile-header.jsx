import Link from 'next/link';
import { IoMdChatboxes } from 'react-icons/io';
import { IoSettings } from 'react-icons/io5';

export default function ProfileHeader({ styles, user, viewer }) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    return (
        <div className={styles.header}>
            <div className={styles.imageCnt}>
                <Link
                    className={styles.image}
                    href={viewer && viewer.name === user.name
                        ? `/users/${user.name}/settings`
                        : user.image
                    }
                >
                    <img src={user.image} alt='' />
                </Link>
                {viewer && viewer.name === user.name && (
                    <div className={styles.tooltip}>
                        Change your avatar
                    </div>
                )}
            </div>
            <div className={styles.info}>
                <div className={styles.name}>
                    {user.name}
                </div>
                <div className={styles.createdAt}>
                    Joined <span>{user.createdAt.toLocaleDateString('en-US', options)}</span>
                    {user.birth && (
                        <div className={styles.birth}>
                            / {new Date().getFullYear() - user.birth.getFullYear()} years old
                        </div>
                    )}
                </div>
                <div className={styles.bio}>
                    {user.bio}
                </div>
            </div>
            <div className={styles.actions}>
                {viewer && viewer.name === user.name && (
                    <Link className={styles.action} href={`/users/${user.name}/settings`}>
                        <IoSettings />
                        <div className={styles.tooltip}>
                            Settings
                        </div>
                    </Link>
                )}
                {user && (
                    <Link className={styles.action} href={'/chats'}>
                        <IoMdChatboxes />
                        <div className={styles.tooltip}>
                            Chat
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}