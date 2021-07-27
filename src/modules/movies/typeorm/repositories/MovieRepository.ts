import { EntityRepository, Repository } from 'typeorm';
import { Movie } from '../entities/Movie';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  // encontra um filme pelo id passado
  public async findById(id: string): Promise<Movie | undefined> {
    const movie = await this.findOne({
      where: {
        id,
      },
    });

    return movie;
  }

  // encontra um filme pelo titulo passado
  public async findByTitle(title: string): Promise<Movie | undefined> {
    const movie = await this.findOne({
      where: {
        title,
      },
    });

    return movie;
  }
}
