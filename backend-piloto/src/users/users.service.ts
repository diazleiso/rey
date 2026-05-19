import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { USERS_MOCK } from './mock/users.mock';

@Injectable()
export class UsersService {
  private users: UserDto[] = USERS_MOCK;

  findAll(): UserDto[] {
    return this.users;
  }

  findOne(id: string): UserDto | undefined {
    return this.users.find(user => user.id === id);
  }

  findByEmail(email: string): UserDto | undefined {
    return this.users.find(user => user.email === email);
  }

  create(userData: Omit<UserDto, 'id' | 'createdAt' | 'updatedAt'>): UserDto {
    const newUser: UserDto = {
      id: (this.users.length + 1).toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, userData: Partial<UserDto>): UserDto | undefined {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    return this.users[userIndex];
  }

  delete(id: string): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}
