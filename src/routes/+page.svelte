<script lang="ts">
	import { resolve } from '$app/paths';
	import { tattoos } from '../lib/data/tattoos';
	import TattooCard from '../lib/components/TattooCard.svelte';
	import { onMount } from 'svelte';
	import { getPlans, addArtworkToPlan } from '$lib/utils/planStorage';
	import type { TattooPlan } from '$lib/data/plans';
	const styles = [
		'All styles',
		'Fine Line',
		'Blackwork',
		'Illustrative',
		'Traditional',
		'Geometric'
	];
	const neighborhoods = [
		'All Pittsburgh',
		'Lawrenceville',
		'South Side',
		'Bloomfield',
		'Strip District',
		'Oakland'
	];

	let query = $state('');
	let selectedStyle = $state('All styles');
	let selectedNeighborhood = $state('All Pittsburgh');
	let saved = $state<number[]>([]);
	let filtered = $derived(
		tattoos.filter((tattoo) => {
			const search = query.trim().toLowerCase();
			const matchesQuery =
				!search ||
				[tattoo.title, tattoo.artist, tattoo.style, tattoo.neighborhood].some((value) =>
					value.toLowerCase().includes(search)
				);

			return (
				matchesQuery &&
				(selectedStyle === 'All styles' || tattoo.style === selectedStyle) &&
				(selectedNeighborhood === 'All Pittsburgh' || tattoo.neighborhood === selectedNeighborhood)
			);
		})
	);
	function toggleSave(id: number) {
		saved = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
	}
	let plans = $state<TattooPlan[]>([]);
	let selectedArtworkId = $state<number | null>(null);
	let selectedPlanId = $state('');
	let planMessage = $state('');
	onMount(() => {
		plans = getPlans();
	});
	function openPlanPicker(artworkId: number) {
		plans = getPlans();
		selectedArtworkId = artworkId;
		selectedPlanId = '';
		planMessage = '';
	}

	function addSelectedArtwork() {
		if (selectedArtworkId === null || !selectedPlanId) return;

		const result = addArtworkToPlan(selectedPlanId, selectedArtworkId);

		if (result === 'added') {
			planMessage = 'Artwork added to your tattoo plan.';
			selectedArtworkId = null;
		} else if (result === 'duplicate') {
			planMessage = 'That artwork is already in your tattoo plan.';
		} else {
			planMessage = 'Could not find that plan.';
		}
	}
</script>

<svelte:head>
	<title>Needle Know — Find your next artist</title>
	<meta name="description" content="Discover tattoo styles and artists around Pittsburgh." />
</svelte:head>

