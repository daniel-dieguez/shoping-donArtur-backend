# Don Arturo Backend

API REST para el proyecto Don Arturo, construida con Node.js 24 LTS, TypeScript y Express, conectada a SQL Server.

## Tecnologías

- Node.js 24 LTS
- TypeScript (ejecutado en desarrollo con `tsx`)
- Express 5
- SQL Server (paquete `mssql`)
- bcrypt (hash de contraseñas)
- jsonwebtoken (tokens JWT)
- helmet, cors, dotenv

## Estructura del proyecto

```
DonArturoBackend/
├─ src/
│  ├─ config/
│  │  └─ db.ts                  # Pool de conexión a SQL Server
│  ├─ controllers/
│  │  └─ login.controller.ts    # Lógica del login
│  ├─ middlewares/
│  │  └─ auth.middleware.ts     # Validación del token JWT
│  ├─ routes/
│  │  ├─ login.routes.ts        # POST /api/login
│  │  └─ perfil.routes.ts       # GET /api/perfil (ruta protegida de ejemplo)
│  ├─ app.ts                    # Configuración de Express y rutas
│  └─ server.ts                 # Arranque: conecta a la BD y levanta el servidor
├─ .env                         # Variables de entorno (no se sube a Git)
├─ .gitignore
├─ package.json
└─ tsconfig.json

esto es hasta el momento, hare crecer mas los componentes, agregar carpeta de Models y algun otro
```




- Las contraseñas se guardan con hash bcrypt, nunca en texto plano.
- El hash nunca se devuelve al cliente.
- Los parámetros del SP van tipados (`.input()`), lo que previene inyección SQL.
- El `.env` está en `.gitignore`; no se sube al repositorio.
- Se recomienda usar un usuario de BD propio para la app (no `sa`) con permisos limitados.

## Próximos pasos

- Control de acceso por roles.
- Primeras APIs de negocio protegidas con `verificarToken`.
- Usuario de BD dedicado con permisos mínimos.
