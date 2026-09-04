import { tableFeatures } from "@tanstack/react-table";

// Only core features are registered; unused features are tree-shaken out
export const features = tableFeatures({});

export type DataTableFeatures = typeof features;
