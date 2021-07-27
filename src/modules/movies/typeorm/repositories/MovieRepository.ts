import { EntityRepository, Repository } from 'typeorm';
import { Movie } from '../entities/Movie';

interface IMovie {
  movie_id: string;
}

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  // encontra um filme pelo id passado
  public async findById({ movie_id }: IMovie): Promise<Movie | undefined> {
    const movie = await this.findOne({
      where: {
        id: movie_id,
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
