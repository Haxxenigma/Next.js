import styles from './chats.module.scss';

export default function Chats() {
    return (
        <div className={`${styles.chat} ${styles.initial}`}>
            <div className={styles.empty}>
                <span>Select a chat to start messaging</span>
            </div>
        </div>
    );
}