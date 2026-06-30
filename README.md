# Portfolio

[![Documentación](https://deepwiki.com/badge.svg)](https://deepwiki.com/dvchinx/portafolio)

Portafolio personal de Jesús Flórez, construido como una single-page app en React (Vite) y desplegado en `jesusflorez.cloud/portfolio` como parte de [Personal Suite](https://github.com/dvchinx).

## Stack

- React + Vite
- React Compiler (`babel-plugin-react-compiler`)
- CSS puro (sin frameworks de estilos)

## Comandos

```bash
npm run dev        # servidor de desarrollo en el puerto 3000
npm run build       # build de producción (salida en dist/)
npm run preview     # previsualizar el build de producción
npm run lint         # revisión con ESLint
```

## Arquitectura

Aplicación de una sola página sin enrutamiento, organizada en un único componente principal:

```
src/main.jsx → src/App.jsx → src/components/portfolio/Portfolio/Portfolio.jsx
```

Todo el contenido (dominios de habilidades, certificaciones, historias de proyectos) está definido como arrays de datos directamente en `Portfolio.jsx`. No hay API, CMS ni librería de manejo de estado.

## Despliegue

El build se sirve bajo la ruta base `/portfolio/` dentro de Personal Suite, enrutado por Nginx hacia este contenedor.
