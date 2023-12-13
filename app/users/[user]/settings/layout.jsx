import getUser from '@/utils/getUser';
import styles from './settings.module.scss';
import Forbidden from '@/components/Forbidden/forbidden';
import SettingsNav from '@/components/Settings/settings-nav';

export default async function SettingsLayout({ children, params }) {
    const viewer = await getUser();

    if (!viewer || params.user !== viewer.name) return <Forbidden />;

    return (
        <div className={styles.layout}>
            <SettingsNav styles={styles} username={params.user} />
            <div className={styles.wrapper}>
                {children}
            </div>
        </div>
    );
}