import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private idCounter = 1;

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    return this.posts.find((post) => post.id === id);
  }

  create(createPostDto: CreatePostDto): Post {
    const newPost: Post = {
      id: this.idCounter++,
      createdAt: new Date(),
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
