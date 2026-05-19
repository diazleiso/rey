import { UserDto } from '../dto/user.dto';

export const USERS_MOCK: UserDto[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+56912345678',
    avatar: 'https://picsum.photos/seed/juan/200/200.jpg',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-10T14:20:00Z',
  },
  {
    id: '2',
    name: 'María González',
    email: 'maria.gonzalez@example.com',
    phone: '+56998765432',
    avatar: 'https://picsum.photos/seed/maria/200/200.jpg',
    createdAt: '2024-02-20T09:15:00Z',
    updatedAt: '2024-03-12T16:45:00Z',
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@example.com',
    phone: '+56955556666',
    createdAt: '2024-01-10T11:00:00Z',
    updatedAt: '2024-03-05T10:30:00Z',
  },
  {
    id: '4',
    name: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    phone: '+56977778888',
    avatar: 'https://picsum.photos/seed/ana/200/200.jpg',
    createdAt: '2024-03-01T13:45:00Z',
    updatedAt: '2024-03-11T12:00:00Z',
  },
  {
    id: '5',
    name: 'Luis Silva',
    email: 'luis.silva@example.com',
    phone: '+56933334444',
    avatar: 'https://picsum.photos/seed/luis/200/200.jpg',
    createdAt: '2024-02-15T08:30:00Z',
    updatedAt: '2024-03-08T15:20:00Z',
  },
];
