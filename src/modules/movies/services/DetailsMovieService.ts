import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { MovieRepository } from '../typeorm/repositories/MovieRepository';
import { IMovieFind } from '../interfaces/IMovieFind';
import { IMovieFindResponse } from '../interfaces/IMovieFindResponse';
import { SpectatorMovieRepository } from '@modules/spectators/typeorm/repositories/SpectatorMovieRepository';

export default class DetailsMovieService {
  public async execute({ id }: IMovieFind): Promise<IMovieFindResponse> {
    const movieRepository: MovieRepository =
      getCustomRepository(MovieRepository);

    const spectatorMovieRepository: SpectatorMovieRepository =
      getCustomRepository(SpectatorMovieRepository);

    const movie = await movieRepository.findById(id);

    // verifica se o filme realmente existe
    if (!movie) throw new ApplicationError('Movie not found');

    // busca todas as instâncias do filme na tabela de relacionamento
    const countSpectators = await spectatorMovieRepository.findByMovieId(id);

    return {
      movie,
      total_spectators: countSpectators ? countSpectators.length : 0,
    };
  }
}
