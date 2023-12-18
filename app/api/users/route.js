import prisma from '@/configs/prisma';
import authenticate from '@/utils/authenticate';
import { validateFields, validateEmail } from '@/utils/validators';
import { hash } from 'bcrypt';

export async function POST(req) {
    const data = await req.json();
    const requiredFields = ['name', 'email', 'password1', 'password2'];

    const res = await validateFields(data, requiredFields);
    if (res) return res;

    const res2 = await validateEmail(data.email);
    if (res2) return res2;

    if (data.password1 !== data.password2) {
        return Response.json({ error: 'Passwords don\'t match' }, { status: 400 });
    }

    const isExist = await prisma.user.findMany({
        where: {
            OR: [
                {
                    name: {
                        equals: data.name,
                    },
                },
                {
                    email: {
                        equals: data.email,
                    },
                },
            ],
        },
        select: {
            id: true,
        },
    });

    if (isExist.length) {
        return Response.json({ error: 'Name or email already exists' }, { status: 409 });
    }

    const passwordHash = await hash(data.password1, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: passwordHash,
        },
        select: {
            id: true,
        },
    });

    authenticate(user.id);
    return Response.json({ message: 'User created successfully' });
}