import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { NewsRepository } from './news.repository';

@Module({
  imports: [TypeOrmModule.forFeature([News, NewsRepository])],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [TypeOrmModule],
})
export class NewsModule {}
