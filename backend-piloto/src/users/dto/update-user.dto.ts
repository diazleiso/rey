import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User full name',
    example: 'Juan Pérez',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'User email address',
    example: 'juan.perez@example.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+56912345678',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'URL to user avatar image',
    example: 'https://picsum.photos/seed/juan/200/200.jpg',
  })
  avatar?: string;
}
