import '@/styles/reset.scss';
import jwt from 'jsonwebtoken';
import prisma from '@/configs/prisma';
import styles from '@/styles/main.module.scss';
import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';
import Providers from '@/components/Providers/providers';
import Forbidden from '@/components/Forbidden/forbidden';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

async function getUser() {
    const cookie = cookies().get('auth');

    if (!cookie) return null;

    const decoded = jwt.verify(cookie.value, process.env.JWT_KEY);

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: decoded.id,
        },
    });

    const { password, ...userData } = user;
    return userData;
}

export default async function RootLayout({ children }) {
    try {
        const user = await getUser();

        return (
            <Providers>
                <html lang='en' dark=''>
                    <body className={inter.className}>
                        <Header user={user} />
                        <main className={styles.main}>{children}</main>
                        <Footer />
                    </body>
                </html>
            </Providers>
        );
    } catch (err) {
        return <Forbidden />;
    }
}