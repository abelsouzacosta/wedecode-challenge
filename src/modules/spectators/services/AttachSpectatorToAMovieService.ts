import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { MovieRepository } from '@modules/movies/typeorm/repositories/MovieRepository';
import { SpectatorRepository } from '../typeorm/repositories/SpectatorRepository';
import { SpectatorMovieRepository } from '../typeorm/repositories/SpectatorMovieRepository';
import { IAttachSpectatorToAMovie } from '../interfaces/IAttachSpectatorToAMovie';
import { SpectatorMovie } from '../typeorm/entities/SpectatorMovie';

export default class AttachSpectatorToAMovieService {
  public async execute({
    movie_id,
    spectator_id,
  }: IAttachSpectatorToAMovie): Promise<SpectatorMovie> {
    // inicializando os repositórios
    const movieRepository: MovieRepository =
      getCustomRepository(MovieRepository);

    const spectatorRepository: SpectatorRepository =
      getCustomRepository(SpectatorRepository);

    const repository: SpectatorMovieRepository = getCustomRepository(
      SpectatorMovieRepository,
    );

    // busca pelo espectador para verificar se ele realmente existe no banco de dados
    const spectator = await spectatorRepository.findById(spectator_id);

    if (!spectator) throw new ApplicationError('Spectator not found');

    // busca pelo filme para verificar se ele realmente existe no banco de dados
    const movie = await movieRepository.findOne({
      where: {
        id: movie_id,
      },
    });

    if (!movie) throw new ApplicationError('Movie not found');

    // busca todas as relações do espectador
    // todos os filmes que ele assistiu
    const watchedMovies = await repository.findBySpectatorId(spectator_id);

    if (watchedMovies) {
      // verifica se dentro da lista de filmes assistidos pelo espectador
      // o filme passado por parâmetro já existe
      const alreadySettedAsWatched = watchedMovies.find(
        watch => watch.movie_id === movie_id,
      );

      if (alreadySettedAsWatched !== undefined)
        throw new ApplicationError(
          'This spectator has already watched the given movie',
        );
    }

    // cria a instância de relacionamento
    const setAsWatch = await repository.createWatch({
      movie_id,
      spectator_id,
    });

    // verifica se não foi possível salvar o relacionamento
    if (!setAsWatch)
      throw new ApplicationError(
        'For some reason we have a problem trying to estabilish the relationship',
      );

    return setAsWatch;
  }
}
