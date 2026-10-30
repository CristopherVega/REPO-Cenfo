CREATE DATABASE repositorio_academico;
GO
USE repositorio_academico;
GO

-- 1. Catálogos Base
CREATE TABLE carreras (
    id_carrera INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE tipos_produccion (
    id_tipo_produccion INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(50) NOT NULL UNIQUE,
    descripcion NVARCHAR(MAX) NULL
);

CREATE TABLE categorias (
    id_categoria INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE areas_conocimiento (
    id_area INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE lineas_investigacion (
    id_linea INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE tipos_investigacion (
    id_tipo_investigacion INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE tecnologias (
    id_tecnologia INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(50) NOT NULL UNIQUE
);

-- 2. Tabla Usuarios
CREATE TABLE usuarios (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    id_carrera INT NULL,
    nombre NVARCHAR(100) NOT NULL,
    email NVARCHAR(150) NOT NULL UNIQUE,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('administrador', 'coordinador', 'docente', 'estudiante')),
    estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo')),
    FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera) ON DELETE SET NULL
);

-- 3. Tabla Producción Académica
CREATE TABLE produccion_academica (
    id_produccion INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(255) NOT NULL,
    id_autor INT NOT NULL,
    id_tipo_produccion INT NOT NULL,
    id_carrera INT NOT NULL,
    id_area INT NOT NULL,
    id_linea INT NOT NULL,
    id_tipo_investigacion INT NOT NULL,
    id_categoria INT NOT NULL,
    anio INT NOT NULL,
    resumen NVARCHAR(MAX) NULL,
    contenido NVARCHAR(MAX) NULL,
    estado VARCHAR(20) DEFAULT 'borrador' CHECK (estado IN ('publicado', 'en revisión', 'borrador')),
    FOREIGN KEY (id_autor) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_tipo_produccion) REFERENCES tipos_produccion(id_tipo_produccion),
    FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera),
    FOREIGN KEY (id_area) REFERENCES areas_conocimiento(id_area),
    FOREIGN KEY (id_linea) REFERENCES lineas_investigacion(id_linea),
    FOREIGN KEY (id_tipo_investigacion) REFERENCES tipos_investigacion(id_tipo_investigacion),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- 4. Tabla Intermedia N:M (Producción <-> Tecnología)
CREATE TABLE produccion_tecnologia (
    id_produccion INT NOT NULL,
    id_tecnologia INT NOT NULL,
    PRIMARY KEY (id_produccion, id_tecnologia),
    FOREIGN KEY (id_produccion) REFERENCES produccion_academica(id_produccion) ON DELETE CASCADE,
    FOREIGN KEY (id_tecnologia) REFERENCES tecnologias(id_tecnologia) ON DELETE CASCADE
);
