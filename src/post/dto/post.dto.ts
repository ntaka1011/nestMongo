import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  desription: string;
  content: string;
  user: string;
  categories: [string];
}

export class UpdatePostDto {
  @IsNotEmpty()
  id: number;
  content: string;
  @IsNotEmpty()
  title: string;
}
