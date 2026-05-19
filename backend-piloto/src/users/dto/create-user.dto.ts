import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
}
