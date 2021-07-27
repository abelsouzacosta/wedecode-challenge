import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { SpectatorRepository } from '../typeorm/repositories/SpectatorRepository';
import { SpectatorMovieRepository } from '../typeorm/repositories/SpectatorMovieRepository';
import { IFindSpectator } from '../interfaces/IFindSpectator';
import { ISpectatorFindResponse } from '../interfaces/ISpectatorFindResponse';

export default class SpectatorsDetailsService {
  public async execute({
    id,
  }: IFindSpectator): Promise<ISpectatorFindResponse> {
    // inicialização de repositórios
    const spectatorRepository: SpectatorRepository =
      getCustomRepository(SpectatorRepository);

    const spectatorMovieRepository: SpectatorMovieRepository =
      getCustomRepository(SpectatorMovieRepository);

    // verifica se o espectador realmente existe
    const spectator = await spectatorRepository.findById(id);

    if (!spectator) throw new ApplicationError('Spectator not found');

    // encontra as instâncias do id do espectador na tabela de relacionamento
    // essa será a quantidade de filmes assistidos
    const countWatchedMovies = await spectatorMovieRepository.find({
      where: {
        spectator_id: spectator.id,
      },
    });

    return {
      spectator,
      movies_watched: countWatchedMovies ? countWatchedMovies.length : 0,
    };
  }
}
