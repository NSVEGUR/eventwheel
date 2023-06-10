import Link from 'next/link';
export default function LinksTable({
	title,
	caption,
	header,
	body
}: {
	title: string;
	caption?: string;
	header: string[];
	body: {
		link: string;
		values: string[];
	}[];
}) {
	return (
		<div className="relative overflow-x-auto border-[1px] border-base shadow-xl sm:rounded-lg">
			<div className="flex w-full flex-col gap-2 p-5 text-sm">
				<caption className="text-left text-xl font-semibold text-accent">
					{title}
				</caption>
				{caption && (
					<p className="text-sm font-normal text-skin-complementary">
						{caption}
					</p>
				)}
			</div>
			{body.length > 0 ? (
				<table className="w-full text-left text-sm">
					<thead className="bg-muted text-xs uppercase">
						<tr>
							{header.map((label, index) => {
								return (
									<th
										scope="col"
										className="px-6 py-3"
										key={index}
									>
										{label}
									</th>
								);
							})}
							<th scope="col" className="px-6 py-3"></th>
						</tr>
					</thead>
					<tbody>
						{body.map(({ values, link }, index) => {
							return (
								<tr
									key={index}
									className="border-b bg-white"
								>
									{values.map((value, index) => {
										return (
											<td className="px-6 py-4" key={index}>
												{value}
											</td>
										);
									})}
									<td
										className="px-6 py-4 font-semibold"
										key={index}
									>
										<Link
											href={link}
											className="rounded-md bg-complementary p-2 text-xs text-skin-inverted transition-all duration-150 hover:bg-accent"
										>
											Open
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<h1 className="pb-2 text-center text-xl font-medium text-skin-complementary">
					Zero {title} have been found
				</h1>
			)}
		</div>
	);
}
