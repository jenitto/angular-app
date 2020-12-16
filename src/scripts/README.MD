# Scripts de node

## 1. Traducciones

Todo lo necesario para esta sección se encuentra en: `src/scripts/i18n`.

**Scripts**

Hay dos scripts de node que se encargan de recorrer y modificar los json de traducciones:

- `src/scripts/i18n/diffTranslates.js`: Este script es el encargado de recorrer el json de las cadenas en español y las compara con el json en inglés, generando un nuevo json con las diferencias, que será lo que se enviará a traducir.
	
- `src/scripts/i18n/mergeEn.js`: Este script será el encargado de hacer las inserciones del archivo ya traducido generado en el script anterior, en el json del idioma inglés utilizado por la app.

- *Nota:* En caso de que se empiecen a utilizar más idiomas, la estrategia idónea sería mantener el script que busca las diferencias entre español y cualquier otro idioma (la idea es que los developers sólo añadan cadenas en español) y sólo modificar el script de mergeo, bien haciendo configurable el idioma a generar en cada ejecución (si las traducciones en distintos idiomas llegan por separado), o bien, envolviendo el script en un bucle que se encargue de generar cada idioma.

**Generar archivo para enviar a traducir**

Para generar las cadenas pendientes de traducir hay que lanzar el siguiente comando, y este nos generará en `src/scripts/i18n` el archivo valuesToTranslate.json, que será enviado a traducir.
```bash
npm run i18n-diff
```

**Insertar las cadenas traducidas**

Una vez tengamos el fichero valuesToTranslate.json traducido, lo colocaremos en el mismo sitio de donde se ha generado y utilizaremos el siguiente comando para que automáticamente inserte las cadenas traducidas en el fichero de traducciones.
```bash
npm run i18n-merge
```

Después de este paso es necesario reordenar alfabéticamente el json utilizando la extensión de vscode "Sort JSON objects":
```
Shift+Ctrl+P: Sort JSON
```
