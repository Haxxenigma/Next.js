import styles from './header.module.scss';
import NavLeft from './HeaderComponents/nav-left';
import NavRight from './HeaderComponents/nav-right';

export default function Header({ user }) {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLeft styles={styles} user={user} />
                <NavRight styles={styles} user={user} />
            </nav>
        </header>
    );
}