import type { PageLoad } from './$types';
import type { AgeData, AgeEstimation } from '$lib/types';

export const load: PageLoad = async ({ fetch, url }): Promise<AgeEstimation> => {
	const rawName = url.searchParams.get('name');
	const name = rawName?.trim() ?? '';

	if (!name) {
		return {
			name: '',
			data: null
		};
	}

	try {
		const response = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`);

		if (!response.ok) {
			console.error(`Erro na API: status ${response.status}`);
			return { name, data: null };
		}

		const apiData = await response.json();

		const data: AgeData = {
			name: apiData.name,
			age: apiData.age ?? null,
			count: apiData.count ?? 0
		};

		return { name, data };
	} catch (error) {
		console.error('Erro ao buscar dados da API:', error);
		return { name, data: null };
	}
};
