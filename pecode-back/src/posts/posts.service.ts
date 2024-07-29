import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs'; // Використовуйте цей імпорт
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private idCounter = 1;

  findAll(sortOrder: 'asc' | 'desc' = 'desc'): Post[] {
    return this.posts.sort((a, b) => {
      return sortOrder === 'asc'
        ? dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
        : dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
    });
  }

  findOne(id: number): Post {
    return this.posts.find((post) => post.id === id);
  }

  create(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id: this.idCounter++,
      createdAt: dayjs().toDate(),
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) return null;
    this.posts[postIndex] = { ...this.posts[postIndex], ...updatePostDto };
    return this.posts[postIndex];
  }

  delete(id: number): void {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
