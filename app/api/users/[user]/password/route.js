import prisma from '@/configs/prisma';
import { compare, hash } from 'bcrypt';
import { validateFields } from '@/utils/validators';

export async function PATCH(req, { params }) {
    const data = await req.json();
    const name = params.user;
    const requiredFields = ['password1', 'password2', 'password3'];

    const res = await validateFields(data, requiredFields);
    if (res) return res;

    if (data.password2 !== data.password3) {
        return Response.json({ error: 'Passwords don\'t match' }, { status: 400 });
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
        const passwordHash = await hash(data.password2, 10);

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

    return Response.json({ error: 'Incorrect password' }, { status: 401 });
}