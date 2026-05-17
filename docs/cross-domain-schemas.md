# Schemas JSON-LD cross-domain del ecosistema

Documento de referencia para inyectar **Schema.org JSON-LD** en los dominios
satélite del ecosistema (anici.es, hipobrokers.com) de forma que apunten al
mismo **Person entity** que se publica en `psz.es/sobre-mi#person`.

El objetivo es consolidar a **Toño Palacios** como una sola entidad reconocida
por Google Knowledge Graph, ChatGPT search, Perplexity, Claude y Gemini.
Cuando varias webs verificables citan al mismo entity con los mismos
identificadores, los motores IA refuerzan la confianza en la información y
aumentan la probabilidad de citarla.

---

## Estado actual

| Dominio | Schemas | Estado |
|---|---|---|
| `psz.es` | Person (@id estable) + Organization + ProfessionalService + FAQPage + HowTo + Speakable | ✅ Implementado |
| `inarpa.es` | EducationalOrganization (founder → psz.es#person) + Person (sameAs → psz.es) | ✅ Implementado |
| `anici.es` | Organization (president → psz.es#person) | ❌ Pendiente |
| `hipobrokers.com` | Organization (director → psz.es#person) | ❌ Pendiente |
| `bio.psz.es` | ProfilePage + Person (sameAs → psz.es) | ❌ Pendiente |

---

## 1. anici.es — Schema Organization

Inyectar en el `<head>` de **todas las páginas** de anici.es, idealmente desde
el layout principal del sitio.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://anici.es#org",
  "name": "Asociación Nacional de Intermediarios en Crédito Inmobiliario",
  "alternateName": "ANICI",
  "url": "https://anici.es",
  "identifier": "G21975008",
  "logo": "https://anici.es/logo.png",
  "description": "Asociación profesional española de intermediarios de crédito inmobiliario regulados por la Ley 5/2019. Código deontológico interno, representación ante el Banco de España y profesionalización del sector.",
  "sameAs": [
    "https://psz.es",
    "https://inarpa.es"
  ],
  "founder": {
    "@type": "Person",
    "@id": "https://psz.es/sobre-mi#person",
    "name": "Antonio Palacios Cambero",
    "alternateName": "Toño Palacios",
    "url": "https://psz.es/sobre-mi"
  },
  "employee": [
    {
      "@type": "Person",
      "@id": "https://psz.es/sobre-mi#person",
      "name": "Antonio Palacios Cambero",
      "jobTitle": "Presidente",
      "url": "https://psz.es/sobre-mi"
    }
  ],
  "memberOf": {
    "@type": "Organization",
    "name": "Banco de España",
    "url": "https://www.bde.es/"
  },
  "areaServed": {
    "@type": "Country",
    "name": "España"
  }
}
</script>
```

### Cómo verificarlo

1. Inyectado el snippet, abrir [Google Rich Results Test](https://search.google.com/test/rich-results) → introducir `https://anici.es`
2. Debe aparecer "Organization" como tipo detectado
3. El campo `founder.@id` debe apuntar a `https://psz.es/sobre-mi#person`
4. Sin errores ni warnings críticos

---

## 2. hipobrokers.com — Schema Organization

Inyectar en el `<head>` del layout principal de hipobrokers.com.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://hipobrokers.com#org",
  "name": "Hipobrokers",
  "legalName": "HIPOBROKERS, SL",
  "url": "https://hipobrokers.com",
  "identifier": "B22976294",
  "logo": "https://hipobrokers.com/logo.png",
  "description": "Plataforma B2B de brokers hipotecarios colaboradores. Productores y conductores del podcast Hipobrokers, espacio profesional del sector intermediación de crédito inmobiliario en España.",
  "sameAs": [
    "https://psz.es",
    "https://anici.es",
    "https://www.youtube.com/@hipobrokers"
  ],
  "founder": {
    "@type": "Person",
    "@id": "https://psz.es/sobre-mi#person",
    "name": "Antonio Palacios Cambero",
    "alternateName": "Toño Palacios",
    "url": "https://psz.es/sobre-mi"
  },
  "areaServed": {
    "@type": "Country",
    "name": "España"
  },
  "knowsAbout": [
    "Intermediación de crédito inmobiliario",
    "Hipotecas para inversores",
    "Negociación bancaria",
    "Brokerage hipotecario B2B"
  ]
}
</script>
```

---

## 3. bio.psz.es — Schema ProfilePage

bio.psz.es es el link-in-bio personal. El tipo correcto es `ProfilePage` (no
WebPage genérico), porque señala a Google que la página entera es el perfil
de una persona.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://bio.psz.es#profilepage",
  "url": "https://bio.psz.es",
  "name": "Toño Palacios — link in bio",
  "dateCreated": "2025-01-15",
  "mainEntity": {
    "@type": "Person",
    "@id": "https://psz.es/sobre-mi#person",
    "name": "Antonio Palacios Cambero",
    "alternateName": "Toño Palacios",
    "url": "https://psz.es/sobre-mi",
    "image": "https://psz.es/images/tono-redes.png",
    "jobTitle": "Broker hipotecario y Presidente de ANICI",
    "sameAs": [
      "https://psz.es/sobre-mi",
      "https://anici.es",
      "https://inarpa.es",
      "https://hipobrokers.com",
      "https://www.linkedin.com/in/tonopalacios",
      "https://www.instagram.com/palacios.psz",
      "https://www.tiktok.com/@palacios.psz",
      "https://www.youtube.com/@hipobrokers"
    ]
  }
}
</script>
```

---

## Anatomía de la consolidación de entity

Lo que estos schemas establecen para los motores IA:

1. **Toño Palacios = una sola Person** identificada por `@id = https://psz.es/sobre-mi#person`.
2. **psz.es** es la URL canónica del entity (donde está la biografía completa, credenciales y FAQ).
3. **ANICI** es la Organization de la que es **founder** y **president** (cargo).
4. **INARPA** es la EducationalOrganization de la que es **founder**.
5. **Hipobrokers** es la Organization de la que es **founder** (y productor del podcast).
6. **bio.psz.es** es el `ProfilePage` agregador.

Cuando ChatGPT, Perplexity, Claude o Gemini hacen retrieval para preguntas
tipo "quién es Toño Palacios" o "quién es el presidente de ANICI", la red
cruzada de `@id` consolidados les da una visión coherente y citable.

---

## Mantenimiento

- Si alguna vez se actualiza el `@id` de Toño Palacios en psz.es, hay que
  actualizar **todas** las referencias `@id` en los snippets de arriba.
- El número BdE E242 y el ANICI-001 se citan solo en `psz.es` (no hace falta
  duplicar). El cross-domain solo necesita el `@id` para enlazar entities.
- Cuando se construyan nuevas webs del grupo (estructuras-internacionales,
  un eventual `palantio.es`, etc.), aplicar el mismo patrón.

---

## Mensaje para el dev de ANICI

Si vas a mandar este snippet al dev externo que lleva anici.es, este texto
puede ir como brief:

```
Hola [nombre],

Necesito que añadas un fragmento JSON-LD en el <head> del layout principal
de anici.es. Es invisible para los usuarios, lo leen únicamente Google
Knowledge Graph, ChatGPT, Perplexity, Gemini y Claude. Sirve para que esos
motores reconozcan a Toño Palacios como el mismo entity en anici.es y en
psz.es.

El snippet exacto está documentado en:
  https://github.com/inversia-digital/psz-ecosystem/blob/main/docs/cross-domain-schemas.md

Bloque a copiar: "anici.es — Schema Organization".

Cuando esté inyectado, verifica con
https://search.google.com/test/rich-results introduciendo https://anici.es.
Debe aparecer "Organization" como tipo detectado y founder.@id apuntando a
https://psz.es/sobre-mi#person sin warnings.

Avísame cuando esté hecho.

Toño
```

Lo mismo para el dev de hipobrokers.com con el bloque correspondiente.
