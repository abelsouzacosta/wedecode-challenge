import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { MovieRepository } from '../typeorm/repositories/MovieRepository';
import { ICreateMovie } from '../interfaces/ICreateMovie';
import { Movie } from '../typeorm/entities/Movie';

export default class CreateMovieService {
  public async execute({ title, synopsis }: ICreateMovie): Promise<Movie> {
    // inicializa o repositório
    const repository: MovieRepository = getCustomRepository(MovieRepository);

    // verifica se o filme já está cadastrado
    // não permite duplicação desnecessária
    const getMovieByTitle = await repository.findByTitle(title);

    if (getMovieByTitle)
      throw new ApplicationError('This movie already exists');

    // cria a instância de um filme
    const movie = repository.create({
      title,
      synopsis,
    });

    // verifica se foi possível cadastrar o filme, caso n tenha sido
    // lança um erro
    if (!(await repository.save(movie)))
      throw new ApplicationError('Was not possible to create movie instance');

    return movie;
  }
}
