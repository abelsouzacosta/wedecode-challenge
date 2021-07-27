import { EntityRepository, Repository } from 'typeorm';
import { SpectatorMovie } from '../entities/SpectatorMovie';

@EntityRepository(SpectatorMovie)
export class SpectatorMovieRepository extends Repository<SpectatorMovie> {
  public async createWatch(
    spectator_id: string,
    movie_id: string,
  ): Promise<SpectatorMovie> {
    const watch = this.create({
      movie_id,
      spectator_id,
    });

    await this.save(watch);

    return watch;
  }
}
