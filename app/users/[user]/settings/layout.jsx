'use client';
import Loading from '@/app/loading';
import styles from './settings.module.scss';
import Forbidden from '@/components/Forbidden/forbidden';
import SettingsNav from '@/components/Settings/settings-nav';
import { useStore } from '@/hooks/useStore';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

function SettingsLayout({ children, params }) {
    const { userDataStore: { getUserData, userData } } = useStore();
    const viewer = userData?.value;
    const username = params.user;

    useEffect(() => {
        getUserData();
    }, []);

    if (!viewer) return <Loading />;

    if (params.user !== viewer?.name) return <Forbidden />;

    return (
        <div className={styles.layout}>
            <SettingsNav styles={styles} username={username} />
            <div className={styles.wrapper}>
                {children}
            </div>
        </div>
    );
}

export default observer(SettingsLayout);