import { createServerClient } from '@/utils/supabase-server';

export function getImage(path: string | null) {
	if (path) {
		const supabase = createServerClient();
		const {
			data: { publicUrl }
		} = supabase.storage
			.from('event_images')
			.getPublicUrl(path);
		return publicUrl;
	}
	return null;
}
