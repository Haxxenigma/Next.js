import styles from '@/styles/main.module.scss';

export default function Forbidden() {
    return (
        <div className={styles.forbidden}>
            <h1 className={styles.title}>Forbidden | 403</h1>
            <p className={styles.info}>You don't have permission to access this page</p>
        </div>
    );
}