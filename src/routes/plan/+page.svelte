
<script lang="ts">
  import { resolve } from '$app/paths';
  import { onMount } from 'svelte';
  import { tattoos } from '$lib/data/tattoos';
  import {
    createTattooPlan,
    type TattooPlan
  } from '$lib/data/plans';

  const storageKey = 'needle-know-plans-v1';

  let plans = $state<TattooPlan[]>([]);
  let title = $state('');
  let description = $state('');
  let style = $state('');
  let placement = $state('');
  let budget = $state<number | undefined>(undefined);
  let error = $state('');
  let ready = $state(false);

  const styles = [
    'Fine Line',
    'Blackwork',
    'Traditional',
    'Illustrative',
    'Geometric',
    'Other / Undecided'
  ];

  const placements = [
    'Arm',
    'Forearm',
    'Leg',
    'Back',
    'Chest',
    'Shoulder',
    'Other / Undecided'
  ];

  onMount(() => {
    try {
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          plans = parsed.filter(
            (item): item is TattooPlan =>
              item !== null &&
              typeof item === 'object' &&
              typeof item.id === 'string' &&
              typeof item.title === 'string' &&
              typeof item.description === 'string' &&
              typeof item.style === 'string' &&
              typeof item.placement === 'string' &&
              (item.budget === null || typeof item.budget === 'number') &&
              Array.isArray(item.artistIds) &&
              Array.isArray(item.artworkIds) &&
              typeof item.createdAt === 'string'
          );
        }
      }
    } catch {
      error = 'Your saved plans could not be loaded.';
    } finally {
      ready = true;
    }
  });

  function persist() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(plans));
      error = '';
    } catch {
      error = 'Could not save your plans in this browser.';
    }
  }

  function addPlan(event: SubmitEvent) {
    event.preventDefault();

    if (!title.trim()) {
      error = 'Give your tattoo plan a name.';
      return;
    }

    const parsedBudget = budget ?? null;

    if (
      parsedBudget !== null &&
      (!Number.isFinite(parsedBudget) || parsedBudget < 0)
    ) {
      error = 'Enter a valid budget.';
      return;
    }

    const plan = createTattooPlan(
      title.trim(),
      description.trim(),
      style,
      placement,
      parsedBudget
    );

    plans = [plan, ...plans];
    persist();

    title = '';
    description = '';
    style = '';
    placement = '';
    budget = undefined;
  }

  function deletePlan(id: string) {
    plans = plans.filter((plan) => plan.id !== id);
    persist();
  }
</script>

<svelte:head>
  <title>Plan My Tattoo — Needle Know</title>
  <meta
    name="description"
    content="Organize your next tattoo idea, budget, placement, and style."
  />
</svelte:head>

