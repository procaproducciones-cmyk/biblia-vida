# Aviso sobre los textos bíblicos

Biblia Vida v1.2.4 incluye dentro de la APK final estas versiones:

## Reina-Valera 1909

Texto identificado como de dominio público e integrado localmente.

Datos verificados:

- 66 libros.
- 1,189 capítulos.
- 31,102 versículos.

## Biblia del Oso 1569 — Sagradas Escrituras Versión Antigua

Durante la compilación, el flujo automático obtiene el módulo público `sse` de GetBible API v2, lo convierte al formato interno y comprueba que contenga:

- 66 libros;
- 1,189 capítulos;
- más de 30,000 versículos;
- el contenido esperado en Génesis 1:1.

La APK no se publica si el archivo está incompleto. Una vez validado, queda incluido en `assets/public/data/biblia-oso1569.json` y funciona sin conexión.

### Transparencia editorial

La aplicación usa el nombre reconocido **Biblia del Oso 1569** y aclara que es una edición digital de lectura con ortografía actualizada. No se presenta como facsímil ni como transcripción letra por letra de la impresión original de Basilea.

## Código e identidad visual

La interfaz, identidad visual, iconos propios y código específico de Biblia Vida pertenecen al proyecto de Proca Corporación, salvo bibliotecas y recursos de terceros sujetos a sus respectivas licencias.
