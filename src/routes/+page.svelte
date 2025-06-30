<script lang="ts">
	import { goto } from '$app/navigation';

	export let data: {
		name: string;
		data: {
			name: string;
			age: number;
			count: number;
		} | null;
	};

	let inputName = data.name ?? '';
	let debounceTimer: ReturnType<typeof setTimeout>;

	$: if (inputName !== data.name) {
		clearTimeout(debounceTimer);

		if (inputName.trim() === '') {
			goto('/', { replaceState: true });
		} else {
			debounceTimer = setTimeout(() => {
				goto(`/?name=${encodeURIComponent(inputName)}`, { replaceState: true });
			}, 800);
		}
	}
</script>

<main>
	<h1>Idade estimada</h1>

	<input
		type="text"
		bind:value={inputName}
		placeholder="Digite um nome..."
	/>

	{#if data.name.trim() === ''}
		<p>Digite um nome para estimar a idade.</p>
	{:else if data?.data?.age}
		<p>
			O nome <strong>{data.name}</strong> tem idade média de <strong>{data.data.age}</strong> anos.
		</p>
	{:else}
		<p>Sem resultado para o nome <strong>{data.name}</strong>.</p>
	{/if}
</main>

<style>
	main {
		max-width: 600px;
		margin: 4rem auto;
		font-family: system-ui, sans-serif;
	}
	input {
		width: 100%;
		padding: 0.75rem;
		font-size: 1.1rem;
		margin-bottom: 1rem;
		border: 2px solid #ccc;
		border-radius: 5px;
	}
	p {
		font-size: 1.1rem;
	}
	strong {
		font-weight: bold;
	}
</style>
