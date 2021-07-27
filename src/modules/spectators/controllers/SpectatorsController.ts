import { Request, Response } from 'express';
import CreateSpectatorService from '../services/CreateSpectatorService';
import ListSpectatorsService from '../services/ListSpectatorsService';

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
}
