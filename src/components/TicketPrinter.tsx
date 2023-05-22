'use client';

export default function TicketPrinter() {
	function print() {
		window.print();
	}
	return (
		<button
			className="absolute right-10 top-10 rounded-md bg-accent px-2 py-1 text-skin-inverted"
			onClick={print}
		>
			Print
		</button>
	);
}
