'use client';
import styles from './profile.module.scss';
import ProfileHeader from './ProfileComponents/profile-header';
import ProfileArticles from './ProfileComponents/profile-articles';
import { useStore } from '@/hooks/useStore';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

function Profile({ user, articles }) {
    const { userDataStore: { getUserData, userData } } = useStore();
    const viewer = userData?.value;

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className={styles.wrapper}>
            <ProfileHeader styles={styles} user={user} viewer={viewer} />
            <ProfileArticles styles={styles} user={user} articles={articles} />
        </div>
    );
}

export default observer(Profile);