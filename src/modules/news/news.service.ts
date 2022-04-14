import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { NewsRepository } from './news.repository';

@Injectable()
export class NewsService {
  constructor(private newsRepository: NewsRepository) {}

  create(createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsRepository.createNews(createNewsDto);
  }

  findAll(): Promise<News[]> {
    return this.newsRepository.findAll();
  }

  findOne(id: string): Promise<News> {
    return this.newsRepository.findById(id);
  }

  update(id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
    return this.newsRepository.updateNews(id, updateNewsDto);
  }

  remove(id: string): Promise<void> {
    return this.newsRepository.removeNews(id);
  }
}
