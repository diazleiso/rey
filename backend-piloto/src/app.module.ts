import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BenchmarkModule } from './benchmark/benchmark.module';

@Module({
  imports: [UsersModule, BenchmarkModule],
})
export class AppModule {}
