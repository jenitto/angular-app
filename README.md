# AngularMyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Traducciones

**Generar archivo para enviar a traducir**

Para generar las cadenas pendientes de traducir hay que lanzar el siguiente comando, y este nos generará en src/scripts/i18n el archivo valuesToTranslate.json, que será enviado a traducir.
```
npm run i18n-diff
```

**Insertar las cadenas traducidas**

Una vez tengamos el fichero valuesToTranslate.json traducido al inglés, lo colocaremos en el mismo sitio de donde se ha generado y utilizaremos el siguiente comando para que automáticamente inserte las cadenas traducidas en el fichero de traducciones.
```
npm run i18n-merge
```

Después de este paso es necesario reordenar alfabéticamente utilizando la extensión de vscode "Sort JSON objects":
```
Shift+Ctrl+P: Sort JSON
```