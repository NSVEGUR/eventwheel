import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
	return (
		<main className="min-w-screen flex h-full min-h-screen w-full flex-col items-start justify-center gap-5 p-10">
			<div className="flex items-center gap-2">
				<Link href="/">
					<Image
						src="/logo.svg"
						width={50}
						height={50}
						alt="Picture of Logo"
					></Image>
				</Link>
				<h1 className="text-3xl font-medium">
					Privacy Policy
				</h1>
			</div>
			<h1>
				Effective Date:{' '}
				<span className=" text-skin-complementary">
					1st June, 2023
				</span>
			</h1>
			<p>
				At EventWheel, we are committed to protecting the
				privacy and security of your personal information.
				This Privacy Policy explains how we collect, use,
				and disclose the information when you use our event
				ticket management application (&quot;App&quot;). By
				accessing or using the App, you consent to the
				practices described in this Privacy Policy.
			</p>
			<h1 className="text-2xl font-medium">
				1. Information We Collect
			</h1>
			<h2 className="text-xl font-medium">
				1.1 Information You Provide:
			</h2>
			<p>
				When you use EventWheel, we may collect the
				following information:
			</p>
			<ul className="list-disc">
				<li>
					Personal information such as your name, email
					address, and contact details.
				</li>
				<li>
					Payment information required for purchasing event
					tickets, including credit card details or other
					payment methods.
				</li>
				<li>
					Information provided when creating or managing
					events, such as event details, ticket prices,
					dates, and locations.
				</li>
			</ul>
			<h2 className="text-xl font-medium">
				1.2 Information We Automatically Collect:
			</h2>
			<p>
				When you use EventWheel, we may automatically
				collect certain information, including:
			</p>
			<ul className="list-disc">
				<li>
					Device information: We may collect information
					about the device you use to access the App,
					including the device model, operating system,
					unique device identifiers, and mobile network
					information.
				</li>
				<li>
					Log information: We collect server logs that may
					include information such as your IP address,
					browser type, and language, referring/exit pages,
					and other actions taken through the App.
				</li>
			</ul>
			<h1 className="text-2xl font-medium">
				2. Use of Information:
			</h1>
			<h2 className="text-xl font-medium">
				2.1 Personal Information:
			</h2>
			<p>
				We may use the personal information you provide to:
			</p>
			<ul className="list-disc">
				<li>
					Enable you to create and manage events through the
					App.
				</li>
				<li>
					Facilitate ticket purchases and process payments.
				</li>
				<li>
					Communicate with you about event updates,
					promotions, and other relevant information.
				</li>
				<li>
					Provide customer support and respond to your
					inquiries.
				</li>
				<li>
					Improve and personalize your experience with the
					App.
				</li>
			</ul>
			<h2 className="text-xl font-medium">
				2.2 Non-Personal Information:
			</h2>
			<p>
				We may use non-personal information collected
				through the App for various purposes, including:
			</p>
			<ul className="list-disc">
				<li>
					Analyzing usage patterns to improve the
					functionality and performance of the App.
				</li>
				<li>
					Monitoring and preventing fraud, security
					breaches, or other potentially illegal activities.
				</li>
				<li>
					Aggregating and anonymizing data for statistical
					or research purposes.
				</li>
			</ul>
			<h1 className="text-2xl font-medium">
				3. Information Sharing:
			</h1>
			<h2 className="text-xl font-medium">
				3.1 Third-Party Service Providers:
			</h2>
			<p>
				We may share your information with trusted
				third-party service providers who assist us in
				operating and managing the App, such as payment
				processors and customer support providers. These
				service providers are contractually obligated to
				protect your information and use it solely for the
				purposes we specify.
			</p>
			<h2 className="text-xl font-medium">
				3.2 Event Organizers:
			</h2>
			<p>
				If you purchase tickets for an event through
				EventWheel, we may share your information with the
				event organizers to facilitate ticket delivery,
				provide event-related updates, and enhance your
				event experience. However, we are not responsible
				for the privacy practices of event organizers and
				encourage you to review their respective privacy
				policies
			</p>
			<h2 className="text-xl font-medium">
				3.3 Legal Requirements:
			</h2>
			<p>
				We may disclose your information if required by law,
				court order, or governmental authority, or when we
				believe disclosure is necessary to protect our
				rights, property, or safety, or that of others.
			</p>
			<h1 className="text-2xl font-medium">
				4. Data Security
			</h1>
			<p>
				We take reasonable measures to protect the security
				of your information and prevent unauthorized access,
				disclosure, alteration, or destruction. However,
				please be aware that no method of transmission over
				the internet or electronic storage is 100% secure,
				and we cannot guarantee the absolute security of
				your information.
			</p>
			<h1 className="text-2xl font-medium">
				5. Your Choices:
			</h1>
			<p>
				You can control and update certain information
				through the App&apos;s settings or by contacting us
				directly. You may also choose not to provide certain
				information, but that may limit your access to
				certain features and functionalities of the App.
			</p>
			<h1 className="text-2xl font-medium">
				6. Children&apos;s Privacy:
			</h1>
			<p>
				EventWheel is not intended for use by individuals
				under the age of 18. We do not knowingly collect
				personal information from children. If we become
				aware that we have inadvertently collected personal
				information from a child, we will take steps to
				delete such information from our records.
			</p>
			<h1 className="text-2xl font-medium">
				7. Changes to this Privacy Policy:
			</h1>
			<p>
				We may update this Privacy Policy from time to time
				to reflect changes in our practices
			</p>
		</main>
	);
}
