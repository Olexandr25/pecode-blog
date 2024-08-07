import { NotFoundException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    service = new PostsService();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('findAll', () => {
    it('should return posts in descending order by default', () => {
      const createPostDto1: CreatePostDto = {
        title: 'First Post',
        content: 'Content 1',
        author: 'Author 1',
      };
      const createPostDto2: CreatePostDto = {
        title: 'Second Post',
        content: 'Content 2',
        author: 'Author 2',
      };

      service.create(createPostDto1);

      jest.advanceTimersByTime(1000);

      service.create(createPostDto2);

      expect(service.findAll()[0].title).toEqual('Second Post');
      expect(service.findAll()[1].title).toEqual('First Post');
    });
  });

  describe('findOne', () => {
    it('should return a post by id', () => {
      const createPostDto: CreatePostDto = {
        title: 'New Post',
        content: 'Content',
        author: 'Author',
      };
      const post = service.create(createPostDto);
      expect(service.findOne(post.id)).toEqual(post);
    });

    it('should throw NotFoundException if no post is found', () => {
      expect(() => service.findOne(uuidv4())).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new post with correct timestamps', () => {
      const createPostDto: CreatePostDto = {
        title: 'New Post',
        content: 'Content',
        author: 'Author',
      };
      const post = service.create(createPostDto);
      expect(post.createdAt).toBeDefined();
      expect(dayjs(post.createdAt).isValid()).toBe(true);
    });
  });

  describe('update', () => {
    it('should update a post and set updatedAt', () => {
      const createPostDto: CreatePostDto = {
        title: 'Initial Title',
        content: 'Initial Content',
        author: 'Initial Author',
      };
      const post = service.create(createPostDto);
      const updatedFields: UpdatePostDto = { title: 'Updated Title' };
      const updatedPost = service.update(post.id, updatedFields);
      expect(updatedPost.title).toEqual('Updated Title');
      expect(updatedPost.updatedAt).toBeDefined();
      expect(dayjs(updatedPost.updatedAt).isValid()).toBe(true);
    });

    it('should throw NotFoundException when trying to update a non-existing post', () => {
      const updatedFields: UpdatePostDto = { title: 'New Title' };
      expect(() => service.update(uuidv4(), updatedFields)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a post', () => {
      const createPostDto: CreatePostDto = {
        title: 'Post to delete',
        content: 'Content',
        author: 'Author',
      };
      const post = service.create(createPostDto);
      service.delete(post.id);
      expect(() => service.findOne(post.id)).toThrow(NotFoundException);
    });
  });
});
