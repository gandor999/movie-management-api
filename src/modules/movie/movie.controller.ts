import { Controller, Get } from '@nestjs/common';

@Controller('movie')
export class MovieController {
  @Get()
  getAllMovies() {
    return 'Return all movies';
  }
}
