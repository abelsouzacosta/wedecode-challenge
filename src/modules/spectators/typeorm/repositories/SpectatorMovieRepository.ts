import { EntityRepository, Repository } from 'typeorm';
import { SpectatorMovie } from '../entities/SpectatorMovie';

interface IWatch {
  spectator_id: string;
  movie_id: string;
}

@EntityRepository(SpectatorMovie)
export class SpectatorMovieRepository extends Repository<SpectatorMovie> {
  // ao receber os parâmetros vai inserir as informações dentro do banco de dados
  public async createWatch({
    movie_id,
    spectator_id,
  }: IWatch): Promise<SpectatorMovie | undefined> {
    const watch = this.create({
      movie_id,
      spectator_id,
    });

    await this.save(watch);

    return watch;
  }

  // faz uma busca pelo id do espectador
  public async findBySpectatorId(
    spectator_id: string,
  ): Promise<SpectatorMovie[] | undefined> {
    const spectator = await this.find({
      where: {
        spectator_id,
      },
    });

    return spectator;
  }

  // faz uma busca pelo id do filme
  public async findByMovieId(
    movie_id: string,
  ): Promise<SpectatorMovie[] | undefined> {
    const movie = await this.find({
      where: {
        movie_id,
      },
    });

    return movie;
  }
}
