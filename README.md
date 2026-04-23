# Portafolio

[![DeepWiki](https://img.shields.io/badge/DeepWiki-Ver%20documentación-0A66C2?style=flat-square)](https://deepwiki.com/dvchinx/portafolio)

**Ficha del proyecto en DeepWiki**  
Documentacion tecnica y contexto del repositorio:  
https://deepwiki.com/dvchinx/portafolio

## Descripcion
Portafolio personal desarrollado con **React + Vite**, orientado a presentar perfil profesional, habilidades, proyectos y formulario de contacto.

## Stack
- React 19
- Vite 6
- ESLint 9
- Nginx (produccion)
- Docker (build multi-stage)

## Requisitos
- Node.js 20+
- npm 10+

## Ejecutar en local
```bash
npm install
npm run dev
```

Aplicacion disponible en: `http://localhost:3000/portfolio/`

## Scripts
```bash
npm run dev      # entorno de desarrollo
npm run build    # build de produccion
npm run preview  # previsualizar build
npm run lint     # analisis estatico
```

## Docker
```bash
docker build -t portafolio .
docker run -p 8080:80 portafolio
```

- URL: `http://localhost:8080/portfolio/`
- Healthcheck: `http://localhost:8080/health`

## Estructura
```text
src/
  App.jsx
  main.jsx
  components/portfolio/Portfolio/
  assets/
  styles/
```

## Licencia
Uso personal. Todos los derechos reservados.
