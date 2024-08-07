import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockPost: Post = {
    id: '1',
    title: 'Test Post',
    content: 'This is a test post.',
    author: 'Author Name',
    createdAt: new Date(),
  };

  const mockPostDto: CreatePostDto = {
    title: 'Test Post',
    content: 'This is a test post.',
    author: 'Author Name',
  };

  const mockUpdatePostDto: UpdatePostDto = {
    title: 'Updated Test Post',
    content: 'This is an updated test post.',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            findAll: jest.fn().mockReturnValue([mockPost]),
            findOne: jest.fn().mockReturnValue(mockPost),
            create: jest.fn().mockReturnValue(mockPost),
            update: jest.fn().mockReturnValue(mockPost),
            delete: jest.fn().mockReturnValue({ success: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', () => {
      const result = controller.findAll('desc');
      expect(service.findAll).toHaveBeenCalledWith('desc');
      expect(result).toEqual([mockPost]);
    });

    it('should handle errors', async () => {
      jest.spyOn(service, 'findAll').mockImplementationOnce(() => {
        throw new Error('An error occurred');
      });
      await expect(controller.findAll('desc')).rejects.toThrow(
        'An error occurred',
      );
    });
  });

  describe('findOne', () => {
    it('should return a post', () => {
      const result = controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockPost);
    });

    it('should handle errors', async () => {
      const error = new NotFoundException('An error occurred');
      jest.spyOn(service, 'findOne').mockImplementationOnce(() => {
        throw error;
      });
      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a post', () => {
      const result = controller.create(mockPostDto);
      expect(service.create).toHaveBeenCalledWith(mockPostDto);
      expect(result).toEqual(mockPost);
    });

    it('should handle errors', async () => {
      const error = new InternalServerErrorException('An error occurred');
      jest.spyOn(service, 'create').mockImplementationOnce(() => {
        throw error;
      });
      await expect(controller.create(mockPostDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('should update a post', () => {
      const result = controller.update('1', mockUpdatePostDto);
      expect(service.update).toHaveBeenCalledWith('1', mockUpdatePostDto);
      expect(result).toEqual(mockPost);
    });

    it('should handle errors', async () => {
      const error = new NotFoundException('An error occurred');
      jest.spyOn(service, 'update').mockImplementationOnce(() => {
        throw error;
      });
      await expect(controller.update('1', mockUpdatePostDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a post', () => {
      const result = controller.delete('1');
      expect(service.delete).toHaveBeenCalledWith('1');
      expect(result).toEqual({ success: true });
    });

    it('should handle errors', async () => {
      const error = new NotFoundException('An error occurred');
      jest.spyOn(service, 'delete').mockImplementationOnce(() => {
        throw error;
      });
      await expect(controller.delete('1')).rejects.toThrow(NotFoundException);
    });
  });
});
