import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { MovieRepository } from '../typeorm/repositories/MovieRepository';
import { Movie } from '../typeorm/entities/Movie';

export default class ListMovieService {
  public async execute(): Promise<Movie[]> {
    // inicializa o repositório
    const repository: MovieRepository = getCustomRepository(MovieRepository);

    // busca pelos filmes dentro do banco de dados
    const movies = await repository.find();

    // se não houver nenhum filme cadastrado lança um erro
    if (!movies) throw new ApplicationError('No movie found');

    return movies;
  }
}
