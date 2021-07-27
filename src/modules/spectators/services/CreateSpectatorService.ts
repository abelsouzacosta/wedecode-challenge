import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { SpectatorRepository } from '../typeorm/repositories/SpectatorRepository';
import { Spectator } from '../typeorm/entities/Spectator';
import { ICreateSpectator } from '../interfaces/ICreateSpectator';

export default class CreateSpectatorService {
  public async execute({ name }: ICreateSpectator): Promise<Spectator> {
    // inicializa o repositório
    const repository: SpectatorRepository =
      getCustomRepository(SpectatorRepository);

    // cria ums instância de espectador
    const spectator = repository.create({
      name,
    });

    if (!(await repository.save(spectator)))
      throw new ApplicationError(
        'Was not possible to create an spectator instance',
      );

    return spectator;
  }
}
