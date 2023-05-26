'use client';

export default function TicketsDetailsPrinter() {
	function print() {
		var printContent = (
			document.getElementById('user-tickets') as HTMLElement
		).innerHTML;
		var originalContent = document.body.innerHTML;
		document.body.innerHTML = printContent;
		window.print();
		document.body.innerHTML = originalContent;
	}
	return (
		<button
			className="rounded-md bg-accent px-2 py-1 text-skin-inverted"
			onClick={print}
		>
			Print
		</button>
	);
}
