import { GridCoordinates } from './grid';

export interface Cell extends Readonly<GridCoordinates> {
  readonly locked: boolean;
  value: number|null;
}
