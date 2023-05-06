import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid', { name: 'movie_id' })
  id: string;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', { nullable: true })
  synopsis: string;

  @Column('text', { nullable: true })
  uri: string;

  @Column('timestamp with time zone', { nullable: true })
  releaseDate: Date;
}
