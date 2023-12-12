import styles from './footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <nav className={styles.nav}>
                <a href={'https://vercel.com/haxxenigmas-projects/web-app'} target='_blank'>Project</a>
                <a href={'mailto:nkomyt@gmail.com'} target='_blank'>Email Me</a>
                <a href={'https://github.com/Haxxenigma/'} target='_blank'>Source Code</a>
            </nav>
            <div className={styles.end}>
                &copy; Haxxenigma &middot; 2023-2024
            </div>
        </footer>
    );
}