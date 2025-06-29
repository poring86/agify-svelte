// src/routes/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const name = url.searchParams.get('name') || 'matt';
	const res = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`);
	const data = await res.json();

	return { name, data };
};
