'use client';
import Link from 'next/link';
import createRipples from '@/effects/createRipples';
import { IoSettings, IoShieldHalf, IoMenu } from 'react-icons/io5';
import { GrSettingsOption } from 'react-icons/gr';
import { FaXmark } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function SettingsNav({ styles, username }) {
    const pathname = usePathname();
    const nav = useRef();
    const navToggle = useRef();
    const navClose = useRef();

    const links = [
        {
            path: `/users/${username}/settings`,
            label: <><IoSettings size={20} />General</>,
        },
        {
            path: `/users/${username}/settings/password`,
            label: <><IoShieldHalf size={20} />Password</>,
        },
        {
            path: `/users/${username}/settings/advanced`,
            label: <><GrSettingsOption size={20} />Advanced</>,
        },
    ];

    useEffect(() => {
        document.addEventListener('click', closeNav);
        return () => document.removeEventListener('click', closeNav);
    }, []);

    const toggleNav = () => {
        nav.current.classList.toggle(styles.show);
    };

    const closeNav = (e) => {
        if (!nav.current.contains(e.target) &&
            !navToggle.current.contains(e.target) ||
            navClose.current.contains(e.target)) {
            nav.current.classList.remove(styles.show);
        }
    };

    return (
        <>
            <button className={styles.toggleNav} ref={navToggle} onClick={toggleNav}>
                <IoMenu size={40} />
            </button>
            <div className={styles.nav} ref={nav}>
                <div className={styles.title}>Settings
                    <button className={styles.closeNav} ref={navClose} onClick={(e) => closeNav(e)}>
                        <FaXmark size={36} />
                    </button>
                </div>
                {links.map((link, index) => (
                    <div className={styles.linkCnt} key={index}>
                        <Link
                            href={link.path}
                            className={`${styles.link} ${pathname === link.path && styles.active}`}
                            onMouseDown={(e) => createRipples(e, styles)}
                        >
                            {link.label}
                        </Link>
                    </div>
                ))}
            </div >
        </>
    );
}