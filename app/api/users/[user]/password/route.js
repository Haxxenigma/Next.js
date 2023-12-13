import prisma from '@/configs/prisma';
import { compare, genSalt, hash } from 'bcrypt';
import { validateFields } from '@/utils/validators';

export async function PATCH(req, { params }) {
    const data = await req.json();
    const name = params.user;
    const requiredFields = ['password1', 'password2', 'password3'];

    const res = await validateFields(data, requiredFields);
    if (res) return res;

    if (data.password2 !== data.password3) {
        const statusText = 'Passwords don\'t match';
        return Response.json({ error: statusText }, { status: 400, statusText });
    }

    const user = await prisma.user.findUnique({
        where: {
            name: name,
        },
        select: {
            password: true,
        },
    });

    if (user && await compare(data.password1, user.password)) {
        const salt = await genSalt(10);
        const passwordHash = await hash(data.password2, salt);

        await prisma.user.update({
            where: {
                name: name,
            },
            data: {
                password: passwordHash,
            },
        });

        return Response.json({ message: 'You changed your password successfully' });
    }

    const statusText = 'Incorrect password';
    return Response.json({ error: statusText }, { status: 401, statusText });
}