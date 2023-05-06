import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { InsertMovieDto } from './dto/insertMovie.dto';
import { UUID } from 'crypto';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getAllMovies() {
    return await this.movieService.getAllMovies();
  }

  @Get(':id')
  async findMovieById(@Param() { id }: { id: UUID }) {
    return await this.movieService.findMovieById(id);
  }

  @Post()
  async saveMovie(@Body() saveMovieDto: InsertMovieDto) {
    return await this.movieService.saveMovie(saveMovieDto);
  }

  @Patch(':id')
  async updateMovieById(
    @Param() { id }: { id: UUID },
    @Body() updateMovieDto: InsertMovieDto,
  ) {
    return await this.movieService.updateMovieById(
      await this.movieService.findMovieById(id),
      updateMovieDto,
    );
  }

  @Delete(':id')
  async removeMovieById(@Param() { id }: { id: UUID }) {
    return await this.movieService.removeMovieById(
      await this.movieService.findMovieById(id),
    );
  }

  @Delete()
  async removeAllMovies() {
    return await this.movieService.removeAllMovies(
      await this.movieService.getAllMovies(),
    );
  }
}
