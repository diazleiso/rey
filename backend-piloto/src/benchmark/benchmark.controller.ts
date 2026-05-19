import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { BenchmarkService } from './benchmark.service';
import { BenchmarkResultDto, BenchmarkQueryDto } from './dto/benchmark.dto';

@ApiTags('benchmark')
@Controller('benchmark')
export class BenchmarkController {
  constructor(private readonly benchmarkService: BenchmarkService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Run combined primes and fibonacci benchmark',
    description: 'Calculates prime numbers and fibonacci sequence with custom limits using multi-core processing'
  })
  @ApiQuery({
    name: 'fibonacciLimit',
    description: 'Fibonacci sequence position to calculate',
    type: 'number',
    example: 300,
    required: true
  })
  @ApiQuery({
    name: 'primeLimit',
    description: 'Maximum number to generate prime numbers up to',
    type: 'number',
    example: 2000,
    required: true
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Benchmark completed successfully',
    type: [BenchmarkResultDto]
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid parameters' 
  })
  async runBenchmark(@Query() query: BenchmarkQueryDto): Promise<BenchmarkResultDto[]> {
    return await this.benchmarkService.runBenchmark(query.fibonacciLimit, query.primeLimit);
  }
}
