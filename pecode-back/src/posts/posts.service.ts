import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

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

  findOne(id: string): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('Post not found.');
    }
    return post;
  }

  create(createPostDto: CreatePostDto): Post {
    try {
      const newPost: Post = {
        id: uuidv4(),
        createdAt: dayjs().toDate(),
        ...createPostDto,
      };
      this.posts.push(newPost);
      return newPost;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create the post.');
    }
  }

  update(id: string, updatePostDto: UpdatePostDto): Post {
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

  delete(id: string): boolean {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException('Post not found.');
    }

    this.posts.splice(postIndex, 1);
    return true;
  }
}
