import type { ReactNode } from 'react';

export type DocGroup = 'Start here' | 'Understanding light' | 'Using the bench' | 'Engineering';

export type Doc = {
  slug: string;
  group: DocGroup;
  title: string;
  summary: string;
  body: () => ReactNode;
};

export const GROUPS: DocGroup[] = ['Start here', 'Understanding light', 'Using the bench', 'Engineering'];
