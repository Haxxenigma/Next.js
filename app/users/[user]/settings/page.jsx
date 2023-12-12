import prisma from '@/configs/prisma';
import General from '@/components/Settings/General/general';

export async function generateMetadata({ params }) {
    return {
        title: `${params.user} | Account settings`,
        description: `${params.user} | Account settings page`,
    };
}

export default async function SettingsGeneral({ params }) {
    const user = await prisma.user.findUnique({
        where: {
            name: params.user,
        },
    });

    if (user.birth) user.birth = user.birth.toISOString().substring(0, 10);

    return <General user={user} />;
}