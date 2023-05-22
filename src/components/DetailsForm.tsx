/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useContext, useEffect } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { useSupabase } from '@/components/providers/supabase-provider';
import { Event } from '@prisma/client';
import { useRouter } from 'next/navigation';

export interface DetailsFormProps {
	image?: string;
	previousImage?: string;
	summary: string | null;
	description: string | null;
	faqs: {
		question: string;
		answer: string;
	}[];
}

export const DEFAULT_DETAILS: DetailsFormProps = {
	summary: '',
	description: '',
	faqs: []
};

export default function DetailsForm({
	event
}: {
	event: Event;
}) {
	const { supabase } = useSupabase();
	const FAQs = event.questions.map((question, index) => {
		return {
			question,
			answer: event.answers[index]
		};
	});
	const DEFAULT_DETAILS: DetailsFormProps = {
		summary: event.summary,
		description: event.description,
		faqs: FAQs
	};
	const [values, setValues] = useState(DEFAULT_DETAILS);
	const [file, setFile] = useState<File | undefined>();
	const { setSnackbar } = useContext(SnackbarContext);
	const router = useRouter();
	useEffect(() => {
		if (event.image) {
			downloadImage(event.image);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [event]);
	const downloadImage = async (path: string) => {
		try {
			const { data } = supabase.storage
				.from('event_images')
				.getPublicUrl(path);
			const { publicUrl: url } = data;
			setValues({
				...values,
				image: url,
				previousImage: url
			});
		} catch (error) {
			if (error instanceof Error) {
				console.error(
					'Error downloading image: ',
					error.message
				);
			}
		}
	};
	const uploadImageToCloud = async function (
		file: File | undefined
	): Promise<string | null> {
		if (!values.image) {
			setSnackbar({
				message:
					'Please add an image to visualize your event better',
				type: 'failure'
			});
			return event.image;
		}
		if (values.image === values.previousImage) {
			return event.image;
		}
		if (!file) {
			return event.image;
		}
		if (event.image) {
			const { error } = await supabase.storage
				.from('event_images')
				.remove([event.image]);
			if (error) {
				setSnackbar({
					message: 'Error in deleting previous image',
					type: 'failure'
				});
				return event.image;
			}
		}
		const fileExt = file.name.split('.').pop();
		const filePath = `${Date.now()}-${event.id}.${fileExt}`;
		const { error } = await supabase.storage
			.from('event_images')
			.upload(filePath, file);
		if (error) {
			setSnackbar({
				message: 'Error in uploading new image',
				type: 'failure'
			});
			return event.image;
		}
		return filePath;
	};
	const updateImageLocally = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!e.target) {
			return;
		}
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
		const fileObj = document.getElementById('file') as any;
		if (FileReader && fileObj && fileObj.files) {
			const fr = new FileReader();
			fr.addEventListener('load', () => {
				setValues({
					...values,
					image: fr.result as string
				});
			});
			fr.readAsDataURL(fileObj.files[0]);
		} else {
			console.error('File reader is not supported');
		}
	};
	const handleChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		let image = event.image;
		if (values.image) {
			setSnackbar({
				message: 'Uploading image to cloud...',
				type: 'promise'
			});
			image = await uploadImageToCloud(file);
		}
		setSnackbar({
			message: 'Updating event details...',
			type: 'promise'
		});
		const data = {
			summary: values.summary,
			description: values.description,
			image: image,
			faqs: values.faqs
		};
		const response = await fetch(
			`/api/event/manage/${event.id}/details`,
			{
				method: 'PATCH',
				body: JSON.stringify(data),
				headers: { 'content-Type': 'application/json' }
			}
		);
		if (response.status >= 200 && response.status < 400) {
			setSnackbar({
				message: 'Saved Successfully',
				type: 'success'
			});
			return router.push(response.url);
		}
		if (response.status === 401) {
			const result = await response.json();
			setSnackbar({
				message:
					result.message ??
					'Something went wrong 💥, login again to continue',
				type: 'failure'
			});
			router.push(result.url);
			return setValues(DEFAULT_DETAILS);
		}
		setSnackbar({
			message:
				'Something went wrong 💥, login again to continue',
			type: 'failure'
		});
		return setValues(DEFAULT_DETAILS);
	};
	return (
		<form
			className="relative mt-5 h-screen w-full overflow-scroll"
			onSubmit={handleSubmit}
		>
			<div className="mb-20 flex flex-col justify-center gap-10 p-10 py-5 -md:p-2">
				<section className="flex flex-col gap-5 border-b-[1px] border-base px-32 pb-20 -md:px-10">
					<div className="relative">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="absolute -left-10 top-0 h-8 w-8 text-skin-muted"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
							/>
						</svg>
						<h1 className="text-3xl font-bold">
							Event Media
						</h1>
						<p className=" text-sm font-light">
							Add an image which best describes your event,
							try to upload the true photos which grabs
							maximum attention
						</p>
						<div className="mt-10 flex w-full flex-col items-start justify-center gap-2">
							{values.image && (
								<div className="w-full flex-grow">
									<img
										className="h-96 w-full rounded-lg object-cover"
										src={values.image}
										alt="campaignImage"
										id="campaign-image"
									/>
								</div>
							)}
							<div className="mt-5 flex w-full items-center justify-center">
								<label
									htmlFor="file"
									className="h-max cursor-pointer rounded-lg border-[1px] border-accent bg-light-accent p-2 text-accent"
								>
									<input
										type="file"
										name="file"
										id="file"
										hidden
										accept=".png,.jpeg,.jpg,.svg"
										placeholder="Image URL of your campaign"
										onChange={updateImageLocally}
									/>
									<span>
										{values.image
											? 'Edit Image'
											: 'Choose Image'}
									</span>
								</label>
							</div>
						</div>
					</div>
				</section>
				<section className="flex flex-col gap-5 border-b-[1px] border-base px-32 pb-20 -md:px-10">
					<div className="relative">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="absolute -left-10 top-0 h-8 w-8 text-skin-muted"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
							/>
						</svg>
						<h1 className="text-3xl font-bold">Summary</h1>
						<p className=" text-sm font-light">
							Give a short note on your event which grabs
							viewers attention in a sec.
						</p>
						<div className="mt-5 flex flex-col gap-2">
							<label htmlFor="summary">
								Event Summary{' '}
								<span className="text-complementary">
									*
								</span>
							</label>
							<textarea
								required
								name="summary"
								minLength={10}
								maxLength={100}
								rows={2}
								className="border-[1px] border-base p-3 outline-accent"
								value={values.summary ?? ''}
								onChange={handleChange}
							/>
						</div>
					</div>
				</section>
				<section className="flex flex-col gap-5 border-b-[1px] border-base px-32 pb-20 -md:px-10">
					<div className="relative">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="absolute -left-10 top-0 h-8 w-8 text-skin-muted"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/>
						</svg>
						<h1 className="text-3xl font-bold">
							Description
						</h1>
						<p className=" text-sm font-light">
							Describe about your event in a manner which
							provides every minute reason for a user to
							attend.
						</p>
						<div className="mt-5 flex flex-col gap-2">
							<label htmlFor="description">
								Event Description{' '}
								<span className="text-complementary">
									*
								</span>
							</label>
							<textarea
								required
								name="description"
								minLength={10}
								rows={10}
								className="border-[1px] border-base p-3 outline-accent"
								value={values.description ?? ''}
								onChange={handleChange}
							/>
						</div>
					</div>
				</section>
				<section className="flex flex-col gap-5 border-b-[1px] border-base px-32 pb-20 -md:px-10">
					<div className="relative">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="absolute -left-10 top-0 h-8 w-8 text-skin-muted"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
							/>
						</svg>
						<h1 className="text-3xl font-bold">
							Frequently Asked Questions
						</h1>
						<p className=" text-sm font-light">
							You can also add FAQs to clarify any
							additional questions on your event to provide
							to the user.
						</p>
						<div className="flex flex-col gap-5">
							{values.faqs.map((faq, index) => {
								return (
									<div
										key={index}
										className="flex flex-col gap-3"
									>
										<div className="mt-5 flex items-center justify-between">
											<h1 className="text-2xl font-medium">
												FAQ-{index + 1}
											</h1>
											<button
												className="rounded-md bg-red-500 p-2 text-skin-inverted"
												onClick={(e) => {
													e.preventDefault();
													values.faqs.splice(index, 1);
													setValues({
														...values
													});
												}}
											>
												Delete
											</button>
										</div>
										<input
											type="text"
											name="question"
											required
											className="border-[1px] border-base p-3 outline-accent"
											placeholder={`Question for FAQ-${
												index + 1
											}`}
											value={faq.question}
											onChange={(e) => {
												const { faqs } = values;
												faqs[index].question =
													e.target.value;
												setValues({
													...values,
													faqs
												});
											}}
										/>
										<textarea
											required
											name="answer"
											minLength={10}
											rows={3}
											className="border-[1px] border-base p-3 outline-accent"
											placeholder={`Answer to FAQ-${
												index + 1
											}`}
											value={faq.answer}
											onChange={(e) => {
												const { faqs } = values;
												faqs[index].answer = e.target.value;
												setValues({
													...values,
													faqs
												});
											}}
										/>
									</div>
								);
							})}
						</div>
						<div className="flex w-full items-center justify-center">
							<button
								onClick={(e) => {
									e.preventDefault();
									setValues({
										...values,
										faqs: [
											...values.faqs,
											{
												question: '',
												answer: ''
											}
										]
									});
								}}
								className="mt-5 rounded-md border-[1px] border-accent bg-light-accent p-2"
							>
								Add a FAQ
							</button>
						</div>
					</div>
				</section>
			</div>
			<footer className="fixed bottom-0 left-0 right-0 h-16 border-t-[1px] bg-dominant">
				<div className="flex h-full w-full items-center justify-end gap-5 pr-10">
					<button
						className="rounded-md border-[1px] border-accent px-2 py-1"
						onClick={(e) => {
							e.preventDefault();
							setValues(DEFAULT_DETAILS);
						}}
					>
						Discard
					</button>
					<input
						className="cursor-pointer rounded-md border-[1px] border-accent bg-accent px-2 py-1 text-skin-inverted"
						type="submit"
						value="Update"
					/>
				</div>
			</footer>
		</form>
	);
}
