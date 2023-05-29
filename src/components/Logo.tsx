import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
	return (
		<Link href="/" className="flex items-center gap-2">
			<Image
				src="/logo.svg"
				width={50}
				height={50}
				alt="Picture of Logo"
			></Image>
			<h1 className="text-3xl font-medium">eventwheel</h1>
		</Link>
	);
}
