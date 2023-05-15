'use client';

import { useState } from 'react';
import './AuthInput.css';

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
		<div className="flex flex-col w-full gap-1">
			<label htmlFor="email">{props.label} *</label>
			<input
				{...inputProps}
				className="p-2 focus:outline-none bg-transparent border-[1px] border-complementary focus:border-inverted rounded-lg w-full"
				onBlur={handleBlur}
				onFocus={handleFocus}
				data-focused={focused.toString()}
				onChange={onChange}
			/>
			<span>{errorMessage}</span>
		</div>
	);
}
