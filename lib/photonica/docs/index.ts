import { START } from './content-start';
import { LIGHT } from './content-light';
import { USING } from './content-using';
import { ENG } from './content-eng';
import { GROUPS, type Doc, type DocGroup } from './types';

export const DOCS: Doc[] = [...START, ...LIGHT, ...USING, ...ENG];

export const byGroup = (): { group: DocGroup; docs: Doc[] }[] =>
  GROUPS.map((group) => ({ group, docs: DOCS.filter((d) => d.group === group) }));

export const findDoc = (slug: string) => DOCS.find((d) => d.slug === slug);
export const docIndex = (slug: string) => DOCS.findIndex((d) => d.slug === slug);
export { GROUPS };
export type { Doc, DocGroup };
