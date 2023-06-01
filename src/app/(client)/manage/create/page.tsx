import BasicCreationForm, {
	DEFAULT_FORM_ENTRIES
} from '@/components/BasicCreationForm';

export default function Page() {
	return (
		<BasicCreationForm
			{...{ event: DEFAULT_FORM_ENTRIES, method: 'POST' }}
		/>
	);
}
