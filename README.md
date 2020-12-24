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

## References
Para desarrollar este proyecto me he basado en estos artículos para seguir una guía de estilo, mejorar la legibilidad del código y hacerla más optimizada.

- [Angular OnPush Change Detection and Component Design - Avoid Common Pitfalls](https://blog.angular-university.io/onpush-change-detection-how-it-works/): Para mejorar el rendimiento de la aplicación y reducir el número de renderizados, es buena práctica cambiar el ChangeDetectionStrategy a OnPush para que sólo se rerenderice el componente al cambiar uno de sus @Input. Esto es útil combinado con el uso del pipe async (observable$ | async).
- [Best practices for a clean and performant Angular application](https://medium.com/free-code-camp/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f): He intentado seguir estos patrones básicos para mejorar la legibilidad del código y el rendimiento. Me han parecido especialmente útiles la cancelación de las peticiones con takeUntil, los pipe operators, el trackByFn y el lazy load de los módulos.
- [Best practices: Building Angular Services using Facade design pattern for complex systems](https://medium.com/@balramchavan/best-practices-building-angular-services-using-facade-design-pattern-for-complex-systems-d8c516cb95eb): He aplicado esta arquitectura para cada módulo de la aplicación, en el que un container (o smart component) está suscrito a los datos de una facade, que está conectada a X servicios, y lo único que hace es lanzarle peticiones, de forma que el código del container queda muy legible y permite la reutilización de container y facade. Esto combinado con ChangeDetectionStrategy a OnPush y los pipe async es una buena forma de conseguir una app centralizada con buen rendimiento.
- [How to define a highly scalable folder structure for your Angular project](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7): Para mantener una estructura de carpetas ordenada y escalable.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## i18n - Internacionalización

Más info -> [Scripts i18n](https://github.com/jenitto/angular-app/tree/main/src/scripts)

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
