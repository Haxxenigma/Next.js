import { cookies } from 'next/headers';

export async function middleware(req) {
    if (cookies().has('auth')) {
        if (req.nextUrl.pathname.startsWith('/signin') ||
            req.nextUrl.pathname.startsWith('/signup')) {
            return Response.redirect(new URL('/users', req.url));
        }
    } else {
        if (req.nextUrl.pathname.startsWith('/articles/create')) {
            return Response.redirect(new URL('/signin', req.url));
        }
    }
}