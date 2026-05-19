import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for development
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Global prefix for API
  app.setGlobalPrefix('api');
  
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Backend Piloto API')
    .setDescription(`
    ## Backend NestJS con datos mock para pruebas de concepto
    
    ### Características:
    - **Worker threads**: Fibonacci calculado en hilos separados para no bloquear
    - **Datos mock**: Usuarios y operaciones en memoria (sin persistencia)
    - **Benchmark**: Endpoint parametrizable para pruebas de carga
    
    ### Endpoints disponibles:
    
    **Users** (Datos mock en memoria):
    - \`GET /api/users\` - Listar todos los usuarios
    - \`GET /api/users/:id\` - Obtener usuario por ID
    - \`GET /api/users/email/:email\` - Buscar usuario por email
    - \`POST /api/users\` - Crear nuevo usuario
    - \`PUT /api/users/:id\` - Actualizar usuario existente
    - \`DELETE /api/users/:id\` - Eliminar usuario
    
    **Benchmark** (Pruebas de carga CPU):
    - \`GET /api/benchmark?fibonacciLimit=X&primeLimit=Y\` - Calcular Fibonacci + primos
    
    ### Parámetros Benchmark:
    - **fibonacciLimit**: Posición en secuencia Fibonacci (1-1000)
    - **primeLimit**: Máximo para generar números primos (2-10000)
    
    ### Ejemplos de uso:
    - Ligero: \`?fibonacciLimit=50&primeLimit=100\`
    - Medio: \`?fibonacciLimit=200&primeLimit=500\`
    - Intenso: \`?fibonacciLimit=500&primeLimit=5000\`
    - Extremo: \`?fibonacciLimit=800&primeLimit=8000\`
    `)
    .setVersion('1.0')
    .setContact('Cristobal Tudela', '', 'cristobal.tudela@example.com')
    .setLicense('UNLICENSED', '')
    .addTag('users', 'Gestión de usuarios con datos mock')
    .addTag('benchmark', 'Pruebas de rendimiento CPU con Fibonacci y primos')
    .addServer('http://localhost:3000', 'Development server')
    .addServer('https://api.piloto.example.com', 'Production server')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api`);
  console.log(`Swagger documentation available at: http://localhost:${port}/api/docs`);
  console.log(`Process ${process.pid} started`);
}

bootstrap();
