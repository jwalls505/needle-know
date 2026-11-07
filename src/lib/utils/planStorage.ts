
import type { TattooPlan } from '$lib/data/plans';

const STORAGE_KEY = 'needle-know-plans-v1';

export function getPlans(): TattooPlan[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is TattooPlan =>
        item !== null &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.title === 'string' &&
        Array.isArray(item.artworkIds)
    );
  } catch {
    return [];
  }
}

export function savePlans(plans: TattooPlan[]): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
}

export function addArtworkToPlan(
  planId: string,
  artworkId: number
): 'added' | 'duplicate' | 'not-found' {
  const plans = getPlans();
  const plan = plans.find((item) => item.id === planId);

  if (!plan) return 'not-found';

  if (plan.artworkIds.includes(artworkId)) {
    return 'duplicate';
  }

  plan.artworkIds.push(artworkId);
  savePlans(plans);

  return 'added';
}

export function removeArtworkFromPlan(
  planId: string,
  artworkId: number
): TattooPlan[] {
  const plans = getPlans();

  const updatedPlans = plans.map((plan) => {
    if (plan.id !== planId) {
      return plan;
    }

    return {
      ...plan,
      artworkIds: plan.artworkIds.filter(
        (id) => id !== artworkId
      )
    };
  });

  savePlans(updatedPlans);

  return updatedPlans;
}