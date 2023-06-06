'use client';

import { formatDate } from '@/utils/date';

export default function GetDate({ date }: { date: Date }) {
	const d = formatDate(date);
	return <>{d}</>;
}
