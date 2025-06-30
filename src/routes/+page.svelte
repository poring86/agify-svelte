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
	<h1>🔮 Estimativa de Idade</h1>

	<input
		type="text"
		bind:value={inputName}
		placeholder="Digite um nome..."
		autocomplete="off"
	/>

	{#if data.name.trim() === ''}
		<p class="muted">Digite um nome para estimar a idade.</p>
	{:else if data?.data?.age}
		<p>
			O nome <strong>{data.name}</strong> tem uma idade média de <strong>{data.data.age}</strong> anos.
		</p>
	{:else}
		<p class="muted">Nenhuma estimativa encontrada para <strong>{data.name}</strong>.</p>
	{/if}
</main>

<style>
	:global(body) {
		background-color: #121212;
		color: #f1f1f1;
		font-family: 'Segoe UI', sans-serif;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
	}

	main {
		width: 100%;
		max-width: 600px;
		padding: 2rem;
		background: #1e1e1e;
		border-radius: 12px;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
		box-sizing: border-box;
		text-align: center;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 1.5rem;
		color: #f9f9f9;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	input {
		width: 90%;
		padding: 0.8rem 1rem;
		font-size: 1.1rem;
		color: #fff;
		background-color: #2a2a2a;
		border: 1px solid #444;
		border-radius: 8px;
		outline: none;
		transition: border 0.2s, box-shadow 0.2s;
	}

	input::placeholder {
		color: #aaa;
	}

	input:focus {
		border-color: #5dd3f3;
		box-shadow: 0 0 0 3px rgba(93, 211, 243, 0.2);
	}

	p {
		font-size: 1.1rem;
		margin-top: 1.2rem;
		line-height: 1.5;
	}

	.muted {
		color: #999;
	}

	strong {
		color: #ffd166;
		font-weight: 600;
	}
</style>