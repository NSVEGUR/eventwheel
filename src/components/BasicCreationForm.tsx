'use client';

import {
	eventTypes,
	eventCategories
} from '@/lib/constants';

import { useEffect, useState, useContext } from 'react';
import { SnackbarContext } from '@/components/Snackbar/SnackbarProvider';
import { useRouter } from 'next/navigation';
import { useAuth } from './providers/supabase-auth-provider';

export interface CreationFormEntries {
	title: string;
	organizer: string;
	type: string;
	category: string;
	location: string;
	startDate: string;
	startTime: string;
	endDate: string;
	endTime: string;
	recurrence?: string;
	displayStart: boolean;
	displayEnd: boolean;
}

export const DEFAULT_FORM_ENTRIES: CreationFormEntries = {
	title: '',
	organizer: '',
	type: 'Appearance or Singing',
	category: 'Auto, Boat & Air',
	startDate: '',
	startTime: '',
	endDate: '',
	endTime: '',
	location: '',
	displayStart: true,
	displayEnd: true
};

export default function CreationForm({
	event = DEFAULT_FORM_ENTRIES,
	method = 'POST',
	eventId
}: {
	event: CreationFormEntries;
	method: 'PATCH' | 'POST';
	eventId?: string;
}) {
	const { setSnackbar } = useContext(SnackbarContext);
	const { user } = useAuth();
	const router = useRouter();
	const [subCategories, setSubCategories] = useState(
		eventCategories['Auto, Boat & Air']
	);
	const [subCategory, setSubCategory] = useState<
		string | undefined
	>(eventCategories['Auto, Boat & Air'][0]);
	const [location, setLocation] = useState('venue');
	const [day, setDay] = useState('single');
	const [values, setValues] =
		useState<CreationFormEntries>(event);
	const [selection, setSelection] = useState({
		type: 'Appearance or Singing',
		category: 'Auto, Boat & Air'
	});
	useEffect(() => {
		const category = eventCategories[selection.category][0];
		if (category === 'Other') {
			setSubCategory(undefined);
		}
		setSubCategory(eventCategories[selection.category][0]);
	}, [selection.category]);
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement
		>
	) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	};
	const handleSelection = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelection({
			...selection,
			[e.target.name]: e.target.value
		});
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = async function (e: React.FormEvent) {
		e.preventDefault();
		const {
			startDate,
			startTime,
			endDate,
			endTime,
			...others
		} = values;

		if (!user) {
			return setSnackbar({
				message:
					'Authentication is required, try logging in again',
				type: 'failure'
			});
		}
		const body = {
			userId: user.id,
			...others,
			starts: new Date(startDate + ' ' + startTime),
			ends: new Date(endDate + ' ' + endTime),
			subCategory
		};

		if (body.starts >= body.ends) {
			return setSnackbar({
				message: 'Events end must be greater than start',
				type: 'failure'
			});
		}

		setSnackbar({
			message: 'Creating event with basic details',
			type: 'promise'
		});
		try {
			let response;
			if (eventId && method === 'PATCH') {
				response = await fetch(
					`/api/event/manage/${eventId}`,
					{
						method: 'PATCH',
						body: JSON.stringify(body),
						headers: {
							'content-type': 'application/json'
						}
					}
				);
				if (
					response.status >= 200 &&
					response.status < 400
				) {
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
					return router.push(result.url);
				}
				return setSnackbar({
					message:
						'Something went wrong 💥, login again to continue',
					type: 'failure'
				});
			} else {
				response = await fetch(`/api/event/manage`, {
					method: 'POST',
					body: JSON.stringify(body),
					headers: {
						'content-type': 'application/json'
					}
				});
				if (
					response.status >= 200 &&
					response.status < 400
				) {
					setSnackbar({
						message: 'Updated Successfully',
						type: 'success'
					});
					return router.push(response.url);
				}
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
				return setValues(event);
			}
			setSnackbar({
				message:
					'Something went wrong 💥, login again to continue',
				type: 'failure'
			});
			return setValues(event);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<form
			className="relative mt-5 h-screen w-full overflow-scroll"
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col justify-center gap-10 p-10 py-5 -md:p-2">
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
						<h1 className="text-3xl font-bold">
							Basic Info
						</h1>
						<p className=" text-sm font-light">
							Name your event and tell event-goers why they
							should come. Add details that highlight what
							makes it unique.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="title">
							Event Title{' '}
							<span className="text-complementary">*</span>
						</label>
						<input
							type="text"
							required
							name="title"
							className="border-[1px] border-base p-3 outline-accent"
							onChange={handleChange}
							value={values.title}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="organizer">
							Organizer{' '}
							<span className="text-complementary">*</span>
						</label>
						<input
							type="text"
							required
							name="organizer"
							onChange={handleChange}
							className="border-[1px] border-base p-3 outline-accent"
							value={values.organizer}
						/>
					</div>
					<div className="flex w-full flex-wrap justify-evenly gap-5">
						<div className="flex w-full flex-col gap-2">
							<label htmlFor="type">
								Type{' '}
								<span className="text-complementary">
									*
								</span>
							</label>
							<select
								name="type"
								className="border-[1px] border-base bg-dominant p-3 outline-none"
								onChange={handleSelection}
								value={selection.type}
							>
								{eventTypes.map((eventType, index) => {
									return (
										<option value={eventType} key={index}>
											{eventType}
										</option>
									);
								})}
							</select>
						</div>
						{selection.type === 'Other' && (
							<div className="flex w-full flex-col gap-3">
								<label htmlFor="type">
									Others type{' '}
									<span className="text-complementary">
										*
									</span>
								</label>
								<input
									type="text"
									required
									name="type"
									className="border-[1px] border-base p-3 outline-accent"
									onChange={handleChange}
									value={values.type}
								/>
							</div>
						)}
						<div className="flex w-full flex-col gap-2">
							<label htmlFor="category">
								Category{' '}
								<span className="text-complementary">
									*
								</span>
							</label>
							<select
								name="category"
								className="border-[1px] border-base bg-dominant p-3 outline-none"
								onChange={(e) => {
									setSubCategories(
										eventCategories[e.target.value]
									);
									handleSelection(e);
								}}
								value={selection.category}
							>
								{Object.keys(eventCategories).map(
									(eventCategory, index) => {
										return (
											<option
												value={eventCategory}
												key={index}
											>
												{eventCategory}
											</option>
										);
									}
								)}
							</select>
						</div>
						{selection.category === 'Other' && (
							<div className="flex w-full flex-col gap-3">
								<label htmlFor="category">
									Others category{' '}
									<span className="text-complementary">
										*
									</span>
								</label>
								<input
									type="text"
									required
									name="category"
									className="border-[1px] border-base p-3 outline-accent"
									onChange={handleChange}
									value={values.category}
								/>
							</div>
						)}
						{subCategory && (
							<div className="flex w-full flex-col gap-2">
								<label htmlFor="subCategory">
									Sub Category{' '}
									<span className="text-complementary">
										*
									</span>
								</label>
								<select
									name="subCategory"
									className="border-[1px] border-base bg-dominant p-3 outline-none"
									onChange={(e) => {
										setSubCategory(e.target.value);
									}}
									value={subCategory}
								>
									{subCategories.map(
										(subCategory, index) => {
											return (
												<option
													value={subCategory}
													key={index}
												>
													{subCategory}
												</option>
											);
										}
									)}
								</select>
							</div>
						)}
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
								d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
							/>
						</svg>
						<h1 className="text-3xl font-bold">Location</h1>
						<p className="text-sm font-light">
							Help people in the area discover your event
							and let attendees know where to show up.
						</p>
					</div>
					<div className="flex gap-5">
						<button
							onClick={(e) => {
								e.preventDefault();
								setLocation('venue');
								setValues({
									...values
								});
							}}
							className={`x border-[1px] p-2 ${
								location === 'venue'
									? 'border-accent bg-light-accent'
									: 'border-base'
							}`}
						>
							Venue
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								setLocation('online-event');
								setValues({
									...values,
									location: 'Online'
								});
							}}
							className={`x border-[1px] p-2 ${
								location === 'online-event'
									? 'border-accent bg-light-accent'
									: 'border-base'
							}`}
						>
							Online Event
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								setLocation('to-be-announced');
								setValues({
									...values,
									location: 'To Be Announced'
								});
							}}
							className={`x border-[1px] p-2 ${
								location === 'to-be-announced'
									? 'border-accent bg-light-accent'
									: 'border-base'
							}`}
						>
							To Be Announced
						</button>
					</div>
					{location === 'venue' && (
						<div className="flex w-full flex-col gap-3">
							<label htmlFor="location">
								Venue Location{' '}
								<span className="text-complementary">
									*
								</span>
							</label>
							<input
								type="text"
								required
								name="location"
								className="border-[1px] border-base p-3 outline-accent"
								onChange={handleChange}
								value={values.location}
							/>
						</div>
					)}
				</section>
				<section className="flex h-screen flex-col gap-5 px-32 -md:px-10">
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
								d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
							/>
						</svg>
						<h1 className="text-3xl font-bold">
							Date and Time
						</h1>
						<p className="text-sm font-light">
							Tell event-goers when your event starts and
							ends so they can make plans to attend.
						</p>
					</div>
					<div className="flex gap-5">
						<button
							onClick={(e) => {
								e.preventDefault();
								setDay('single');
								setValues({
									...values,
									recurrence: undefined
								});
							}}
							className={`x border-[1px] p-2 ${
								day === 'single'
									? 'border-accent bg-light-accent'
									: 'border-base'
							}`}
						>
							Single Event
						</button>
						<button
							onClick={(e) => {
								e.preventDefault();
								setDay('recurring');
								setValues({
									...values,
									recurrence: 'Daily'
								});
							}}
							className={`x border-[1px] p-2 ${
								day === 'recurring'
									? 'border-accent bg-light-accent'
									: 'border-base'
							}`}
						>
							Recurring Event
						</button>
					</div>
					<div className="flex flex-col gap-5">
						{day === 'single' && (
							<>
								<h1 className="text-sm">
									Single event happens once and can last
									multiple days
								</h1>
								<div className="mt-10 flex justify-evenly gap-5">
									<div className="flex w-full flex-col gap-3">
										<label htmlFor="startDate">
											Event Starts{' '}
											<span className="text-complementary">
												*
											</span>
										</label>
										<input
											type="date"
											required
											name="startDate"
											onChange={handleChange}
											className="border-[1px] border-base p-3 outline-accent"
											value={values.startDate}
										/>
									</div>
									<div className="flex w-full flex-col gap-3">
										<label htmlFor="startTime">
											Start Time{' '}
											<span className="text-complementary">
												*
											</span>
										</label>
										<input
											type="time"
											required
											name="startTime"
											value={values.startTime}
											onChange={handleChange}
											className="border-[1px] border-base p-3 outline-accent"
										/>
									</div>
								</div>
								<div className="flex justify-evenly gap-5">
									<div className="flex w-full flex-col gap-3">
										<label htmlFor="endDate">
											Event Ends{' '}
											<span className="text-complementary">
												*
											</span>
										</label>
										<input
											type="date"
											required
											name="endDate"
											value={values.endDate}
											onChange={handleChange}
											className="border-[1px] border-base p-3 outline-accent"
										/>
									</div>
									<div className="flex w-full flex-col gap-3">
										<label htmlFor="endTime">
											End Time{' '}
											<span className="text-complementary">
												*
											</span>
										</label>
										<input
											type="time"
											required
											name="endTime"
											value={values.endTime}
											onChange={handleChange}
											className="border-[1px] border-base p-3 outline-accent"
										/>
									</div>
								</div>
							</>
						)}
						{day === 'recurring' && (
							<>
								<h1 className="text-sm">
									Recurring event happens multiple times
									from start to end date based on recurrent
									preferences
								</h1>
								<div className="mt-10 flex justify-evenly gap-5">
									<div className="flex w-full flex-col gap-3">
										<label htmlFor="startDate">
											Event Starts{' '}
											<span className="text-complementary">
												*
											</span>
										</label>
										<input
											type="date"
											required
											name="startDate"
											onChange={handleChange}
											value={values.startDate}
											className="border-[1px] border-base p-3 outline-accent"
										/>
									</div>
									<div className="flex w-full flex-col gap-3">
										<label htmlFor="endDate">
											Event Ends{' '}
											<span className="text-complementary">
												*
											</span>
										</label>
										<input
											type="date"
											required
											name="endDate"
											min={values.startDate}
											onChange={handleChange}
											value={values.endDate}
											className="border-[1px] border-base p-3 outline-accent"
										/>
									</div>
								</div>
								<div className="flex w-full flex-col gap-3">
									<label htmlFor="recurrence">
										Recurrence *
									</label>
									<select
										name="recurrence"
										className="border-[1px] border-base bg-dominant p-3 outline-none"
										onChange={handleChange}
										value={values.recurrence ?? 'Daily'}
									>
										<option value="Daily">Daily</option>
										<option value="Weekly">Weekly</option>
										<option value="Monthly">Monthly</option>
									</select>
								</div>
								<div className="flex justify-evenly gap-5">
									<div className="flex w-full flex-col gap-3">
										<label htmlFor="startTime">
											Start Time{' '}
											<span className="text-complementary">
												*
											</span>
										</label>
										<input
											type="time"
											required
											onChange={handleChange}
											value={values.startTime}
											name="startTime"
											className="border-[1px] border-base p-3 outline-accent"
										/>
									</div>
									<div className="flex w-full flex-col gap-3">
										<label htmlFor="endTime">
											End Time{' '}
											<span className="text-complementary">
												*
											</span>
										</label>
										<input
											type="time"
											required
											name="endTime"
											onChange={handleChange}
											value={values.endTime}
											className="border-[1px] border-base p-3 outline-accent"
										/>
									</div>
								</div>
							</>
						)}
						<div className="mt-10 flex gap-3 text-sm">
							<input
								type="checkbox"
								name="displayStart"
								checked={values.displayStart}
								onChange={(e) => {
									setValues({
										...values,
										displayStart: e.currentTarget.checked
									});
								}}
								className="accent-accent"
							/>
							<label htmlFor="displayStart">
								<h1>Display Start Time</h1>
								<p className="text-xs text-skin-complementary">
									The start time of your event will be
									displayed to attendees
								</p>
							</label>
						</div>
						<div className="flex gap-3 text-sm">
							<input
								type="checkbox"
								name="displayEnd"
								checked={values.displayEnd}
								onChange={(e) => {
									setValues({
										...values,
										displayEnd: e.currentTarget.checked
									});
								}}
								className="accent-accent"
							/>
							<label htmlFor="displayEnd">
								<h1>Display End Time</h1>
								<p className="text-xs text-skin-complementary">
									The end time of your event will be
									displayed to attendees
								</p>
							</label>
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
							setValues(event);
						}}
					>
						Discard
					</button>
					<input
						className="rounded-md border-[1px] border-accent bg-accent px-2 py-1 text-skin-inverted"
						type="submit"
						value={method === 'POST' ? 'Save' : 'Update'}
					/>
				</div>
			</footer>
		</form>
	);
}
