import { Spectator } from '../typeorm/entities/Spectator';

export interface ISpectatorFindResponse {
  spectator: Spectator;
  count: number;
}
