import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BenchmarkResultDto {
  @ApiProperty({
    description: 'Type of benchmark operation',
    example: 'combined_primes_fibonacci',
  })
  operation: string;

  @ApiProperty({
    description: 'Benchmark result with fibonacci and primes data',
    example: {
      fibonacci: 832040,
      primesCount: 46,
      lastPrime: 199,
      primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29],
    },
  })
  result: {
    fibonacci: number;
    primesCount: number;
    lastPrime: number;
    primes: number[];
  };

  @ApiProperty({
    description: 'Execution time in milliseconds',
    example: 125,
  })
  executionTimeMs: number;

  @ApiProperty({
    description: 'Timestamp when benchmark was executed',
    example: '2024-03-12T14:30:00.000Z',
  })
  timestamp: string;
}

export class BenchmarkQueryDto {
  @ApiProperty({
    description: 'Fibonacci sequence position to calculate',
    example: 300,
    minimum: 1,
    maximum: 1000,
  })
  fibonacciLimit: number;

  @ApiProperty({
    description: 'Maximum number to generate prime numbers up to',
    example: 2000,
    minimum: 2,
    maximum: 10000,
  })
  primeLimit: number;
}
