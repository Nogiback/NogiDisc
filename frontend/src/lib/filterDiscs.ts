import { Disc } from '@prisma/client';

type SelectedFilters = {
  brands: string[];
  names: string[];
  categories: string[];
  speeds: number[];
  glides: number[];
  turns: number[];
  fades: number[];
};

export function filterDiscs(discs: Disc[], filters: SelectedFilters): Disc[] {
  return discs.filter((disc) => {
    // If no filters are selected for a category, don't filter by that category
    const brandMatch =
      filters.brands.length === 0 || filters.brands.includes(disc.brand);
    const nameMatch =
      filters.names.length === 0 || filters.names.includes(disc.name);
    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.includes(disc.category);
    const speedMatch =
      filters.speeds.length === 0 || filters.speeds.includes(disc.speed);
    const glideMatch =
      filters.glides.length === 0 || filters.glides.includes(disc.glide);
    const turnMatch =
      filters.turns.length === 0 || filters.turns.includes(disc.turn);
    const fadeMatch =
      filters.fades.length === 0 || filters.fades.includes(disc.fade);

    return (
      brandMatch &&
      nameMatch &&
      categoryMatch &&
      speedMatch &&
      glideMatch &&
      turnMatch &&
      fadeMatch
    );
  });
}
