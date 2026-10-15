<script lang="ts">
	type Tattoo = {
		id: number;
		title: string;
		artist: string;
		neighborhood: string;
		style: string;
		symbol: string;
		tone: string;
		height: number;
	};

	//generated CSS placeholders-eventually using real artists art
	const tattoos: Tattoo[] = [
		{
			id: 1,
			title: 'Botanical Study',
			artist: 'Artist No. 01',
			neighborhood: 'Lawrenceville',
			style: 'Fine Line',
			symbol: '✿',
			tone: '#d8d2c4',
			height: 300
		},
		{
			id: 2,
			title: 'The Serpent',
			artist: 'Artist No. 02',
			neighborhood: 'South Side',
			style: 'Blackwork',
			symbol: '〰',
			tone: '#c5c1b8',
			height: 390
		},
		{
			id: 3,
			title: 'Night Bloom',
			artist: 'Artist No. 03',
			neighborhood: 'Bloomfield',
			style: 'Illustrative',
			symbol: '❀',
			tone: '#b7afa0',
			height: 260
		},
		{
			id: 4,
			title: 'The Sun',
			artist: 'Artist No. 04',
			neighborhood: 'Strip District',
			style: 'Traditional',
			symbol: '☼',
			tone: '#c9bdab',
			height: 340
		},
		{
			id: 5,
			title: 'Small Worlds',
			artist: 'Artist No. 05',
			neighborhood: 'Lawrenceville',
			style: 'Fine Line',
			symbol: '✧',
			tone: '#e0d8c9',
			height: 270
		},
		{
			id: 6,
			title: 'Quiet Geometry',
			artist: 'Artist No. 06',
			neighborhood: 'Oakland',
			style: 'Geometric',
			symbol: '◇',
			tone: '#c4c9bf',
			height: 360
		},
		{
			id: 7,
			title: 'Wildflower',
			artist: 'Artist No. 07',
			neighborhood: 'South Side',
			style: 'Illustrative',
			symbol: '✾',
			tone: '#c6b7a7',
			height: 310
		},
		{
			id: 8,
			title: 'Moon Phase',
			artist: 'Artist No. 08',
			neighborhood: 'Bloomfield',
			style: 'Blackwork',
			symbol: '☾',
			tone: '#b5b6b0',
			height: 400
		}
	];
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
    saved = saved.includes(id)
      ? saved.filter((item) => item !== id)
      : [...saved, id];
  }
</script>

<svelte:head>
  <title>Needle Know — Find your next artist</title>
  <meta name="description" content="Discover tattoo styles and artists around Pittsburgh." />
</svelte:head>

