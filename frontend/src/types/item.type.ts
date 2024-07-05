import {TAdvantages} from './advantages.type';
import {TCoordinate} from './coordinate.type';
import {TContacts} from './contacts.type';

export type TItem = {
  id: string;
  type: "high" | "middle" | "low";
  address: string;
  distance: number;
  coverage: number;
  description: string;
  advantages: TAdvantages[];
  contacts: TContacts[];
  coordinate: TCoordinate;
  zoom: number;
}
