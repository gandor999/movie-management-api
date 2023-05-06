import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './modules/movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './modules/movie/entities/movie.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MovieModule,
    ConfigModule.forRoot({
      envFilePath: 'src/env/development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [Movie],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
