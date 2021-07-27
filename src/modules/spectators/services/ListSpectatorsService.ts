import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { SpectatorRepository } from '../typeorm/repositories/SpectatorRepository';
import { Spectator } from '../typeorm/entities/Spectator';

export default class ListSpectatorsService {
  public async execute(): Promise<Spectator[]> {
    // inicializando o repositório
    const repository: SpectatorRepository =
      getCustomRepository(SpectatorRepository);

    // busca todas as instâncias de espectador no banco de dados
    const spectators = await repository.find();

    // se nenhum for encontrado lança um erro
    if (!spectators) throw new ApplicationError('No spectator found');

    return spectators;
  }
}
