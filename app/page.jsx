import Link from 'next/link';
import styles from './home.module.scss';

export const metadata = {
    title: 'Home',
    description: 'Home page',
};

export default function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.title}>
                <h1>Next.js: my personal study project</h1>
            </div>
            <div className={styles.description}>
                <p>
                    This site is my personal learning project to learn the Next.js framework.<br />
                    It is not intended to be a production site, just to demonstrate what I have learned.<br />
                    This title and description are more personal, but they also convey the essence of the site
                </p>
            </div>
            <div className={styles.links}>
                <Link className={styles.link} href={'/signup'}>
                    Get Started
                </Link>
            </div>
        </div>
    );
}