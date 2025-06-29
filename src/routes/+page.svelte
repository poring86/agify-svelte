<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { writable, derived } from 'svelte/store';

	let inputName = '';
	const debounceTimeout = 800;

	const query = derived(page, ($page) => $page.url.searchParams.get('name') || '');
	const name = writable('');
	const data = writable<any>(null);
	const loading = writable(false);
	const error = writable<string | null>(null);

	let debounceTimer: ReturnType<typeof setTimeout>;

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		inputName = target.value;

		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			if (inputName.trim()) {
				goto(`/?name=${encodeURIComponent(inputName)}`);
			} else {
				goto('/');
			}
		}, debounceTimeout);
	}

	// Quando a URL muda, atualiza inputName e dispara a busca
	onMount(() => {
		const unsubscribe = query.subscribe((value) => {
			inputName = value;
			name.set(value);
		});
		return unsubscribe;
	});

	// Quando o store 'name' muda, faz a busca na API
	name.subscribe(async (value) => {
		if (!value.trim()) {
			data.set(null);
			error.set(null);
			loading.set(false);
			return;
		}

		loading.set(true);
		error.set(null);

		try {
			const res = await fetch(`https://api.agify.io?name=${encodeURIComponent(value)}`);
			if (!res.ok) throw new Error('Erro na API');

			const json = await res.json();
			data.set(json);
		} catch (err) {
			error.set('Erro ao buscar dados.');
			data.set(null);
		} finally {
			loading.set(false);
		}
	});
</script>

<main>
	<h1>Idade estimada</h1>
	<input
		type="text"
		bind:value={inputName}
		on:input={handleInput}
		placeholder="Digite um nome..."
	/>

	{#if $loading}
		<p>Carregando...</p>
	{:else if $error}
		<p style="color: red">{$error}</p>
	{:else if $name.trim()}
		{#if $data?.age}
			<p>O nome <strong>{$name}</strong> tem idade média de <strong>{$data.age}</strong> anos.</p>
		{:else}
			<p>Sem resultado para o nome <strong>{$name}</strong>.</p>
		{/if}
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
</style>
