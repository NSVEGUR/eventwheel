'use client';

import { useState } from 'react';

export default function FAQ({
	props
}: {
	props: {
		questions: string[];
		answers: string[];
	};
}) {
	const faqs = props.questions.map((question, index) => {
		return {
			question,
			answer: props.answers[index]
		};
	});
	const [state, setState] = useState(faqs.map(() => false));
	return (
		<div className="flex flex-col gap-1">
			{faqs.map((faq, index) => {
				return (
					<button
						key={index}
						onClick={() => {
							state[index] = !state[index];
							setState({
								...state
							});
						}}
						className="w-full rounded-md border-[1px] border-base bg-dominant p-2 shadow"
					>
						<h1 className="flex justify-between text-lg font-medium">
							{index + 1}. {faq.question}{' '}
							<span>
								{state[index] ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="h-6 w-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 8.25l-7.5 7.5-7.5-7.5"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="h-6 w-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 15.75l7.5-7.5 7.5 7.5"
										/>
									</svg>
								)}
							</span>
						</h1>
						<div
							className={`grid pl-5 ${
								state[index]
									? 'grid-rows-[1fr] py-5'
									: 'grid-rows-[0fr]'
							} transition-all duration-200`}
						>
							<h1 className="overflow-hidden text-left text-skin-complementary">
								{faq.answer}
							</h1>
						</div>
					</button>
				);
			})}
		</div>
	);
}
