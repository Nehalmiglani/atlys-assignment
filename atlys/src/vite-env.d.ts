/// <reference types="vite/client" />

// CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
