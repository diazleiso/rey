import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all users',
    type: [UserDto]
  })
  findAll(): UserDto[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', example: '1' })
  @ApiResponse({ 
    status: 200, 
    description: 'User found',
    type: UserDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'User not found' 
  })
  findOne(@Param('id') id: string): UserDto | undefined {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiParam({ name: 'email', description: 'User email', example: 'juan.perez@example.com' })
  @ApiResponse({ 
    status: 200, 
    description: 'User found',
    type: UserDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'User not found' 
  })
  findByEmail(@Param('email') email: string): UserDto | undefined {
    return this.usersService.findByEmail(email);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'User created successfully',
    type: UserDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input data' 
  })
  create(@Body() createUserDto: CreateUserDto): UserDto {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', description: 'User ID', example: '1' })
  @ApiResponse({ 
    status: 200, 
    description: 'User updated successfully',
    type: UserDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'User not found' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input data' 
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): UserDto | undefined {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User ID', example: '1' })
  @ApiResponse({ 
    status: 200, 
    description: 'User deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'User deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'User not found' }
      }
    }
  })
  delete(@Param('id') id: string): { success: boolean; message: string } {
    const success = this.usersService.delete(id);
    return {
      success,
      message: success ? 'User deleted successfully' : 'User not found',
    };
  }
}
