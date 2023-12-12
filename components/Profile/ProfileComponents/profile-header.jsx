'use client';
import Link from 'next/link';
import { IoMail, IoSettings } from 'react-icons/io5';
import { FaUserFriends } from 'react-icons/fa';

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
                {viewer?.name === user.name && (
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
            {viewer && (
                <div className={styles.actions}>
                    <Link className={styles.action} href={`/users/${user.name}/mail`}>
                        <IoMail />
                        <div className={styles.tooltip}>
                            Mail
                        </div>
                    </Link>
                    {viewer?.name === user.name && (
                        <Link className={styles.action} href={`/users/${user.name}/settings`}>
                            <IoSettings />
                            <div className={styles.tooltip}>
                                Settings
                            </div>
                        </Link>
                    )}
                    {viewer?.name !== user.name && (
                        <Link className={styles.action} href={`/api/friends/${user.name}`}>
                            <FaUserFriends />
                            <div className={styles.tooltip}>
                                Add to friends
                            </div>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}