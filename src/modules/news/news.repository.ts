import { EntityRepository, Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@EntityRepository(News)
export class NewsRepository extends Repository<News> {
  public async createNews(createNews: CreateNewsDto): Promise<News> {
    const { title, content } = createNews;
    const news = new News();

    news.title = title;
    news.content = content;

    return await this.save(news);
  }

  public async findAll(): Promise<News[]> {
    return await this.find();
  }

  public async findById(newsId: string): Promise<News> {
    return await this.findOne(newsId);
  }

  public async updateNews(newsId: string, updateNewsDto: UpdateNewsDto): Promise<News> {
    const { title, content } = updateNewsDto;
    const news = await this.findOne(newsId);

    news.title = title || news.title;
    news.content = content || news.content;

    return await this.save(news);
  }

  public async removeNews(newsId: string): Promise<void> {
    const news = await this.findOne(newsId);
    await this.remove(news);
  }
}
