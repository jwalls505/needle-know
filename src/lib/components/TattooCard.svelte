<script lang="ts">
	import type { Tattoo } from '../data/tattoos';

	type Props = {
		tattoo: Tattoo;
		isSaved: boolean;
		onToggleSave: (id: number) => void;
		onAddToPlan: (id: number) => void;
	};

	let { tattoo, isSaved, onToggleSave, onAddToPlan }: Props = $props();
</script>

<article class="artwork">
	<div class="artwork-image" style:background={tattoo.tone}>
		<span class="artwork-symbol" aria-hidden="true">
			{tattoo.symbol}
		</span>
		<span class="study-label">STUDY {String(tattoo.id).padStart(2, '0')}</span>
		<button
			class="save-button"
			class:saved={isSaved}
			aria-label={`${isSaved ? 'Remove' : 'Save'} ${tattoo.title}`}
			aria-pressed={isSaved}
			onclick={() => onToggleSave(tattoo.id)}
		>
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path
					d="M20.4 4.9a5.1 5.1 0 0 0-7.2 0L12 6.1l-1.2-1.2a5.1 5.1 0 0 0-7.2 7.2l1.2 1.2L12 20.5l7.2-7.2 1.2-1.2a5.1 5.1 0 0 0 0-7.2Z"
					fill={isSaved ? 'currentColor' : 'none'}
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>

	<div class="artwork-meta">
		<div class="artwork-details">
			<div>
				<h3>{tattoo.title}</h3>
				<p>{tattoo.artist} · {tattoo.neighborhood}</p>
			</div>
			<span class="style-tag">{tattoo.style}</span>
		</div>
		<button class="add-to-plan" onclick={() => onAddToPlan(tattoo.id)}>
			Add to a tattoo plan
		</button>
	</div>
</article>

<style>
	.artwork {
		break-inside: avoid;
		margin-bottom: 32px;
	}

	.artwork-image {
		position: relative;
		aspect-ratio: 4 / 5;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 14px;
	}

	.artwork-symbol {
		font-family: Georgia, serif;
		font-size: clamp(88px, 11vw, 136px);
		color: #343832;
		opacity: 0.76;
		font-weight: 400;
		line-height: 1;
		transition:
			transform 0.4s ease,
			opacity 0.4s ease;
	}

	.artwork:hover .artwork-symbol {
		transform: translateY(-3px) scale(1.03);
		opacity: 0.92;
	}

	.study-label {
		position: absolute;
		bottom: 15px;
		left: 16px;
		font-size: 9px;
		color: #343832;
		letter-spacing: 1.5px;
		text-transform: uppercase;
	}

	.save-button {
		position: absolute;
		top: 14px;
		right: 14px;
		z-index: 1;
		display: grid;
		width: 40px;
		height: 40px;
		place-items: center;
		border: 1px solid rgb(36 37 34 / 10%);
		background: #f2f0e9e8;
		color: #242522;
		border-radius: 999px;
		padding: 0;
		cursor: pointer;
		transition:
			color 0.2s ease,
			transform 0.2s ease,
			background 0.2s ease;
	}

	.save-button svg {
		width: 19px;
		height: 19px;
	}

	.save-button.saved {
		color: #9c5848;
		background: #f8f6f1;
	}

	.save-button:hover {
		transform: translateY(-1px);
	}

	.save-button:focus-visible {
		outline: 2px solid #9c5848;
		outline-offset: 3px;
	}

	.artwork-meta {
		padding-top: 13px;
	}

	.artwork-details {
		display: flex;
		justify-content: space-between;
		align-items: start;
		gap: 10px;
	}

	.artwork-meta h3 {
		font-family: Georgia, serif;
		font-size: 17px;
		font-weight: normal;
		margin: 0 0 6px;
	}

	.artwork-meta p {
		font-size: 11px;
		color: #777971;
		margin: 0;
		line-height: 1.5;
	}

	.style-tag {
		color: #777971;
		font-size: 10px;
		white-space: nowrap;
		padding-top: 4px;
		border-bottom: 1px solid #c9c5bb;
		padding-bottom: 4px;
	}

	@media (max-width: 600px) {
		.artwork {
			margin-bottom: 22px;
		}

		.artwork-symbol {
			font-size: clamp(58px, 17vw, 82px);
		}

		.artwork-details {
			flex-direction: column;
			gap: 4px;
		}

		.artwork-meta h3 {
			font-size: 15px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.artwork-symbol {
			transition: none;
		}
		.save-button {
			transition: none;
		}
		.save-button:hover {
			transform: none;
		}
	}
	.add-to-plan {
		width: 100%;
		margin-top: 12px;
		padding: 10px 0;
		border: 0;
		border-bottom: 1px solid #c9c5bb;
		background: transparent;
		color: #343832;
		cursor: pointer;
		font-size: 12px;
		text-align: left;
	}

	.add-to-plan:hover {
		color: #9c5848;
		border-color: #9c5848;
	}
</style>