<div class="site-shell">
	<header class="site-header">
		<a class="wordmark" href={resolve('/')} aria-label="Needle Know home">
			needle<span>Know</span>
		</a>

		<nav aria-label="Main navigation">
			<a class="current" href={resolve('/')}>Discover</a>
			<a href="#collection">The Collection</a>
			<a href={resolve('/plan')}>Plan my tattoo</a>
			<a href="#about">About</a>
		</nav>

		<span class="location-label">PITTSBURGH, PA</span>
	</header>

	<main>
		<section class="hero" id="about">
			<div class="hero-main">
				<p class="eyebrow">AN INDEPENDENT TATTOO DISCOVERY PROJECT · EST. 2026</p>
				<h1 class="signature-title">needle<span>Know</span></h1>
				<p class="hero-heading">Good art is <em>worth finding.</em></p>
				<p class="hero-description">
					A considered collection of tattoo art and the people behind it. Discover your style. Find
					your artist. Start somewhere local.
				</p>
				<a class="hero-link" href="#collection">Explore the collection</a>
			</div>

			<aside class="hero-aside">
				<p class="aside-message">The art is personal.<br />The search should be too.</p>
				<span class="issue">INDEPENDENT TATTOO DISCOVERY · PITTSBURGH</span>
			</aside>
		</section>

		<section class="discovery" id="collection">
			<div class="section-heading">
				<div>
					<p class="eyebrow">THE LOCAL ARCHIVE</p>
					<h2>Explore the work<span class="period">.</span></h2>
				</div>
				<p class="section-note">
					An evolving collection of ideas, styles, and the artists behind them.
				</p>
			</div>

			<div class="filter-bar">
				<label class="search-field">
					<span class="sr-only">Search tattoos</span>
					<input bind:value={query} placeholder="Search artwork, styles, artists..." />
				</label>

				<label class="select-field">
					<span class="sr-only">Neighborhood</span>
					<select bind:value={selectedNeighborhood}>
						{#each neighborhoods as neighborhood (neighborhood)}
							<option value={neighborhood}>{neighborhood}</option>
						{/each}
					</select>
				</label>
			</div>

			<div class="style-list" aria-label="Filter by tattoo style">
				{#each styles as style (style)}
					<button
						class:active={selectedStyle === style}
						aria-pressed={selectedStyle === style}
						onclick={() => (selectedStyle = style)}
					>
						{style}
					</button>
				{/each}
			</div>

			<div class="results-heading">
				<span>{filtered.length.toString().padStart(2, '0')} STUDIES</span>
				<span>CURATED FOR THE CURIOUS</span>
			</div>

			{#if filtered.length > 0}
				<div class="masonry">
					{#each filtered as tattoo (tattoo.id)}
						<TattooCard
							{tattoo}
							isSaved={saved.includes(tattoo.id)}
							onToggleSave={toggleSave}
							onAddToPlan={openPlanPicker}
						/>
					{/each}
				</div>
			{:else}
				<div class="empty-state">
					<h3>Nothing in this corner of the archive.</h3>
					<p>Try another style, neighborhood, or search term.</p>
					<button
						onclick={() => {
							query = '';
							selectedStyle = 'All styles';
							selectedNeighborhood = 'All Pittsburgh';
						}}>Clear filters</button
					>
				</div>
			{/if}

			<p class="prototype-note">
				Prototype collection: fictional artist names and abstract artwork placeholders. Real
				portfolios will be added with artist permission. Saved selections currently last only until
				the page reloads.
			</p>
		</section>

		<!-- Tattoo plan selection modal -->
		{#if selectedArtworkId !== null}
			<div class="picker-backdrop">
				<div class="plan-picker" role="dialog" aria-modal="true" aria-labelledby="picker-title">
					<button
						class="close-picker"
						aria-label="Close plan picker"
						onclick={() => (selectedArtworkId = null)}
					>
						Close
					</button>

					<p class="eyebrow">YOUR TATTOO WORKSPACE</p>
					<h2 id="picker-title">Add to a plan</h2>

					{#if plans.length === 0}
						<p>You haven't created a tattoo plan yet.</p>
						<a href={resolve('/plan')}>Create your first plan</a>
					{:else}
						<label for="plan-select">Choose a tattoo plan</label>

						<select id="plan-select" bind:value={selectedPlanId}>
							<option value="">Select a plan</option>

							{#each plans as plan (plan.id)}
								<option value={plan.id}>{plan.title}</option>
							{/each}
						</select>

						<button class="confirm-add" disabled={!selectedPlanId} onclick={addSelectedArtwork}>
							Add artwork
						</button>
					{/if}
				</div>
			</div>
		{/if}

		{#if planMessage}
			<p class="plan-message" role="status">
				{planMessage}
			</p>
		{/if}
	</main>

	<footer></footer>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}
	:global(html) {
		scroll-behavior: smooth;
	}
	:global(body) {
		margin: 0;
		background: #f2f0e9;
		color: #242522;
		font-family: Arial, Helvetica, sans-serif;
	}
	:global(button),
	:global(input),
	:global(select) {
		font: inherit;
	}
	:global(button:focus-visible),
	:global(a:focus-visible),
	:global(input:focus-visible),
	:global(select:focus-visible) {
		outline: 2px solid #9c5848;
		outline-offset: 3px;
	}
	.site-shell {
		max-width: 1600px;
		margin: auto;
	}
	.site-header {
		min-height: 88px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding: 0 5%;
		border-bottom: 1px solid #d9d6ce;
	}
	.wordmark {
		color: #242522;
		font-family: 'Segoe Script', 'Bradley Hand', 'Apple Chancery', cursive;
		font-size: 26px;
		letter-spacing: -1.2px;
		text-decoration: none;
		font-weight: 500;
		white-space: nowrap;
	}
	.wordmark span {
		color: #9c5848;
	}
	nav {
		display: flex;
		gap: 36px;
	}
	nav a {
		text-decoration: none;
		color: #75766f;
		font-size: 13px;
	}
	nav a:hover,
	nav a.current {
		color: #242522;
	}
	.location-label,
	.eyebrow,
	.issue,
	.results-heading,
	footer {
		font-size: 10px;
		letter-spacing: 1.5px;
		font-weight: 600;
	}
	.hero {
		display: grid;
		grid-template-columns: 2.2fr 1fr;
		min-height: 475px;
		border-bottom: 1px solid #d9d6ce;
	}
	.hero-main {
		padding: 66px 7% 66px 9%;
	}
	.eyebrow {
		color: #9c5848;
	}
	h1,
	h2,
	h3,
	p {
		margin-top: 0;
	}
	h2 {
		font-family: Georgia, 'Times New Roman', serif;
		font-weight: normal;
	}
	.signature-title {
		width: fit-content;
		font-family: 'Segoe Script', 'Bradley Hand', 'Apple Chancery', cursive;
		font-size: clamp(68px, 9.5vw, 136px);
		font-weight: 500;
		line-height: 1.15;
		letter-spacing: -6px;
		margin: 42px 0 4px -8px;
		clip-path: inset(0 100% 0 0);
		animation: signature-reveal 1.45s cubic-bezier(0.65, 0, 0.35, 1) 0.15s forwards;
	}
	.signature-title span {
		color: #9c5848;
	}
	.hero-heading {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(29px, 3.2vw, 43px);
		line-height: 1.2;
		letter-spacing: -1.4px;
		margin: 0 0 22px;
	}
	.hero-heading em {
		color: #767c70;
		font-weight: normal;
	}
	.hero-description {
		max-width: 430px;
		color: #666960;
		line-height: 1.8;
		font-size: 14px;
	}
	.hero-link {
		display: inline-block;
		margin-top: 24px;
		border-bottom: 1px solid #9c5848;
		padding-bottom: 7px;
		color: #242522;
		text-decoration: none;
		font-size: 13px;
	}
	.hero-link:hover {
		color: #9c5848;
	}
	.hero-aside {
		color: #242522;
		padding: 45px 8% 45px 12%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-self: center;
		min-height: 285px;
		border-left: 1px solid #d9d6ce;
	}
	.aside-message {
		font-family: Georgia, serif;
		font-size: clamp(23px, 3vw, 38px);
		line-height: 1.2;
		letter-spacing: -1.3px;
	}
	.issue {
		color: #777971;
		line-height: 1.6;
	}
	.discovery {
		padding: 65px 5% 90px;
	}
	.section-heading {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 30px;
		margin-bottom: 35px;
	}
	h2 {
		font-size: clamp(40px, 5vw, 65px);
		letter-spacing: -2.5px;
		margin: 12px 0 0;
	}
	.period {
		color: #9c5848;
	}
	.section-note {
		color: #7b7c75;
		font-size: 13px;
		max-width: 250px;
		line-height: 1.6;
	}
	.filter-bar {
		display: grid;
		grid-template-columns: 1fr 240px;
		gap: 12px;
	}
	.search-field,
	.select-field {
		background: #f8f6f1;
		border: 1px solid #d7d3c9;
		border-radius: 999px;
		display: flex;
		align-items: center;
		min-height: 52px;
		padding: 0 18px;
	}
	input,
	select {
		border: 0;
		outline: 0;
		background: transparent;
		color: #242522;
		width: 100%;
		font-size: 13px;
	}
	.style-list {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		padding: 22px 0 30px;
	}
	.style-list button {
		border: 1px solid #d1cdc3;
		background: transparent;
		color: #6a6c64;
		border-radius: 999px;
		padding: 10px 16px;
		font-size: 12px;
		cursor: pointer;
	}
	.style-list button:hover,
	.style-list button.active {
		background: #292b28;
		color: #f2f0e9;
		border-color: #292b28;
	}
	.results-heading {
		display: flex;
		justify-content: space-between;
		border-top: 1px solid #d5d1c8;
		padding: 18px 0 25px;
		color: #777971;
	}
	.masonry {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 42px 22px;
	}
	.empty-state {
		text-align: center;
		padding: 90px 20px;
		border-top: 1px solid #d5d1c8;
		border-bottom: 1px solid #d5d1c8;
	}
	.empty-state h3 {
		font-family: Georgia, serif;
		font-size: 26px;
		font-weight: normal;
		margin: 15px 0;
	}
	.empty-state p {
		color: #777971;
		font-size: 13px;
	}
	.empty-state button {
		margin-top: 15px;
		padding: 9px 0;
		background: transparent;
		color: #9c5848;
		border: 0;
		cursor: pointer;
		border-bottom: 1px solid currentColor;
	}
	.prototype-note {
		color: #85877e;
		font-size: 11px;
		line-height: 1.7;
		margin-top: 28px;
	}
	footer {
		padding: 30px 5%;
		border-top: 1px solid #d5d1c8;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		color: #777971;
	}
	@media (max-width: 850px) {
		.hero {
			grid-template-columns: 1fr;
		}
		.hero-aside {
			min-height: 180px;
			padding: 30px 6%;
			border-left: 0;
			border-top: 1px solid #d9d6ce;
		}
		.aside-message {
			max-width: 300px;
		}
		.signature-title {
			letter-spacing: -4px;
		}
		.location-label {
			display: none;
		}
		.section-heading {
			align-items: start;
			flex-direction: column;
		}
		.masonry {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 32px 16px;
		}
	}
	@media (max-width: 600px) {
		.site-header {
			padding: 20px 5%;
			min-height: 72px;
			flex-wrap: wrap;
		}
		nav {
			gap: 18px;
		}
		nav a {
			font-size: 11px;
		}
		.hero-main {
			padding: 55px 6%;
		}
		.hero-aside {
			padding: 28px;
		}
		.signature-title {
			font-size: clamp(42px, 14vw, 54px);
			letter-spacing: -4px;
			margin-left: -4px;
		}
		.hero-heading {
			font-size: 29px;
		}
		.filter-bar {
			grid-template-columns: 1fr;
		}
		.masonry {
			gap: 26px 12px;
		}
		.results-heading span:last-child {
			display: none;
		}
		footer {
			flex-wrap: wrap;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}
		.signature-title {
			clip-path: none;
			animation: none;
		}
	}

	@keyframes signature-reveal {
		to {
			clip-path: inset(0 0 0 0);
		}
	}

	/* Tattoo plan picker modal */

	.picker-backdrop {
		position: fixed;
		inset: 0;
		background: #24252299;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
		padding: 20px;
	}

	.plan-picker {
		position: relative;
		width: min(100%, 460px);
		background: #f2f0e9;
		padding: 35px;
		border-radius: 20px;
		box-shadow: 0 24px 80px #17181526;
	}

	.plan-picker h2 {
		font-size: 36px;
		margin: 15px 0 25px;
	}

	.plan-picker label {
		display: block;
		font-size: 12px;
		margin-bottom: 10px;
	}

	.plan-picker select {
		width: 100%;
		padding: 14px;
		border: 1px solid #d7d3c9;
		background: #e9e6dd;
		border-radius: 10px;
	}

	.close-picker {
		position: absolute;
		right: 18px;
		top: 15px;
		border: 0;
		background: transparent;
		cursor: pointer;
		font-size: 18px;
	}

	.confirm-add {
		width: 100%;
		margin-top: 20px;
		padding: 15px;
		border: 0;
		background: #282a27;
		color: #f2f0e9;
		border-radius: 999px;
		cursor: pointer;
	}

	.confirm-add:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.plan-message {
		position: fixed;
		bottom: 25px;
		right: 25px;
		z-index: 101;
		padding: 16px 22px;
		background: #282a27;
		color: #f2f0e9;
		font-size: 13px;
		border-radius: 999px;
	}
</style>
