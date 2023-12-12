import prisma from '@/configs/prisma';
import Advanced from '@/components/Settings/Advanced/advanced';

export async function generateMetadata({ params }) {
    return {
        title: `${params.user} | Advanced settings`,
        description: `${params.user} | Advanced settings page`,
    };
}

export default async function SettingsAdvanced({ params }) {
    const user = await prisma.user.findUnique({
        where: {
            name: params.user,
        },
    });

    return <Advanced user={user} />;
}