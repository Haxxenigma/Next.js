import { LuLoader } from 'react-icons/lu';

export default function Submit({ styles, isSubmitting, isDirty, image, value }) {
    return (
        <button
            type='submit'
            className={styles.submit}
            disabled={isSubmitting || !isDirty}>
            {isSubmitting ? (
                <LuLoader className={styles.loader} size={20} />
            ) : (
                image
            )}{value}
        </button>
    );
}