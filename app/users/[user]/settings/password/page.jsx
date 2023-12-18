import Password from '@/components/Settings/Password/password';

export async function generateMetadata({ params }) {
    return {
        title: `${params.user} | Password settings`,
        description: `${params.user} | Password settings page`,
    };
}

export default async function SettingsPassword({ params }) {
    return <Password username={params.user} />;
}