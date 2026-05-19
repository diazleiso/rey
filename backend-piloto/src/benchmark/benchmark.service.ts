import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';

export interface BenchmarkResult {
  operation: string;
  result: {
    fibonacci: number;
    primesCount: number;
    lastPrime: number;
    primes: number[];
  };
  executionTimeMs: number;
  timestamp: string;
}

@Injectable()
export class BenchmarkService {
  // Prime number checker
  private isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    let i = 5;
    while (i * i <= n) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
      i += 6;
    }
    return true;
  }

  // Generate prime numbers up to n
  private generatePrimes(n: number): number[] {
    const primes: number[] = [];
    for (let i = 2; i <= n; i++) {
      if (this.isPrime(i)) {
        primes.push(i);
      }
    }
    return primes;
  }

  // Fibonacci calculation using worker thread
  private fibonacciWorker(n: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(`
        const { parentPort } = require('worker_threads');
        
        function fibonacci(n) {
          if (n <= 1) return n;
          return fibonacci(n - 1) + fibonacci(n - 2);
        }
        
        const result = fibonacci(${n});
        parentPort.postMessage(result);
      `, { eval: true });

      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }

  // Combined benchmark operation with custom limits
  private async combinedOperation(fibonacciLimit: number, primeLimit: number): Promise<{ fibonacci: number; primes: number[] }> {
    // Run Fibonacci in worker thread (non-blocking)
    const fibonacciPromise = this.fibonacciWorker(fibonacciLimit);
    
    // Run primes in main thread
    const primesResult = this.generatePrimes(primeLimit);
    
    // Wait for Fibonacci to complete
    const fibonacciResult = await fibonacciPromise;

    return {
      fibonacci: fibonacciResult,
      primes: primesResult,
    };
  }

  async runBenchmark(fibonacciLimit: number, primeLimit: number): Promise<BenchmarkResult[]> {
    const startTime = Date.now();
    const results: BenchmarkResult[] = [];

    // Run combined operation
    const combinedResult = await this.combinedOperation(fibonacciLimit, primeLimit);
    const endTime = Date.now();

    results.push({
      operation: 'combined_primes_fibonacci',
      result: {
        fibonacci: combinedResult.fibonacci,
        primesCount: combinedResult.primes.length,
        lastPrime: combinedResult.primes[combinedResult.primes.length - 1] || 0,
        primes: combinedResult.primes.slice(0, 10), // First 10 primes for preview
      },
      executionTimeMs: endTime - startTime,
      timestamp: new Date().toISOString(),
    });

    return results;
  }
}
