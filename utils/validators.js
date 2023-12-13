export async function validateFields(data, requiredFields) {
    for (const field of requiredFields) {
        if (!data[field]) {
            const statusText = field.charAt(0).toUpperCase() + field.slice(1) + ' is required';
            return Promise.resolve(Response.json({ error: statusText }, { status: 400 }));
        }
    }
}

export async function validateEmail(email) {
    const exp = /\S+@\S+\.\S+/;
    const valid = exp.test(String(email).toLowerCase());

    if (!valid) {
        const statusText = 'The email you entered is not valid';
        return Promise.resolve(Response.json({ error: statusText }, { status: 400 }));
    }
}