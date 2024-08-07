import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from './entities/post.entity';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'List of posts retrieved successfully.',
  })
  findAll(@Query('sortOrder') sortOrder: 'asc' | 'desc') {
    return this.postsService.findAll(sortOrder);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved post.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  findOne(@Param('id') id: string): PostModel {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Post created successfully.',
    type: PostModel,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    type: CreatePostDto,
    description: 'Data for creating a new post',
    examples: {
      example1: {
        value: {
          title: 'My First Post',
          content:
            'This is the content of my first post. It talks about interesting things.',
          author: 'John Doe',
        },
      },
    },
  })
  create(@Body() createPostDto: CreatePostDto): PostModel {
    return this.postsService.create(createPostDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing post' })
  @ApiResponse({
    status: 200,
    description: 'Post updated successfully.',
    type: PostModel,
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @ApiBody({
    type: UpdatePostDto,
    description: 'Data for updating a post',
    examples: {
      example1: {
        value: {
          title: 'Updated Title',
          content: 'This is the updated content of the post.',
          author: 'Updated Author',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): PostModel {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 204, description: 'Post deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  delete(@Param('id') id: string): boolean {
    return this.postsService.delete(id);
  }
}
