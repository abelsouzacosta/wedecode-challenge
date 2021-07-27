import { EntityRepository, Repository } from 'typeorm';
import { Movie } from '../entities/Movie';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  public async findById(id: string): Promise<Movie | undefined> {
    const movie = this.findOne({
      where: {
        id,
      },
    });

    return movie;
  }
}
