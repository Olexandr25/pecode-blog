import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from './entities/post.entity';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query('sortOrder') sortOrder: 'asc' | 'desc') {
    return this.postsService.findAll(sortOrder);
  }

  @Get(':id')
  findOne(@Param('id') id: string): PostModel {
    return this.postsService.findOne(+id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto): PostModel {
    return this.postsService.create(createPostDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): PostModel {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.postsService.delete(+id);
  }
}
