'use client';
import Link from 'next/link';
import Search from './search';
import DropwdownLink from './dropdown-link';
import createRipples from '@/effects/createRipples';
import { FaUserCircle, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import { TiArrowSortedDown } from 'react-icons/ti';
import { PiSignInBold } from 'react-icons/pi';
import { FaUserPlus } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavRight({ styles, user }) {
    const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
    const [isMediaMatches, setIsMediaMatches] = useState(false);
    const pathname = usePathname();

    const dropdownBtn = useRef();
    const dropdown = useRef();

    const links = [
        {
            path: `/users/${user?.name}`,
            value: <><FaUserCircle size={20} />Profile</>,
        },
        {
            path: `/users/${user?.name}/settings`,
            value: <><FaUserCog size={20} />Settings</>,
        },
        {
            path: '/signout',
            value: <><FaSignOutAlt size={20} />Sign Out</>,
        },
    ]

    useEffect(() => {
        setIsMediaMatches(window.matchMedia('(max-width: 650px)').matches);
        document.addEventListener('click', hideDropdown);
        return () => document.removeEventListener('click', hideDropdown);
    }, []);

    const hideDropdown = (e) => {
        if (dropdownBtn.current && !dropdownBtn.current.contains(e.target)) {
            dropdown.current.classList.remove(styles.active);
            setIsDropdownExpanded(false);
        }
    };

    return (
        <div className={styles.navRight}>
            <Search styles={styles} />
            {user ? (
                <div className={styles.dropdownCnt}>
                    <div
                        className={styles.dropdownBtn}
                        ref={dropdownBtn}
                        onMouseDown={(e) => {
                            createRipples(e, styles);
                            setIsDropdownExpanded(state => !state);
                            dropdown.current.classList.toggle(styles.active);
                        }}
                    >
                        <div className={styles.image}>
                            <img src={user?.image} alt='' />
                        </div>
                        <div className={styles.name}>
                            <span>{user?.name}</span>
                        </div>
                        <div className={`${styles.arrow} ${isDropdownExpanded && styles.active}`}>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className={styles.dropdown} ref={dropdown}>
                        {links.map((link, index) => (
                            <DropwdownLink
                                key={index}
                                user={user}
                                path={link.path}
                                value={link.value}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <Link
                        className={styles.signin}
                        href={'/signin'}
                        style={
                            pathname === '/signin'
                                ? { display: 'none' }
                                : pathname === '/signup' && isMediaMatches
                                    ? { display: 'flex' }
                                    : null
                        }
                    >
                        <PiSignInBold size={20} /><span>Sign In</span>
                    </Link>
                    <Link
                        className={styles.signup}
                        href={'/signup'}
                        style={
                            pathname === '/signup'
                                ? { display: 'none' }
                                : pathname === '/signin' && isMediaMatches
                                    ? { display: 'flex' }
                                    : null
                        }
                    >
                        <FaUserPlus size={20} /><span>Sign Up</span>
                    </Link>
                    {/* <HeaderLink
                                className={styles.signin}
                                path={'/signin'}
                                value={<><LogIn size={20} />Sign In</>}
                            />
                            <HeaderLink
                                className={styles.signup}
                                path={'/signup'}
                                value={<><UserPlus size={20} />Sign Up</>}
                            /> */}
                </>
            )}
        </div>
    );
}