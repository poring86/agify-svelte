// src/routes/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const name = url.searchParams.get('name');

	if (!name) {
		return { data: null };
	}

	const res = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`);
	const json = await res.json();

	console.log('Resultado da API:', json);

	return {
		data: json
	};
};
