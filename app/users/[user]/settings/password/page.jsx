import prisma from '@/configs/prisma';
import Password from '@/components/Settings/Password/password';

export async function generateMetadata({ params }) {
    return {
        title: `${params.user} | Password settings`,
        description: `${params.user} | Password settings page`,
    };
}

export default async function SettingsPassword({ params }) {
    const user = await prisma.user.findUnique({
        where: {
            name: params.user,
        },
    });

    return <Password user={user} />;
}