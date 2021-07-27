import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddMovieIdtoSpectadorMovieTable1627356182244
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'spectator_movie',
      new TableColumn({
        name: 'spectator_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'spectator_movie',
      new TableForeignKey({
        name: 'Spectator_Spectator_Movie',
        columnNames: ['spectator_id'],
        referencedTableName: 'spectators',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'spectator_movie',
      'Spectator_Spectator_Movie',
    );
    await queryRunner.dropColumn('spectator_movie', 'spectator_id');
  }
}
