'use client';

import { Event, AdminTicket } from '@prisma/client';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { SnackbarContext } from './Snackbar/SnackbarProvider';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/date';

export default function PublishForm({
	event
}: {
	event: Event & {
		tickets: AdminTicket[];
	};
}) {
	const { setSnackbar } = useContext(SnackbarContext);
	const minDate = formatDate(new Date()).split(' ')[0];
	const maxDate = formatDate(event.starts).split(' ')[0];
	const savedDate = event.publishDate ?? new Date();
	const [values, setValues] = useState({
		date: formatDate(savedDate).split(' ')[0],
		time: formatDate(savedDate).split(' ')[1]
	});
	const router = useRouter();
	const handleSubmit = async function (publish: boolean) {
		if (!event.image) {
			return setSnackbar({
				message: 'Please upload image before publishing',
				type: 'failure'
			});
		}
		if (!event.summary) {
			return setSnackbar({
				message: 'Please add summary before publishing',
				type: 'failure'
			});
		}
		if (!event.description) {
			return setSnackbar({
				message: 'Please add summary before publishing',
				type: 'failure'
			});
		}
		if (event.tickets.length === 0) {
			return setSnackbar({
				message:
					'Please create at least one ticket before publishing',
				type: 'failure'
			});
		}
		const body = {
			published: publish,
			publishDate: new Date(values.date + ' ' + values.time)
		};
		if (event.starts < body.publishDate) {
			setSnackbar({
				message:
					'Event publish date must be less than the start date!',
				type: 'failure'
			});
			return;
		}
		try {
			setSnackbar({
				message: publish
					? 'Publishing the event'
					: 'Hiding the event',
				type: 'promise'
			});
			const response = await fetch(
				`/api/event/manage/${event.id}/publish`,
				{
					method: 'PATCH',
					body: JSON.stringify(body),
					headers: {
						'content-type': 'application/json'
					}
				}
			);
			if (response.status >= 200 && response.status < 400) {
				setSnackbar({
					message: publish
						? 'Published the event Successfully'
						: 'Hid the event Successfully',
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
				return;
			}
			setSnackbar({
				message:
					'Something went wrong 💥, login again to continue',
				type: 'failure'
			});
			return;
		} catch (err) {
			console.error(err);
		}
	};
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		console.log(e.target.name, e.target.value);
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	};
	return (
		<form>
			<div className="mt-10 flex justify-evenly gap-5 -sm:flex-col">
				<div className="flex w-full flex-col gap-3">
					<label htmlFor="date">
						Publish Date{' '}
						<span className="text-complementary">*</span>
					</label>
					<input
						type="date"
						required
						name="date"
						min={minDate}
						max={maxDate}
						className="relative border-[1px] border-base p-3 outline-accent"
						onChange={handleChange}
						value={values.date}
					/>
				</div>
				<div className="flex w-full flex-col gap-3">
					<label htmlFor="time">
						Publish Time{' '}
						<span className="text-complementary">*</span>
					</label>
					<input
						type="time"
						required
						name="time"
						value={values.time}
						onChange={handleChange}
						className="relative border-[1px] border-base p-3 outline-accent"
					/>
				</div>
			</div>
			<section className="fixed bottom-0 left-0 right-0 h-16 border-t-[1px] bg-dominant">
				<div className="flex h-full w-full items-center justify-end gap-5 pr-10">
					<button
						className="cursor-pointer rounded-md border-[1px] border-error bg-error px-2 py-1 text-skin-inverted"
						onClick={(e) => {
							e.preventDefault();
							handleSubmit(false);
						}}
					>
						Hide
					</button>
					<button
						className="cursor-pointer rounded-md border-[1px] border-accent bg-accent px-2 py-1 text-skin-inverted"
						onClick={(e) => {
							e.preventDefault();
							handleSubmit(true);
						}}
					>
						Publish
					</button>
				</div>
			</section>
		</form>
	);
}
