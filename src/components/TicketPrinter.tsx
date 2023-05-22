'use client';

export default function TicketPrinter() {
	function print() {
		const contentEl = document.getElementById('ticket');
		if (!contentEl) return;
		const content = contentEl.innerHTML;
		const originalContent = document.body.innerHTML;
		document.body.innerHTML = content;
		window.print();
		document.body.innerHTML = originalContent;
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
