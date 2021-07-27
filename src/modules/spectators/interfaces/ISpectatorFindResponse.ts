import { Spectator } from '../typeorm/entities/Spectator';

export interface ISpectatorFindResponse {
  spectator: Spectator;
  movies_watched: number;
}
