import { Request, Response } from 'express';
import CreateMovieService from '../services/CreateMovieService';
import DetailsMovieService from '../services/DetailsMovieService';
import ListMovieService from '../services/ListMoviesService';

export default class MovieController {
  public async index(request: Request, response: Response): Promise<Response> {
    const list = new ListMovieService();

    const movies = await list.execute();

    return response.status(200).json(movies);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, synopsis } = request.body;

    const create = new CreateMovieService();

    const movie = await create.execute({ title, synopsis });

    return response.status(200).json(movie);
  }

  public async details(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const details = new DetailsMovieService();

    const movie = await details.execute({ id });

    return response.status(200).json(movie);
  }
}
