import '@/styles/reset.scss';
import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';
import Forbidden from '@/components/Forbidden/forbidden';
import styles from '@/styles/main.module.scss';
import getUser from '@/utils/getUser';
import { Inter } from 'next/font/google';

export const metadata = {
    title: {
        template: '%s | Next.js Web App',
        default: 'Next.js Web App',
    },
    description: 'Next.js 13 powered website',
};

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

export default async function RootLayout({ children }) {
    try {
        const user = await getUser();

        return (
            <html lang='en'>
                <body className={inter.className}>
                    <Header user={user} />
                    <main className={styles.main}>{children}</main>
                    <Footer />
                </body>
            </html>
        );
    } catch (err) {
        return <Forbidden />;
    }
}