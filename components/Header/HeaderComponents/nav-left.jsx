'use client';
import Link from 'next/link';
import Image from 'next/image';
import createRipples from '@/effects/createRipples';
import { FaHome, FaInfoCircle } from 'react-icons/fa';
import { PiSignInBold } from 'react-icons/pi';
import { FaUserPlus } from 'react-icons/fa6';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';
import { MdArticle } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';

const fullLinks = [
    {
        path: '/signin',
        label: 'Sign In',
        image: <PiSignInBold size={20} />,
    },
    {
        path: '/signup',
        label: 'Sign Up',
        image: <FaUserPlus size={20} />,
    },
    {
        path: '/',
        label: 'Home',
        image: <FaHome size={20} />,
    },
    {
        path: '/about',
        label: 'About',
        image: <FaInfoCircle size={20} />,
    },
    {
        path: '/blog',
        label: 'Blog',
        image: <MdArticle size={20} />,
    },
];

export default function NavLeft({ styles, user }) {
    const [isLinksCntVisible, setIsLinksCntVisible] = useState(false);
    const pathname = usePathname();
    const mobLinksCnt = useRef();

    const links = user ? fullLinks.slice(2) : fullLinks.slice();

    return (
        <div className={styles.navLeft}>
            <button
                className={`${styles.toggleNav} ${isLinksCntVisible && styles.active}`}
                onClick={() => {
                    mobLinksCnt.current.classList.toggle(styles.show);
                    setIsLinksCntVisible(state => !state);
                }}
            >
                <HiOutlineMenuAlt4 className={styles.menu} size={35} />
                <HiXMark className={styles.xmark} size={35} />
            </button>
            <div
                ref={mobLinksCnt}
                className={styles.mobLinksCnt}
                onClick={() => {
                    mobLinksCnt.current.classList.remove(styles.show);
                    setIsLinksCntVisible(state => !state);
                }}
            >
                {links.map((link, index) => (
                    <Link
                        className={`${styles.link} ${link.path === pathname && styles.active}`}
                        href={link.path}
                        key={index}
                    >
                        {link.image}{link.label}
                    </Link>
                ))}
            </div>
            <Link className={styles.logo} href={'/'}>
                <Image src={'/media/nextjs.svg'} alt='' width={50} height={50} />
            </Link>
            <div className={styles.linksCnt}>
                {fullLinks.slice(2).map((link, index) => (
                    <div
                        className={`${styles.linkCnt} ${link.path === pathname && styles.active}`}
                        onMouseDown={(e) => createRipples(e, styles)}
                        key={index}
                    >
                        <Link className={styles.link} href={link.path}>
                            {link.label}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}