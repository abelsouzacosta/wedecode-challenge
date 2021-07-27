import { Request, Response } from 'express';
import CreateMovieService from '../services/CreateMovieService';

export default class MovieController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, synopsis } = request.body;

    const create = new CreateMovieService();

    const movie = await create.execute({ title, synopsis });

    return response.status(200).json(movie);
  }
}
