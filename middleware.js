import { cookies } from 'next/headers';

export async function middleware(req) {
    if (!cookies().has('auth')) return Response.redirect(new URL('/signin', req.url));
}

export const config = {
    matcher: ['/articles/create'],
};