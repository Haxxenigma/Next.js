import prisma from '@/configs/prisma';
import authenticate from '@/utils/authenticate';
import { validateFields } from '@/utils/validators';
import { compare } from 'bcrypt';

export async function POST(req) {
    const data = await req.json();
    const requiredFields = ['name', 'password'];

    const res = await validateFields(data, requiredFields);
    if (res) return res;

    const user = await prisma.user.findUnique({
        where: {
            name: data.name,
        },
        select: {
            id: true,
            password: true,
        },
    });

    if (user && await compare(data.password, user.password)) {
        authenticate(user.id);
        return Response.json({ message: 'Authentication was successful' });
    }

    return Response.json({ error: 'Incorrect login or password' }, { status: 401 });
}