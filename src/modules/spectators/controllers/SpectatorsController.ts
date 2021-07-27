import { Request, Response } from 'express';
import AttachSpectatorToAMovieService from '../services/AttachSpectatorToAMovieService';
import CreateSpectatorService from '../services/CreateSpectatorService';
import ListSpectatorsService from '../services/ListSpectatorsService';
import SpectatorsDetailsService from '../services/SpectatorsDetailsService';

export default class SpectatorsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const list = new ListSpectatorsService();

    const spectators = await list.execute();

    return response.status(200).json(spectators);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const create = new CreateSpectatorService();

    const spectator = await create.execute({ name });

    return response.status(200).json(spectator);
  }

  public async attach(request: Request, response: Response): Promise<Response> {
    const { spectator_id } = request.params;
    const { movie_id } = request.body;

    const attach = new AttachSpectatorToAMovieService();

    const watch = await attach.execute({ movie_id, spectator_id });

    return response.status(200).json(watch);
  }

  public async details(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const details = new SpectatorsDetailsService();

    const spectator = await details.execute({ id });

    return response.status(200).json(spectator);
  }
}
