import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }



  @Post()
  @ApiOperation({ summary: 'Create Category Ticket Issue' })
  @ApiBody({
    description: 'Category data', schema: {
      example: {
        name: 'Elétrica',
        description: 'Chamados relacionado a fiação elétrica e equipamentos, maquinas eletricas',
      }
    }
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Categories' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category by id' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category by id' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
