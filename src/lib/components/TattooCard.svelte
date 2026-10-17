<script lang="ts">
import type { Tattoo } from '../data/tattoos';

type Props = {
    tattoo: Tattoo;
    isSaved: boolean;
    onToggleSave: (id: number) => void;
};

let { tattoo, isSaved, onToggleSave }: Props = $props();
</script>

<article class="artwork">
    <div
        class="artwork-image"
        style:background={tattoo.tone}
        style:height={`${tattoo.height}px`}
     >
     <span class="artwork-symbol" aria-hidden="true">
        {tattoo.symbol}
     </span>
       <span class="study-label">
      STUDY {String(tattoo.id).padStart(2, '0')}
    </span>
        <button
      class="save-button"
      class:saved={isSaved}
      aria-label={`${isSaved ? 'Remove' : 'Save'} ${tattoo.title}`}
      aria-pressed={isSaved}
      onclick={() => onToggleSave(tattoo.id)}
    >
      {isSaved ? '♥' : '♡'}
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



<style>
  .artwork {
    break-inside: avoid;
    margin-bottom: 32px;
  }

  .artwork-image {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .artwork-symbol {
    font-family: Georgia, serif;
    font-size: 140px;
    color: #343832;
    opacity: 0.82;
    transition: transform 0.4s ease;
  }

  .artwork:hover .artwork-symbol {
    transform: scale(1.08) rotate(-5deg);
  }

  .study-label {
    position: absolute;
    bottom: 15px;
    left: 16px;
    font-size: 9px;
    color: #343832;
    letter-spacing: 1.5px;
  }

  .save-button {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 38px;
    height: 38px;
    border: 0;
    background: #f2f0e9e8;
    color: #242522;
    font-size: 24px;
    cursor: pointer;
  }

  .save-button.saved {
    color: #9c5848;
  }

  .artwork-meta {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 10px;
    padding-top: 13px;
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
  }

  @media (max-width: 600px) {
    .artwork {
      margin-bottom: 22px;
    }

    .artwork-image {
      max-height: 300px;
    }

    .artwork-symbol {
      font-size: 80px;
    }

    .artwork-meta {
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
  }
</style>