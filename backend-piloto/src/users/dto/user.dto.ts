import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Unique user identifier',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Juan Pérez',
  })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'juan.perez@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+56912345678',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    description: 'URL to user avatar image',
    example: 'https://picsum.photos/seed/juan/200/200.jpg',
    required: false,
  })
  avatar?: string;

  @ApiProperty({
    description: 'User creation timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'User last update timestamp',
    example: '2024-03-10T14:20:00Z',
  })
  updatedAt: string;
}
