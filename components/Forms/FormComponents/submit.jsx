import { FaCheckDouble } from 'react-icons/fa6';
import { LuLoader } from 'react-icons/lu';

export default function Submit({ styles, isDirty, isSubmitting, isSubmitSuccessful, image, value }) {
    return (
        <button
            type='submit'
            className={`${styles.submit} ${isSubmitSuccessful && styles.successfull}`}
            disabled={isSubmitting || !isDirty || isSubmitSuccessful}>
            {isSubmitting ? (
                <><LuLoader className={styles.loader} size={20} />{value}</>
            ) : (isSubmitSuccessful ? (
                <><FaCheckDouble size={18} />Success!</>
            ) : (
                <>{image}{value}</>
            ))}
        </button>
    );
}