<div class="page">
  <header>
    <a href={resolve('/')} class="wordmark">needle<span>know.</span></a>
    <a href={resolve('/')} class="back-link">← Back to discovery</a>
  </header>

  <main>
    <section class="intro">
      <p class="eyebrow">YOUR PERSONAL TATTOO WORKSPACE</p>
      <h1>Every great tattoo<br />starts with <em>an idea.</em></h1>
      <p>
        Keep your inspiration, preferences, and budget together.
        Start planning before you find your artist.
      </p>
    </section>

    <div class="workspace">
      <section class="editor">
        <p class="eyebrow">01 / THE IDEA</p>
        <h2>Start a new plan</h2>

        <form onsubmit={addPlan}>
          <label for="plan-title">Give it a name</label>
          <input
            id="plan-title"
            bind:value={title}
            placeholder="e.g. Botanical half sleeve"
            maxlength="100"
            required
          />

          <label for="plan-description">Describe your idea</label>
          <textarea
            id="plan-description"
            bind:value={description}
            placeholder="What's the inspiration? Any important details?"
            rows="4"
          ></textarea>

          <div class="two-columns">
            <div>
              <label for="plan-style">Preferred style</label>
              <select id="plan-style" bind:value={style}>
                <option value="">Choose a style</option>
                {#each styles as option (option)}
                  <option value={option}>{option}</option>
                {/each}
              </select>
            </div>

            <div>
              <label for="plan-placement">Placement</label>
              <select id="plan-placement" bind:value={placement}>
                <option value="">Choose placement</option>
                {#each placements as option (option)}
                  <option value={option}>{option}</option>
                {/each}
              </select>
            </div>
          </div>

          <label for="plan-budget">Estimated budget (USD)</label>
          <input
            id="plan-budget"
            type="number"
            min="0"
            step="1"
            bind:value={budget}
            placeholder="e.g. 500"
          />

          {#if error}
            <p class="error" role="alert">{error}</p>
          {/if}

          <button class="create-button" type="submit">
            Create my plan <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>

      <section class="collection">
        <div class="collection-heading">
          <div>
            <p class="eyebrow">02 / YOUR COLLECTION</p>
            <h2>Your tattoo plans</h2>
          </div>
          <span class="count">{plans.length} PLANS</span>
        </div>

        {#if !ready}
          <p class="loading">Loading your plans...</p>
        {:else if plans.length === 0}
          <div class="empty">
            <span aria-hidden="true">✳</span>
            <h3>A blank canvas.</h3>
            <p>
              Your next tattoo starts here.
              Create your first plan to begin collecting ideas.
            </p>
          </div>
        {:else}
          <div class="plan-list">
            {#each plans as plan (plan.id)}
              <article class="plan-card">
                <div class="plan-top">
                  <span class="eyebrow">TATTOO CONCEPT</span>
                  <button
                    class="delete-button"
                    onclick={() => deletePlan(plan.id)}
                    aria-label={`Delete ${plan.title}`}
                  >
                    Remove
                  </button>
                </div>

                <h3>{plan.title}</h3>

                {#if plan.description}
                  <p class="description">{plan.description}</p>
                {/if}

                <div class="tags">
                  {#if plan.style}<span>{plan.style}</span>{/if}
                  {#if plan.placement}<span>{plan.placement}</span>{/if}
                  {#if plan.budget !== null}
                    <span>Budget: ${plan.budget.toLocaleString()}</span>
                  {/if}
                </div>

                {#if plan.artworkIds.length > 0}
                  <div class="saved-artwork">
                    <p class="eyebrow">SAVED INSPIRATION</p>

                    <div class="inspiration-list">
                      {#each plan.artworkIds as artworkId (artworkId)}
                        {@const artwork = tattoos.find((item) => item.id === artworkId)}

                        {#if artwork}
                          <div class="inspiration-item">
                            <span class="inspiration-symbol">{artwork.symbol}</span>

                            <div>
                              <strong>{artwork.title}</strong>
                              <p>{artwork.style} · {artwork.artist}</p>
                            </div>
                          </div>
                        {/if}
                      {/each}
                    </div>
                  </div>
                {/if}

                <p class="date">
                  CREATED {new Date(plan.createdAt).toLocaleDateString()}
                </p>
              </article>
            {/each}
          </div>
        {/if}
      </section>
    </div>

    <p class="privacy-note">
      Prototype: plans are saved only in this browser.
      They are not synced across devices and may disappear if
      browser storage is cleared. Avoid entering sensitive information.
    </p>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    background: #f2f0e9;
    color: #242522;
    font-family: Arial, Helvetica, sans-serif;
  }

  :global(*) { box-sizing: border-box; }

  :global(button), :global(input), :global(select),
  :global(textarea) { font: inherit; }

  :global(button:focus-visible), :global(a:focus-visible),
  :global(input:focus-visible), :global(select:focus-visible),
  :global(textarea:focus-visible) {
    outline: 2px solid #9c5848;
    outline-offset: 3px;
  }

  .page { max-width: 1600px; margin: auto; }

  header {
    padding: 25px 5%;
    border-bottom: 1px solid #d9d6ce;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .wordmark {
    font-family: Georgia, serif;
    font-weight: bold;
    font-size: 29px;
    letter-spacing: -1.8px;
    color: #242522;
    text-decoration: none;
  }

  .wordmark span { font-style: italic; font-weight: normal; }
  .back-link { color: #65675f; text-decoration: none; font-size: 13px; }
  main { padding: 60px 5% 90px; }
  .eyebrow { font-size: 10px; font-weight: bold; letter-spacing: 1.5px; color: #9c5848; }
  .intro { margin-bottom: 65px; }

  h1, h2, h3 { font-family: Georgia, serif; font-weight: normal; }

  h1 {
    font-size: clamp(48px, 6vw, 85px);
    line-height: 1.04;
    letter-spacing: -3px;
    margin: 25px 0;
  }

  h1 em { color: #767c70; }

  .intro > p:last-child {
    max-width: 440px;
    line-height: 1.8;
    font-size: 14px;
    color: #666960;
  }

  .workspace {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    gap: 65px;
  }

  h2 { font-size: 36px; letter-spacing: -1px; margin: 12px 0 30px; }

  form { display: flex; flex-direction: column; gap: 12px; }

  label { font-size: 12px; font-weight: bold; margin-top: 12px; }

  input, select, textarea {
    width: 100%;
    min-width: 0;
    border: 1px solid #d7d3c9;
    background: #e9e6dd;
    color: #242522;
    padding: 15px;
    border-radius: 0;
  }

  textarea { resize: vertical; line-height: 1.5; }

  .two-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .two-columns > div { display: flex; flex-direction: column; gap: 12px; }

  .create-button {
    background: #282a27;
    color: #f2f0e9;
    border: 0;
    padding: 17px 20px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin-top: 15px;
  }

  .create-button:hover { background: #42463f; }

  .collection-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  .count { font-size: 10px; letter-spacing: 1px; color: #777971; }
  .empty { padding: 70px 25px; border: 1px solid #d7d3c9; text-align: center; }
  .empty > span { font-size: 65px; color: #767c70; }
  .empty h3 { font-size: 28px; margin-bottom: 12px; }
  .empty p { font-size: 13px; line-height: 1.7; color: #777971; max-width: 290px; margin: auto; }
  .plan-list { display: grid; gap: 15px; }
  .plan-card { background: #e9e6dd; padding: 25px; border: 1px solid #d7d3c9; }
  .plan-top { display: flex; justify-content: space-between; align-items: center; }
  .plan-card h3 { font-size: 28px; margin: 20px 0 12px; }
  .description { font-size: 13px; line-height: 1.7; color: #666960; white-space: pre-wrap; overflow-wrap: anywhere; }
  .tags { display: flex; gap: 8px; flex-wrap: wrap; margin: 20px 0; }
  .tags span { font-size: 11px; padding: 8px 10px; border: 1px solid #c9c5bb; }
  .saved-artwork { border-top: 1px solid #c9c5bb; margin-top: 20px; padding-top: 20px; }
  .inspiration-list { display: grid; gap: 10px; }
  .inspiration-item { display: flex; align-items: center; gap: 15px; padding: 12px; background: #f2f0e9; }
  .inspiration-symbol { width: 55px; height: 55px; display: grid; place-items: center; background: #c9bdab; font-size: 30px; }
  .inspiration-item strong { font-family: Georgia, serif; font-size: 16px; font-weight: normal; }
  .inspiration-item p { font-size: 11px; color: #777971; margin: 5px 0 0; }
  .date { font-size: 10px; letter-spacing: 1px; color: #777971; margin: 20px 0 0; }
  .delete-button { background: none; border: 0; cursor: pointer; font-size: 12px; color: #9c5848; }
  .error { color: #9c5848; font-size: 12px; }
  .loading { color: #777971; font-size: 13px; }
  .privacy-note { margin-top: 60px; font-size: 11px; color: #777971; line-height: 1.7; }

  @media (max-width: 800px) {
    .workspace { grid-template-columns: 1fr; gap: 60px; }
  }

  @media (max-width: 500px) {
    main { padding-top: 40px; }
    .two-columns { grid-template-columns: 1fr; }
    h1 { letter-spacing: -2px; }
    header { gap: 15px; }
  }
</style>
