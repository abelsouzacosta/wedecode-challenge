import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SpectatorMovie } from './SpectatorMovie';

@Entity('spectators')
export class Spectator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => SpectatorMovie,
    spectator_movie => spectator_movie.spectator,
    {
      cascade: true,
    },
  )
  spectator_movie: SpectatorMovie[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
