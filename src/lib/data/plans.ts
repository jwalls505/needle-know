export type TattooPlan = {
    id: string;
    title: string;
    description: string;
    style: string;
    placement: string;
    budget: number | null;
    artistIds: number[];
    artworkIds: number[];
    createdAt: string;
};

export function createTattooPlan(
    title: string,
    description: string,
    style: string,
    placement: string,
    budget: number | null,
): TattooPlan {
    return {
        id: crypto.randomUUID(),
        title,
        description,
        style,
        placement,
        budget,
        artistIds: [],
        artworkIds: [],
        createdAt: new Date().toISOString(),
    };
}