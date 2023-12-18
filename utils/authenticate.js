import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default function authenticate(userId) {
    const token = jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: '7d' });
    cookies().set('auth', token, { path: '/', });
}