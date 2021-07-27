import { Movie } from '@modules/movies/typeorm/entities/Movie';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('spectator_movie')
export class SpectatorMovie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // relacionamento de muitos para 1 (1:n)
  // entre a tabela movies e spectator_movie
  // o id de um filme pode se repetir nessa tabela
  @ManyToOne(() => Movie, movie => movie.spectator_movie)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
