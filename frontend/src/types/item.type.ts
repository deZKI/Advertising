import {TCoverageTypes} from './coverageTypes';
import {TAdvantages} from './advantages.type';
import {TCoordinate} from './coordinate.type';

export type TItem = {
  id: string;
  type: TCoverageTypes;
  address: string;
  coverage: number;
  description: string;
  advantages: TAdvantages[];
  coordinate: TCoordinate;
  zoom: number;
}
