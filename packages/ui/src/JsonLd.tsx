interface JsonLdProps {
  data: unknown
}

/**
 * Inyecta un bloque schema.org JSON-LD en el documento.
 * Para usar en Server Components o app/layout / app/page.
 * Pasar el resultado de un helper de @psz/seo (personSchema(), etc.).
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: necesario para schema.org
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
