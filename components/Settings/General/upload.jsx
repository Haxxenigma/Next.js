import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import { ImUpload } from 'react-icons/im';
import { MdDeleteForever } from 'react-icons/md';

export default function Upload({ styles, userImage, watch, setVisibleModal }) {
    const dropdown = useRef();
    const dropdownToggle = useRef();

    useEffect(() => {
        document.addEventListener('click', hideDropdown);
        return () => document.removeEventListener('click', hideDropdown);
    }, []);

    const showDropdown = () => {
        dropdown.current.classList.toggle(styles.show);
    };

    const hideDropdown = (e) => {
        if (!dropdownToggle.current.contains(e.target)) {
            dropdown.current.classList.remove(styles.show);
        }
    };

    return (
        <>
            <div className={styles.upload}>
                <div className={styles.image}>
                    <Image src={userImage} alt='' width={100} height={100} />
                </div>
                <div className={styles.dropdownCnt}>
                    <button
                        type='button'
                        className={styles.dropdownToggle}
                        ref={dropdownToggle}
                        onClick={() => showDropdown()}
                    ><BiSolidEdit size={20} />Edit</button>
                    <div className={styles.dropdown} ref={dropdown}>
                        <label className={styles.dropdownBtn} htmlFor='image'>
                            <ImUpload size={18} />Upload
                        </label>
                        <button
                            type='button'
                            className={styles.dropdownBtn}
                            onClick={() => setVisibleModal(true)}
                        ><MdDeleteForever size={20} />Remove</button>
                    </div>
                </div>
            </div>
            <div className={styles.field}>
                {watch('image')?.[0] && <span className={styles.uploadedFile}>{watch('image')[0]?.name}</span>}
                <div className={styles.label} />
            </div>
        </>
    );
}