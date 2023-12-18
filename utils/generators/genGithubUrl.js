export default function genGithubUrl() {
    const url = 'https://github.com/login/oauth/authorize';
    const options = {
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        scope: 'user:email',
    };

    const qs = new URLSearchParams(options);

    return `${url}?${qs.toString()}`;
}