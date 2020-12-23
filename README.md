# AngularMyApp

Este es un proyecto de ejemplo, no tiene el objetivo de ser una app real.

La pretensión de este proyecto es conectarse a una API externa de videojuegos ([RAWG API](https://rawg.io/apidocs)) y hacer peticiones para conseguir la información de la base de datos y pintarla en pantalla, filtrarla, ordenarla, etc... Al no soportar la API interacciones POST, DELETE o PATCH, se emulan en el frontal pudiendo eliminar, editar y crear items sólo con los datos en caché.

El proyecto está montado con:
- [Angular 11](https://angular.io/)
- [Angular Material 11](https://material.angular.io/)
- [RxJS](https://rxjs.dev/guide/overview)
- [ngx-translate](https://github.com/ngx-translate/core)
- [ngx-infinite-scroll](https://github.com/orizens/ngx-infinite-scroll)

Es un proyecto sin terminar, seguirá recibiendo features poco a poco... ;)

## Live app

[Live app](https://sergio-angular-app.netlify.app/)

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## i18n - Internacionalización

**Generar archivo de diferencias entre español e inglés para traducir**

Para generar las cadenas pendientes de traducir hay que lanzar el siguiente comando, y este nos generará en src/scripts/i18n el archivo valuesToTranslate.json, que será enviado a traducir.
```
npm run i18n-diff
```

**Insertar las cadenas traducidas**

Una vez tengamos el fichero valuesToTranslate.json traducido, lo colocaremos en el mismo sitio donde se ha generado y utilizaremos el siguiente comando para que automáticamente inserte las cadenas traducidas en el fichero de traducciones.
```
npm run i18n-merge
```

Después de este paso es necesario reordenar alfabéticamente utilizando la extensión de vscode "Sort JSON objects":
```
Shift+Ctrl+P: Sort JSON
```