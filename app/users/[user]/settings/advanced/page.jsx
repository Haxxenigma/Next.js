import Advanced from '@/components/Settings/Advanced/advanced';

export async function generateMetadata({ params }) {
    return {
        title: `${params.user} | Advanced settings`,
        description: `${params.user} | Advanced settings page`,
    };
}

export default async function SettingsAdvanced({ params }) {
    return <Advanced username={params.user} />;
}