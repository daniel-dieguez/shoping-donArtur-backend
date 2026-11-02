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
## Estructura del proyecto
-- Mas abajo se encontrara una pequeña descripción sobre el funcionamiento y la razon de por que dicha arquitectura.

```
DonArturoBackend/
├─ src/
│  ├─ config/
│  │  └─ db.ts                              # Pool de conexión a SQL Server
│  ├─ responses/
│  │  └─ codes.ts                           # Función responder() y códigos de respuesta
│  ├─ models/
│  │  ├─ ADM/
│  │  │  ├─ METRICAS/
│  │  │  │  └─ metricasModel.ts
│  │  │  ├─ ROLES/
│  │  │  │  └─ rolesModels.ts
│  │  │  ├─ TIPOUSUARIO/
│  │  │  │  └─ tipoUsuarioModel.ts
│  │  │  ├─ UBICACION/
│  │  │  │  └─ ubicacionModel.ts
│  │  │  └─ USUARIO/
│  │  │     └─ ...
│  │  └─ PROD/
│  │     ├─ CARRITO/
│  │     │  └─ carritoModel.ts
│  │     ├─ CARRITODETALLE/
│  │     │  └─ carritoDetalleModel.ts
│  │     ├─ CATALOGOCUPONES/
│  │     │  └─ catalogoCuponesModel.ts
│  │     ├─ CATALOGOPRODUCTOS/
│  │     │  └─ catalogoProductosModel.ts
│  │     ├─ COMPRAS/
│  │     │  └─ comprasModel.ts
│  │     ├─ COMPRASDETALLE/
│  │     │  └─ comprasDetalle.ts
│  │     ├─ CUPONES/
│  │     │  └─ cuponesModel.ts
│  │     ├─ INVENTARIO/
│  │     │  └─ inventarioModel.ts
│  │     ├─ PAGOS/
│  │     │  └─ pagosModel.ts
│  │     ├─ PRODUCTOS/
│  │     │  └─ productosModels.ts
│  │     └─ VARIANTES/
│  │        └─ variantesModels.ts
│  ├─ controllers/
│  │  ├─ loginController.ts                 # Lógica del login
│  │  ├─ ADM/
│  │  │  ├─ ROLES/
│  │  │  │  └─ rolesController.ts
│  │  │  ├─ TIPOUSUARIO/
│  │  │  │  └─ tipoUsuarioController.ts
│  │  │  ├─ UBICACION/
│  │  │  │  └─ ubicacionController.ts
│  │  │  └─ USUARIO/
│  │  │     └─ usuarioController.ts
│  │  └─ PROD/
│  │     ├─ CARRITO/
│  │     │  └─ carritoController.ts
│  │     ├─ CARRITODETALLE/
│  │     │  └─ carritoDetalleController.ts
│  │     ├─ CATALOGOCUPONES/
│  │     │  └─ catalogoCuponesController.ts
│  │     ├─ CATALOGOPRODUCTOS/
│  │     │  └─ catalogoProductosController.ts
│  │     ├─ COMPRAS/
│  │     │  └─ comprasController.ts
│  │     ├─ COMPRASDETALLE/
│  │     │  └─ comprasDetalleController.ts
│  │     ├─ CUPONES/
│  │     │  └─ cuponesController.ts
│  │     ├─ INVENTARIO/
│  │     │  └─ inventarioController.ts
│  │     ├─ PAGOS/
│  │     │  └─ pagosController.ts
│  │     ├─ PRODUCTOS/
│  │     │  └─ productosController.ts
│  │     └─ VARIANTES/
│  │        └─ varianteController.ts
│  ├─ middlewares/
│  │  └─ auth.middleware.ts                 # Validación del token JWT
│  ├─ routes/
│  │  ├─ login.routes.ts                    # POST /api/login
│  │  ├─ perfil.routes.ts                   # GET /api/perfil (ruta protegida de ejemplo)
│  │  ├─ CARRITO/
│  │  │  └─ carrito.routes.ts
│  │  ├─ CARRITODETALLE/
│  │  │  └─ carritoDetalle.routes.ts
│  │  ├─ CATALOGOCUPONES/
│  │  │  └─ catalogoCupones.routes.ts
│  │  ├─ CATALOGOPRODUCTOS/
│  │  │  └─ catalogoProductos.routes.ts
│  │  ├─ COMPRAS/
│  │  │  └─ compras.routes.ts
│  │  ├─ COMPRASDETALLE/
│  │  │  └─ compraDetalle.routes.ts
│  │  ├─ CUPONES/
│  │  │  └─ cupones.routes.ts
│  │  ├─ INVENTARIO/
│  │  │  └─ inventario.routes.ts
│  │  ├─ METRICAS/
│  │  │  └─ metricas.routes.ts
│  │  ├─ PAGOS/
│  │  │  └─ pagos.routes.ts
│  │  ├─ PRODUCTOS/
│  │  │  └─ productos.routes.ts
│  │  ├─ ROLES/
│  │  │  └─ roles.routes.ts
│  │  ├─ TIPOUSUARIO/
│  │  │  └─ tipoUsuario.routes.ts
│  │  ├─ UBICACION/
│  │  │  └─ ubicacion.routes.ts
│  │  ├─ USUARIO/
│  │  │  └─ usuario.routes.ts
│  │  └─ VARIANTES/
│  │     └─ variantes.routes.ts            
│  ├─ app.ts                                
│  └─ server.ts                             # Configuración de Express y rutas
├─ .env                                     # Arranque: conecta a la BD y levanta el servidor --- "NOTA" Se sube .env para la persona que revisara el proycto por lo que si visualiza el .gitIgnore se tiene comentado el .env
├─ .gitignore                                 # Variables de entorno (no se sube a Git)
├─ package.json
└─ tsconfig.json


## Arquitectura del proyecto

El proyecto usa una arquitectura **MC (Model - Controller)**.

### Models
En el model se definen y construyen los parámetros que se envían a la base de datos. Así evito repetir su creación en cada endpoint: se definen una sola vez y se reutilizan en todos los lugares que los necesiten.

### Controllers
Los controllers están diseñados para consumir casi siempre el mismo CRUD - aclarando que hay algunas excepciones en algunos controllers:

| Operación | Descripción |
|-----------|-------------|
| `all`     | Obtiene todos los registros. |
| `create`  | Crea un nuevo registro. |
| `update`  | Actualiza un registro existente. |
| `one`     | Obtiene un registro específico. |
| `estado`  | Cambia el estado de un registro (baja lógica, con valor `0`, u otro estado). |

Gracias a la operación de **estado** no es necesario hacer actualizaciones masivas ni eliminar registros físicamente: el cambio es puntual y mantiene el historial.

### Parámetro `opciones`
Un punto clave del proyecto es el parámetro **`opciones`**, que se puede ver directamente en la base de datos. Como buena práctica, este parámetro indica qué consulta (query) debe ejecutarse para cada acción, de modo que un mismo punto de entrada puede resolver distintas operaciones.

### Nomenclatura de rutas
Las rutas se nombran según el módulo al que pertenecen:

- Módulo **cupones** → ruta `/cupones`
- Módulo **usuario** → ruta `/usuario`

**Ventajas:**
- **Mantenimiento más sencillo:** es fácil ubicar dónde está cada funcionalidad.
- **Consumo desde el front:** basta recordar que la ruta principal coincide con el nombre del módulo, sin llamar a muchas rutas distintas.
```


- Las contraseñas se guardan con hash bcrypt, nunca en texto plano.
- El hash nunca se devuelve al cliente.
- Los parámetros del SP van tipados (`.input()`), lo que previene inyección SQL.
- El `.env` está en `.gitignore`; no se sube al repositorio.
- Se recomienda usar un usuario de BD propio para la app (no `sa`) con permisos limitados.

## Apoyo

### Librerías utilizadas

- **Zod:** la utilicé para validar y simplificar los datos antes de enviarlos al controller, lo que reduce código repetido y evita errores por datos mal formados.
- **bcrypt:** la utilicé para encriptar (hashear) las contraseñas de los usuarios y para compararlas al momento del login, de modo que nunca se guardan en texto plano.

### Instalación

```bash
# Dependencia principal
npm i bcrypt


