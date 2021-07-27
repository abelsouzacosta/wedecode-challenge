import { SpectatorMovie } from '@modules/spectators/typeorm/entities/SpectatorMovie';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// entidade representa a tabela movies
@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  synopsis: string;

  @OneToMany(() => SpectatorMovie, spectator_movie => spectator_movie.movie, {
    cascade: true,
  })
  spectator_movie: SpectatorMovie[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
