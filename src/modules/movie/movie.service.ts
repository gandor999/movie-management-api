import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertMovieDto } from './dto/insertMovie.dto';
import { UUID } from 'crypto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async getAllMovies(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async saveMovie(saveMovieDto: InsertMovieDto): Promise<Movie> {
    return await this.movieRepository.save(saveMovieDto);
  }

  async updateMovieById(
    movie: Movie,
    updateMovie: InsertMovieDto,
  ): Promise<Movie> {
    return await this.movieRepository.save({ id: movie.id, ...updateMovie });
  }

  async findMovieById(id: UUID): Promise<Movie> {
    return await this.movieRepository.findOne({ where: { id } });
  }

  async removeMovieById(movie: Movie): Promise<Movie> {
    return await this.movieRepository.remove(movie);
  }

  async removeAllMovies(movies: Movie[]): Promise<Movie[]> {
    return Promise.all(
      movies.map(async (movie) => await this.movieRepository.remove(movie)),
    );
  }
}
