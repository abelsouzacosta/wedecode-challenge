import { Movie } from '../typeorm/entities/Movie';

export interface IMovieFindResponse {
  movie: Movie;
  total_spectators: number;
}
