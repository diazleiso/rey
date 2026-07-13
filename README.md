<div align="center">

![REYBANPAC](../documentacion/imagenes/logo-reybanpac.png)

# Anexo F — Aplicativo Piloto (Backend NestJS)

**Proyecto:** Implementación de Infraestructura de Contenedores — REYBANPAC

</div>

---

| | |
|---|---|
| **Documento** | Aplicativo Piloto — Backend NestJS |
| **Versión** | 1.0 |
| **Fecha** | Enero 2026 |
| **Elaborado por** | SOAINT |
| **Clasificación** | Confidencial |
| **Documento principal** | [README.md — Diseño de Solución](../README.md) |
| **Índice de anexos** | [Anexos.md](../Anexos.md) |

---

Backend NestJS con datos mock para pruebas de concepto y benchmarking de rendimiento.

## Características

- **Worker Threads**: Cálculo de Fibonacci en hilos separados para no bloquear el event loop
- **Datos Mock**: Usuarios y operaciones en memoria (sin persistencia)
- **Benchmark**: Endpoint parametrizable para pruebas de carga CPU
- **Swagger UI**: Documentación interactiva de la API
- **CORS**: Configurado para desarrollo

## Estructura del Proyecto

```
backend-piloto/
├── src/
│   ├── app.module.ts                  # Módulo principal
│   ├── main.ts                        # Punto de entrada y configuración Swagger
│   ├── users/                         # Módulo de usuarios (CRUD mock)
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── dto/
│   │   └── users.module.ts
│   └── benchmark/                     # Módulo de benchmark
│       ├── benchmark.controller.ts
│       ├── benchmark.service.ts
│       ├── dto/
│       └── benchmark.module.ts
├── Dockerfile                         # Configuración Docker
├── package.json                       # Dependencias y scripts
└── docker-compose.yml                 # Orquestación local
```

## Instalación y Ejecución

### Docker

```bash
# Construir y ejecutar con docker-compose
docker-compose up --build --no-cache

# Ejecutar en segundo plano
docker-compose up -d
```

## Documentación API

### Swagger UI

La documentación interactiva está disponible en:

**http://localhost:3000/api/docs**

### Endpoints Disponibles

#### Users (Datos mock en memoria)

- `GET /api/users` - Listar todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `GET /api/users/email/:email` - Buscar usuario por email
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario existente
- `DELETE /api/users/:id` - Eliminar usuario

#### Benchmark (Pruebas de carga CPU)

- `GET /api/benchmark?fibonacciLimit=X&primeLimit=Y` - Calcular Fibonacci + primos

### Parámetros Benchmark

- **fibonacciLimit**: Posición en secuencia Fibonacci (1-1000)
- **primeLimit**: Máximo para generar números primos (2-10000)

## Ejemplos de Uso

### Benchmark - Diferentes Intensidades

```bash
# Ligero - respuesta rápida
curl "http://localhost:3000/api/benchmark?fibonacciLimit=30&primeLimit=50"

# Medio - carga moderada
curl "http://localhost:3000/api/benchmark?fibonacciLimit=50&primeLimit=100"

# Intenso - carga alta
curl "http://localhost:3000/api/benchmark?fibonacciLimit=100&primeLimit=200"

# Extremo - máxima carga (cuidado: puede tomar varios minutos)
curl "http://localhost:3000/api/benchmark?fibonacciLimit=500&primeLimit=1000"
```

### Ejemplo de Respuesta Benchmark

```json
[
  {
    "operation": "combined_primes_fibonacci",
    "result": {
      "fibonacci": 12586269025,
      "primesCount": 25,
      "lastPrime": 97,
      "primes": [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    },
    "executionTimeMs": 1247,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
]
```

## Arquitectura y Performance

### Multi-threading

El servicio de benchmark utiliza Worker Threads de Node.js para:

- **Fibonacci**: Calculado en worker thread (no bloqueante)
- **Primos**: Calculado en main thread (paralelo)
- **Resultado**: Combinación de ambas operaciones

### Optimizaciones

- Algoritmo optimizado para detección de primos (O(√n))
- Worker threads para operaciones CPU-intensivas
- Respuesta streaming para grandes conjuntos de datos

## Consideraciones

- **Sin persistencia**: Todos los datos están en memoria
- **Datos mock**: Los usuarios se reinician con el servidor
- **Resource intensive**: Los benchmarks con límites altos pueden consumir muchos recursos
- **Development only**: Configurado para desarrollo, no para producción sin ajustes

---

*Anexo F — Aplicativo Piloto (Backend NestJS)*
*Documento generado para el proyecto ECU-2026-0000001 — REYBANPAC*
*SOAINT © 2026 — Confidencial*
# piloto
