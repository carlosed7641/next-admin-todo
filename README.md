# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar comando ``` npm install ```
5. Ejecutar comando ``` npm run dev ```
6. Ejecutar estos comandos de prisma: 
```
npx prisma init
npx prisma migrate dev
```
7. Ejecutar el SEED para [crear la base de datos local](localhost:300/api/seed)

# Nota: Usuario por defecto
__usuario__: test1@google.com
__password__: 123456

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```