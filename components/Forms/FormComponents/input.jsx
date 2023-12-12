export default function Input({ styles, field, register, errors }) {
    return (
        <div className={`${styles.field} ${errors[field.id] && styles.errors}`}>
            <input
                className={styles.input}
                id={field.id}
                name={field.id}
                type={field.type}
                autoComplete='off'
                {...register(field.id, {
                    required: `${field.label} is required`,
                    pattern: field.pattern,
                    validate: field.validate,
                })}
            />
            <div className={styles.label}>{field.label}</div>
            {errors[field.id] && <span className={styles.errors}>{errors[field.id].message}</span>}
        </div>
    );
}