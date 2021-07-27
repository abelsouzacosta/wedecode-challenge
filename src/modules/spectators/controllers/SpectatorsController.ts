import { Request, Response } from 'express';
import CreateSpectatorService from '../services/CreateSpectatorService';

export default class SpectatorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const create = new CreateSpectatorService();

    const spectator = await create.execute({ name });

    return response.status(200).json(spectator);
  }
}
