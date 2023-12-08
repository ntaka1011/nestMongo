import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { PostShema } from './models/post.model';
import { PostRepository } from './repository/post.repository';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repository/category.repository';
import { CategoryController } from './controllers/category.controller';
import { CategorySchema } from './models/category.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostShema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
  ],
  providers: [PostService, PostRepository, CategoryService, CategoryRepository],
  controllers: [PostController, CategoryController],
})
export class PostModule {}
