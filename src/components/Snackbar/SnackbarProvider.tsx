'use client';

import Snackbar, {
	type SnackbarProps
} from '@/components/Snackbar';

import {
	useState,
	createContext,
	useEffect,
	Dispatch,
	SetStateAction
} from 'react';

const init: SnackbarProps = {
	message: 'I AM IDLE',
	type: 'idle'
};

export interface SnackbarContextProps {
	snackbar: SnackbarProps;
	setSnackbar: Dispatch<SetStateAction<SnackbarProps>>;
}

export const AUTO_DISMISS = 5000;
export const SnackbarContext =
	createContext<SnackbarContextProps>({
		snackbar: init,
		setSnackbar: () => {}
	});

export default function SnackbarProvider({
	children
}: {
	children: React.ReactNode;
}) {
	const [snackbar, setSnackbar] = useState(init);
	useEffect(() => {
		if (
			snackbar.type === 'success' ||
			snackbar.type === 'failure'
		) {
			const timer = setTimeout(() => {
				setSnackbar({
					message: 'I AM IDLE',
					type: 'idle'
				});
			}, AUTO_DISMISS);
			return () => clearTimeout(timer);
		}
	}, [snackbar]);
	return (
		<SnackbarContext.Provider
			value={{ snackbar, setSnackbar }}
		>
			<Snackbar {...snackbar} />
			{children}
		</SnackbarContext.Provider>
	);
}
