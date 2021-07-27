import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddSpectatorIdtoSpectadorMovieTable1627355235941
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'spectator_movie',
      new TableColumn({
        name: 'movie_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'spectator_movie',
      new TableForeignKey({
        name: 'Movie_Spectator_Movie',
        columnNames: ['movie_id'],
        referencedTableName: 'movies',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'spectator_movie',
      'Movie_Spectator_Movie',
    );
    await queryRunner.dropColumn('spectator_movie', 'movie_id');
  }
}
