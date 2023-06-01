import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
	return (
		<main className="min-w-screen flex h-full min-h-screen w-full flex-col items-start justify-center gap-5 p-10">
			<div className="flex items-center gap-2">
				<Link href="/">
					<Image
						src="/logo.svg"
						width={30}
						height={30}
						alt="Picture of Logo"
					></Image>
				</Link>
				<h1 className="text-3xl font-medium">
					Terms Of Service
				</h1>
			</div>
			<h1>
				Effective Date:{' '}
				<span className=" text-skin-complementary">
					1st June, 2023
				</span>
			</h1>
			<p>
				Welcome to EventWheel! These Public Terms of Use
				(&quot;Terms&quot;) govern your access to and use of
				the EventWheel ticket management application
				(&quot;Application&quot;), which is provided by
				[Eventwheel] (&quot;we,&quot; &quot;us,&quot; or
				&quot;our&quot;). These Terms create a legally
				binding agreement between you (&quot;User&quot; or
				&quot;you&quot;) and EventWheel regarding your use
				of the Application. By accessing or using the
				Application, you agree to be bound by these Terms.
				If you do not agree with these Terms, please refrain
				from using the Application.
			</p>
			<h1 className="text-2xl font-medium">
				1. Use of the Application
			</h1>
			<h2 className="text-xl font-medium">
				1.1 Eligibility:
			</h2>
			<p>
				To use the Application, you must be at least 18
				years old or have the legal capacity to enter into a
				contract. By using the Application, you represent
				and warrant that you meet these requirements.
			</p>
			<h2 className="text-xl font-medium">1.2 License:</h2>
			<p>
				Subject to these Terms, we grant you a limited,
				non-exclusive, non-transferable, and revocable
				license to access and use the Application for its
				intended purposes.
			</p>
			<h2 className="text-xl font-medium">
				1.3 User Account:
			</h2>
			<p>
				In order to access certain features of the
				Application, you may be required to create a user
				account. You are responsible for maintaining the
				confidentiality of your account credentials and for
				all activities that occur under your account. You
				agree to provide accurate and up-to-date information
				during the registration process and to update your
				information as necessary.
			</p>
			<h2 className="text-xl font-medium">
				1.4 Prohibited Activities:
			</h2>
			<p>You agree not to:</p>
			<ul className="list-disc">
				<li>
					Use the Application for any unlawful, fraudulent,
					or unauthorized purpose.
				</li>
				<li>
					Interfere with or disrupt the functioning of the
					Application or its servers.
				</li>
				<li>
					Circumvent or manipulate the security features of
					the Application.
				</li>
				<li>
					Collect or store personally identifiable
					information of other users without their consent.
				</li>
				<li>
					Use the Application to engage in any form of
					spamming, advertising, or solicitation.
				</li>
				<li>
					Impersonate any person or entity or misrepresent
					your affiliation with any person or entity.
				</li>
			</ul>
			<h1 className="text-2xl font-medium">
				2. Listing and Selling the tickets
			</h1>
			<ul className=" list-decimal">
				<li>
					From listing in Eventwheel, the sellers are
					offering to sell or distribute the tickets for
					buyers to attend the event. Its completely sellers
					responsibility to clearly outline the restrictions
					on ticket to a buyer and its sellers
					responsibility for the listing that they post on
					Eventwheel. Any changes in the listing must be
					clear to the users and buyers immediately.
				</li>
				<li>
					Listing Representation made by the Seller about
					the details relevant to the Ticket and Event, and
					their accuracy. All Promoters/Hosts will act
					ethically and in good faith, and will ensure that
					the events they are selling on Universe are sold
					to fans as marketed.
				</li>
				<li>
					<b>Service charge:</b> A seller shell elect the
					whether service charge paid by the user or buyer.
				</li>
				<li>
					The seller must list the all the details of the
					event in every field. He must list the FAQ for the
					buyers if its needed.
				</li>
				<li>
					Seller has to clearly update the refund policies
					to the users. Also, he must be clear to the
					customers on Name of event, Performers, Location
					of the event, Date of the event, The type of
					ticket(eg, VIP, Regular or any other) , any
					additional information, rules and responsibilities
					of the event
				</li>
				<li>
					The Seller is responsible for ensuring that the
					Sale Price includes all taxes required on
					Listings, including VAT. If in doubt, the Seller
					should seek the advice of a tax expert to
					determine which taxes need to be collected from
					the Buyer.
				</li>
				<li>
					Seller is completely responsible for insurance
					that may required for any event.
				</li>
				<li>
					Event cancellations and postpones or amendments
					should be responsible by seller and seller or
					organizer has to clarify the buyers.
				</li>
				<li>
					Eventwheel is not responsible for any event listed
					and published by the seller. If ticket is not
					sold, Eventwheel is not responsible.
				</li>
				<li>
					When sellers create a listing, they are required
					to follow all relevant laws, regulations, and the
					terms outlined in the agreement. If a seller is
					conducting business operations, they must identify
					themselves as a business by using a business
					account. Sellers who are operating as a business
					are responsible for adhering to all applicable
					laws and regulations related to their role as a
					trader. Eventwheel does not assume any
					responsibility for ensuring a seller&apos;s
					compliance with applicable laws, rules, or
					regulations.
				</li>
				<li>
					The seller is responsible for taxes which included
					in sale price in the listings. If needed, seller
					has to seek the guidance from tax experts in the
					region.
				</li>
				<li>
					Eventwheel fallows stripe payment processing
					method which has to selected by the sellers when
					the create the event. Seller has to review the
					payment policies for stripe.
				</li>
				<li>
					Eventwheel is not responsible if there is any
					dispute between seller and buyer, If buyer
					disputes any transaction value.
				</li>
			</ul>
			<h1 className="text-2xl font-medium">
				3. Stripe payments & Payments
			</h1>
			<h2 className="text-xl font-medium">
				3.1 Payment Processing:
			</h2>
			<p>
				As we utilize Stripe as our payment gateway, you
				acknowledge and agree that any information you
				provide during the payment process is subject to
				Stripe&apos;s terms, privacy policy, and data
				handling practices. We encourage you to review
				Stripe&apos;s policies and practices to understand
				how your information is processed and secured
			</p>
			<h2 className="text-xl font-medium">
				3.2 Service Charges:
			</h2>
			<p>
				A service charge is applicable to the buyer. This
				charge, if applicable, will be clearly communicated
				during the checkout process. The service charge is
				non-refundable unless the seller agrees to provide a
				refund as per their cancellation and refund policies
			</p>
			<h2 className="text-xl font-medium">
				3.3 Taxes and Fees:
			</h2>
			<p>
				The seller is responsible for ensuring that the sale
				price listed includes all applicable taxes, such as
				VAT or other transaction-related fees. If there is
				any uncertainty regarding tax obligations, sellers
				are advised to seek guidance from tax experts to
				determine the required tax collection from buyers.
				EventWheel does not assume responsibility for a
				seller&apos;s compliance with tax laws and
				regulations.
			</p>
			<h2 className="text-xl font-medium">
				3.4 Payment Disputes:
			</h2>
			<p>
				In the event of any payment-related disputes or
				issues, please contact the seller directly as they
				are responsible for addressing and resolving such
				matters. EventWheel does not assume responsibility
				for resolving payment disputes between buyers and
				sellers
			</p>
			<h1 className="text-2xl font-medium">
				4. Actions taken to ensure compliance with sellers
			</h1>
			<p>
				Cancellations: Eventwheel has a right to cancel the
				Listings/ Organizers accounts/ Transactions in its
				sole discretion. For any reason and at any time.
			</p>
			<h2 className="text-xl font-medium">
				4.1 Intellectual Property:
			</h2>
			<ul className="list-disc">
				<li>
					<b>Ownership:</b> The Application, including its
					design, features, and content, is owned by
					EventWheel and protected by intellectual property
					laws. You acknowledge that you do not acquire any
					ownership rights in the Application.
				</li>
				<li>
					<b>User Content:</b> By submitting or uploading
					any content to the Application, you grant us a
					worldwide, non-exclusive, royalty-free license to
					use, reproduce, modify, adapt, publish,
					distribute, and display such content for the
					purpose of providing and improving the
					Application.
				</li>
				<li>
					<b>Feedback:</b> We welcome your feedback and
					suggestions regarding the Application. By
					providing feedback, you grant us the right to use
					and incorporate your feedback into our products
					and services without any obligation to compensate
					you.
				</li>
			</ul>
			<h2 className="text-xl font-medium">
				4.2 Ticket Purchase:
			</h2>
			<ul className="list-decimal">
				<li>
					The sales price set by seller, the ticket price
					may be change change at anytime before transaction
					takes place.
				</li>
				<li>
					The fees/charges in addition to sales price in
					associated with the ticket shell be made clear by
					the seller
				</li>
				<li>
					Buyer has to review all the listing which is
					displayed by seller before purchase, If buyer has
					any questions regarding the event, he must reach
					out to the organizer/seller. Eventwheel is not
					responsible for the any issue arise.
				</li>
				<li>
					Buyer will receive the order confirmation once he
					made the payment through selected payment method.
					In case buyer not received, he can again retrieve
					the information from his dashboard.
				</li>
				<li>
					After the buyer receives the order confirmation,
					the payment processing method chosen by the seller
					determines that Eventwheel or a third-party
					payment processor, acting on behalf of the seller,
					can deduct or authorize the transaction amount
					from the buyer&apos;s provided payment method. If
					applicable, the service charge is non-refundable,
					and unless the seller agrees otherwise, no refunds
					or credits will be issued once the buyer&apos;s
					payment has been processed
				</li>
				<li>
					If buyer has any questions after purchasing the
					ticket, he should contact directly to Seller who
					listed the event Eventwheel is not responsible in
					this regard.
				</li>
			</ul>
			<h2 className="text-xl font-medium">
				4.3 Cancellations & Refunds:
			</h2>
			<ul className="list-disc">
				<li>
					The decision regarding ticket cancellations and
					refunds is determined by the Seller and will be
					listed in the description, If seller not set such
					policies, Buyers may cancel a booking and receive
					a refund of the Sale Price, if requested, 24 hours
					before start of the event.
				</li>
				<li>
					If a buyer cancels a booking within the
					seller&apos;s specified time frame, if any, buyers
					may receive a refund of the sale price for the
					booking within a reasonable period, usually around
					one week after the refund is agreed upon. Service
					charges, if applicable to the buyer, cannot be
					refunded.
				</li>
			</ul>
			<h1 className="text-2xl font-medium">
				5. Actions taken to ensure compliance with buyers
			</h1>
			<p>
				Retains the authority to invalidate a buyer&apos;s
				transaction under any of the following circumstances
				such as any fraudulent, illegal or unethical
				activity relating to one or more Transactions,
				suspects any unauthorized use of a Buyer’s Account
				and/or of the Universe Services and violation of
				terms and conditions.
			</p>
			<h1 className="text-2xl font-medium">
				6. Termination
			</h1>
			<h2 className="text-xl font-medium">
				6.1 Termination of User Account:
			</h2>
			<p>
				EventWheel reserves the right to terminate or
				suspend your user account and access to the
				Application at any time, without prior notice, if
				you violate these Terms or engage in any fraudulent,
				unlawful, or unauthorized activities. Termination
				may result in the loss of your account information,
				data, and access to certain features of the
				Application.
			</p>
			<h2 className="text-xl font-medium">
				6.2 Effect of Termination:
			</h2>
			<p>
				Upon termination, all rights and licenses granted to
				you under these Terms will immediately cease, and
				you must stop using the Application. EventWheel will
				not be liable to you or any third party for any
				termination of your access to the Application.
			</p>
			<h1 className="text-2xl font-medium">7. Liability</h1>
			<ul className="list-decimal">
				<li>
					Considering the nature of Eventwheel&apos;s
					business and the inability to regulate the actions
					or behaviors of users, Eventwheel does not provide
					any warranty and explicitly denies any liability
					for the goods or services offered by sellers.
				</li>
				<li>
					Eventwheel shall not be held responsible for any
					injuries or harm, including death, suffered by you
					or your guests while attending an event, unless it
					can be directly attributed to Eventwheel&apos;s
					gross negligence. Additionally, Eventwheel cannot
					be held liable for any loss or damage to your
					property or belongings, as well as those of your
					guests, during the event.
				</li>
			</ul>
			<h1 className="text-2xl font-medium">8. Privacy</h1>
			<p>
				Your privacy is important to us. Please review our{' '}
				<Link
					href="/privacy-policy"
					className="text-accent underline"
				>
					Privacy Policy
				</Link>
			</p>
		</main>
	);
}
