import { EntityRepository, Repository } from 'typeorm';
import { Spectator } from '../entities/Spectator';

@EntityRepository(Spectator)
export class SpectatorRepository extends Repository<Spectator> {
  // busca pelo id do espectador
  public async findById(id: string): Promise<Spectator | undefined> {
    const spectator = await this.findOne({
      where: {
        id,
      },
    });

    return spectator;
  }

  // busca o espectador pelo nome
  public async findByName(name: string): Promise<Spectator | undefined> {
    const spectator = await this.findOne({
      where: {
        name,
      },
    });

    return spectator;
  }
}
