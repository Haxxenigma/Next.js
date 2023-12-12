import Link from 'next/link';
import styles from './footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <nav className={styles.nav}>
                <Link href={'terms'}>Terms</Link>
                <Link href={'privacy'}>Privacy</Link>
                <Link href={'copyright'}>Copyright</Link>
            </nav>
            <div className={styles.end}>
                &copy; Haxxenigma &middot; 2023-2024
            </div>
        </footer>
    );
}