<div class="site-shell">
  <header class="site-header">
    <a class="wordmark" href="/" aria-label="Needle Know home">
      needle<span>know.</span>
    </a>

    <nav aria-label="Main navigation">
      <a class="current" href="/">Discover</a>
      <a href="#collection">The collection</a>
      <a href="#about">About</a>
    </nav>

    <span class="location-label">PITTSBURGH, PA <span class="location-dot">●</span></span>
  </header>

  <main>
    <section class="hero" id="about">
      <div class="hero-main">
        <p class="eyebrow">AN INDEPENDENT TATTOO DISCOVERY PROJECT · EST. 2026</p>
        <h1>Good art is<br /><em>worth finding.</em></h1>
        <p class="hero-description">
          A considered collection of tattoo art and the people behind it.
          Discover your style. Find your artist. Start somewhere local.
        </p>
        <a class="hero-link" href="#collection">Explore the collection <span aria-hidden="true">↗</span></a>
      </div>

      <aside class="hero-aside">
        <span class="aside-mark" aria-hidden="true">✳</span>
        <p>THE ART IS PERSONAL.<br />THE SEARCH SHOULD BE TOO.</p>
        <span class="issue">ISSUE NO. 001 / PITTSBURGH</span>
      </aside>
    </section>

    <section class="discovery" id="collection">
      <div class="section-heading">
        <div>
          <p class="eyebrow">THE LOCAL ARCHIVE</p>
          <h2>Explore the work<span class="period">.</span></h2>
        </div>
        <p class="section-note">An evolving collection of ideas, styles, and the artists behind them.</p>
      </div>

      <div class="filter-bar">
        <label class="search-field">
          <span class="sr-only">Search tattoos</span>
          <span aria-hidden="true">⌕</span>
          <input bind:value={query} placeholder="Search artwork, styles, artists..." />
        </label>

        <label class="select-field">
          <span class="sr-only">Neighborhood</span>
          <select bind:value={selectedNeighborhood}>
            {#each neighborhoods as neighborhood}
              <option value={neighborhood}>{neighborhood}</option>
            {/each}
          </select>
        </label>
      </div>

      <div class="style-list" aria-label="Filter by tattoo style">
        {#each styles as style}
          <button
            class:active={selectedStyle === style}
            aria-pressed={selectedStyle === style}
            onclick={() => selectedStyle = style}
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
            <article class="artwork">
              <div class="artwork-image" style:background={tattoo.tone} style:height={`${tattoo.height}px`}>
                <span class="artwork-symbol" aria-hidden="true">{tattoo.symbol}</span>
                <span class="study-label">STUDY {String(tattoo.id).padStart(2, '0')}</span>
                <button
                  class:saved={saved.includes(tattoo.id)}
                  class="save-button"
                  aria-label={`${saved.includes(tattoo.id) ? 'Remove' : 'Save'} ${tattoo.title}`}
                  aria-pressed={saved.includes(tattoo.id)}
                  onclick={() => toggleSave(tattoo.id)}
                >
                  {saved.includes(tattoo.id) ? '♥' : '♡'}
                </button>
              </div>

              <div class="artwork-meta">
                <div>
                  <h3>{tattoo.title}</h3>
                  <p>{tattoo.artist} · {tattoo.neighborhood}</p>
                </div>
                <span class="style-tag">{tattoo.style}</span>
              </div>
            </article>
          {/each}
        </div>
      {:else}
        <div class="empty-state">
          <span>✳</span>
          <h3>Nothing in this corner of the archive.</h3>
          <p>Try another style, neighborhood, or search term.</p>
          <button onclick={() => {
            query = '';
            selectedStyle = 'All styles';
            selectedNeighborhood = 'All Pittsburgh';
          }}>Clear filters</button>
        </div>
      {/if}

      <p class="prototype-note">
        Prototype collection: fictional artist names and abstract artwork placeholders.
        Real portfolios will be added with artist permission.
        Saved selections currently last only until the page reloads.
      </p>
    </section>
  </main>

  <footer>
    <span class="wordmark">needle<span>know.</span></span>
    <span>MADE FOR THE ART. STARTING IN PITTSBURGH.</span>
    <span>© 2026 NEEDLE KNOW</span>
  </footer>
</div>

<style>
  :global(*) { box-sizing: border-box; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) { margin: 0; background: #f2f0e9; color: #242522; font-family: Arial, Helvetica, sans-serif; }
  :global(button), :global(input), :global(select) { font: inherit; }
  :global(button:focus-visible), :global(a:focus-visible), :global(input:focus-visible), :global(select:focus-visible) { outline: 2px solid #9c5848; outline-offset: 3px; }
  .site-shell { max-width: 1600px; margin: auto; }
  .site-header { min-height: 88px; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 0 5%; border-bottom: 1px solid #d9d6ce; }
  .wordmark { color: #242522; font-family: Georgia, serif; font-size: 29px; letter-spacing: -1.8px; text-decoration: none; font-weight: bold; white-space: nowrap; }
  .wordmark span { font-style: italic; font-weight: normal; }
  nav { display: flex; gap: 36px; }
  nav a { text-decoration: none; color: #75766f; font-size: 13px; }
  nav a:hover, nav a.current { color: #242522; }
  .location-label, .eyebrow, .issue, .results-heading, .study-label, footer { font-size: 10px; letter-spacing: 1.5px; font-weight: 600; }
  .location-dot { color: #9c5848; margin-left: 6px; }
  .hero { display: grid; grid-template-columns: 2.2fr 1fr; min-height: 475px; border-bottom: 1px solid #d9d6ce; }
  .hero-main { padding: 66px 7% 66px 9%; }
  .eyebrow { color: #9c5848; }
  h1, h2, h3, p { margin-top: 0; }
  h1, h2 { font-family: Georgia, 'Times New Roman', serif; font-weight: normal; }
  h1 { font-size: clamp(55px, 7vw, 105px); line-height: .99; letter-spacing: -5px; margin: 34px 0 25px; }
  h1 em { font-weight: normal; color: #767c70; }
  .hero-description { max-width: 430px; color: #666960; line-height: 1.8; font-size: 14px; }
  .hero-link { display: inline-block; margin-top: 24px; border-bottom: 1px solid #242522; padding-bottom: 9px; color: #242522; text-decoration: none; font-size: 13px; }
  .hero-link span { margin-left: 25px; }
  .hero-aside { background: #282a27; color: #e8e4db; padding: 45px; display: flex; flex-direction: column; justify-content: space-between; }
  .aside-mark { font-size: 110px; color: #aaa99b; line-height: 1; }
  .hero-aside p { font-family: Georgia, serif; font-size: clamp(23px, 3vw, 38px); line-height: 1.2; letter-spacing: -1px; }
  .issue { color: #a7a69e; }
  .discovery { padding: 65px 5% 90px; }
  .section-heading { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 35px; }
  h2 { font-size: clamp(40px, 5vw, 65px); letter-spacing: -2.5px; margin: 12px 0 0; }
  .period { color: #9c5848; }
  .section-note { color: #7b7c75; font-size: 13px; max-width: 250px; line-height: 1.6; }
  .filter-bar { display: grid; grid-template-columns: 1fr 240px; gap: 12px; }
  .search-field, .select-field { background: #e9e6dd; border: 1px solid #d7d3c9; display: flex; align-items: center; min-height: 52px; padding: 0 18px; }
  .search-field span { font-size: 26px; margin-right: 12px; }
  input, select { border: 0; outline: 0; background: transparent; color: #242522; width: 100%; font-size: 13px; }
  .style-list { display: flex; gap: 8px; flex-wrap: wrap; padding: 22px 0 30px; }
  .style-list button { border: 1px solid #d1cdc3; background: transparent; color: #6a6c64; border-radius: 0; padding: 10px 16px; font-size: 12px; cursor: pointer; }
  .style-list button:hover, .style-list button.active { background: #292b28; color: #f2f0e9; border-color: #292b28; }
  .results-heading { display: flex; justify-content: space-between; border-top: 1px solid #d5d1c8; padding: 18px 0 25px; color: #777971; }
  .masonry { columns: 4 220px; column-gap: 22px; }
  .artwork { break-inside: avoid; margin-bottom: 32px; }
  .artwork-image { position: relative; overflow: hidden; display: flex; justify-content: center; align-items: center; }
  .artwork-symbol { font-family: Georgia, serif; font-size: 140px; color: #343832; font-weight: normal; opacity: .82; transition: transform .4s ease; }
  .artwork:hover .artwork-symbol { transform: scale(1.08) rotate(-5deg); }
  .study-label { position: absolute; bottom: 15px; left: 16px; font-size: 9px; color: #343832; }
  .save-button { position: absolute; top: 12px; right: 12px; width: 38px; height: 38px; border: 0; background: #f2f0e9e8; color: #242522; font-size: 24px; cursor: pointer; }
  .save-button.saved { color: #9c5848; }
  .artwork-meta { display: flex; justify-content: space-between; align-items: start; gap: 10px; padding-top: 13px; }
  .artwork-meta h3 { font-family: Georgia, serif; font-size: 17px; font-weight: normal; margin: 0 0 6px; }
  .artwork-meta p { font-size: 11px; color: #777971; margin: 0; line-height: 1.5; }
  .style-tag { color: #777971; font-size: 10px; white-space: nowrap; padding-top: 4px; }
  .empty-state { text-align: center; padding: 90px 20px; border: 1px solid #d5d1c8; }
  .empty-state > span { font-size: 60px; }
  .empty-state h3 { font-family: Georgia, serif; font-size: 26px; font-weight: normal; margin: 15px 0; }
  .empty-state p { color: #777971; font-size: 13px; }
  .empty-state button { margin-top: 15px; padding: 12px 20px; background: #242522; color: white; border: 0; cursor: pointer; }
  .prototype-note { color: #85877e; font-size: 11px; line-height: 1.7; margin-top: 28px; }
  footer { padding: 30px 5%; border-top: 1px solid #d5d1c8; display: flex; justify-content: space-between; align-items: center; gap: 20px; color: #777971; }
  footer .wordmark { font-size: 22px; }
  @media (max-width: 850px) {
    .hero { grid-template-columns: 1fr; }
    .hero-aside { min-height: 230px; }
    .aside-mark { font-size: 65px; }
    .hero-aside p { max-width: 300px; }
    h1 { letter-spacing: -3px; }
    .location-label { display: none; }
    .section-heading { align-items: start; flex-direction: column; }
  }
  @media (max-width: 600px) {
    .site-header { padding: 20px 5%; min-height: 72px; flex-wrap: wrap; }
    nav { gap: 18px; }
    nav a { font-size: 11px; }
    .hero-main { padding: 55px 6%; }
    .hero-aside { padding: 28px; }
    .filter-bar { grid-template-columns: 1fr; }
    .masonry { columns: 2 130px; column-gap: 12px; }
    .artwork { margin-bottom: 22px; }
    .artwork-image { max-height: 300px; }
    .artwork-symbol { font-size: 80px; }
    .artwork-meta { flex-direction: column; gap: 4px; }
    .artwork-meta h3 { font-size: 15px; }
    .results-heading span:last-child { display: none; }
    footer { flex-wrap: wrap; }
  }
  @media (prefers-reduced-motion: reduce) {
    :global(html) { scroll-behavior: auto; }
    .artwork-symbol { transition: none; }
  }
</style>
