import { cookies } from 'next/headers';

export function DELETE() {
    cookies().delete('auth');
    return Response.json({});
}