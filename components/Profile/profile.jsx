import styles from './profile.module.scss';
import ProfileHeader from './ProfileComponents/profile-header';
import ProfileArticles from './ProfileComponents/profile-articles';

export default function Profile({ user, viewer, articles }) {
    return (
        <div className={styles.wrapper}>
            <ProfileHeader styles={styles} user={user} viewer={viewer} />
            <ProfileArticles styles={styles} user={user} articles={articles} />
        </div>
    );
}