'use client';

import { useState } from 'react';
import './styles.css';

interface Props {
	id: number;
	type: string;
	name: string;
	label: string;
	required: boolean;
	errorMessage: string;
	pattern?: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement>
	) => void;
}

export default function FormInput(props: Props) {
	const {
		id,
		label,
		errorMessage,
		onChange,
		...inputProps
	} = props;
	const [focused, setFocused] = useState(false);
	const handleBlur = (
		e: React.FocusEvent<HTMLInputElement>
	) => {
		setFocused(true);
	};
	const handleFocus = (
		e: React.FocusEvent<HTMLInputElement>
	) => {
		if (props.name === 'confirmPassword') {
			setFocused(true);
		}
	};
	return (
		<div className="flex w-full flex-col gap-1">
			<label htmlFor="email">{props.label} *</label>
			<input
				{...inputProps}
				className="w-full rounded-lg border-[1px] border-complementary bg-transparent p-2 focus:border-inverted focus:outline-none"
				onBlur={handleBlur}
				onFocus={handleFocus}
				data-focused={focused.toString()}
				onChange={onChange}
			/>
			<span>{errorMessage}</span>
		</div>
	);
}
