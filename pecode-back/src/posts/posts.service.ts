import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private idCounter = 1;

  findAll(sortOrder: 'asc' | 'desc' = 'desc'): Post[] {
    try {
      const sortedPosts = [...this.posts].sort((a, b) => {
        return sortOrder === 'asc'
          ? dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
          : dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
      });
      return sortedPosts;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve posts.');
    }
  }

  findOne(id: number): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('Post not found.');
    }
    return post;
  }

  create(createPostDto: CreatePostDto): Post {
    try {
      const newPost: Post = {
        id: this.idCounter++,
        createdAt: dayjs().toDate(),
        ...createPostDto,
      };
      this.posts.push(newPost);
      return newPost;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create the post.');
    }
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException('Post not found.');
    }

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...updatePostDto,
      updatedAt: dayjs().toDate(),
    };
    return this.posts[postIndex];
  }

  delete(id: number): boolean {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException('Post not found.');
    }

    this.posts.splice(postIndex, 1);
    return true;
  }
}
