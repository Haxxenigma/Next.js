import Link from 'next/link';

export default function DropwdownLink({ path, value }) {
    return (
        <Link href={path}>
            {value}
        </Link>
    );
}