import styles from '@/styles/main.module.scss';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <h1 className={styles.title}>Not Found | 404</h1>
            <p className={styles.info}>It seems the page you requested does not exist</p>
            <Link className={styles.btn} href={'/'}>Take me home!</Link>
        </div>
    );
}