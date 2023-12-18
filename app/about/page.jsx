import styles from './about.module.scss';
import { FaServer, FaUserShield } from 'react-icons/fa';
import { PiArticleMediumBold } from 'react-icons/pi';
import { LiaInfoSolid } from 'react-icons/lia';

export const metadata = {
    title: 'About',
    description: 'About page',
};

export default function About() {
    return (
        <div className={styles.about}>
            <div className={styles.header}>
                <LiaInfoSolid size={50} />About
            </div>
            <div className={styles.info}>
                <p>
                    This site is designed to learn Next.js, a framework for creating single page applications in React.
                    It is not intended for production use, but only for introduction to Next.js.
                    This site implements the following functions:
                </p>
                <div className={styles.list}>
                    <div className={styles.item}>
                        <div className={styles.image}>
                            <FaServer size={40} />
                        </div>
                        Server side rendering
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image}>
                            <FaUserShield size={40} />
                        </div>
                        User authentication and authorization using JWT tokens
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image}>
                            <PiArticleMediumBold size={40} />
                        </div>
                        Creating, deleting and editing blog articles
                    </div>
                </div>
            </div>
        </div>
    );
}