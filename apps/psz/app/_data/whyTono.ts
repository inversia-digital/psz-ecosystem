/**
 * "Por qué Toño Palacios" — 6 cards reutilizables en home y /broker-hipotecario.
 *
 * Single source of truth. Si cambian las credenciales o el messaging, se cambia aquí
 * y propaga a todas las páginas que lo consumen.
 */

export interface WhyTonoBullet {
  title: string
  body: string
}

export const WHY_TONO_BULLETS: WhyTonoBullet[] = [
  {
    title: 'Registro verificable en Banco de España',
    body: 'Mi número E242 está publicado en la web oficial del Banco de España. Cualquiera puede comprobarlo. No tengo nada que ocultar; al contrario: invito siempre a verificarlo antes de contratar.',
  },
  {
    title: 'Presidente de ANICI',
    body: 'Soy presidente de la Asociación Nacional de Intermediarios en Crédito Inmobiliario y miembro fundador (ANICI-001). No soy un intermediario más: represento institucionalmente al sector.',
  },
  {
    title: 'Servicio en toda España, oficina en Zaragoza',
    body: 'Atiendo clientes en cualquier comunidad autónoma. La gestión es 100% digital salvo la firma en notaría, donde te acompaño físicamente. Mi sede legal está en Cuarte de Huerva (Zaragoza), donde también puedes venir a verme si lo prefieres.',
  },
  {
    title: 'Más de 100 operaciones cerradas en 2025',
    body: 'Casos de todo tipo a nivel nacional: hipotecas para autónomos con ingresos variables, eliminación de avalistas, subrogaciones complejas, financiación para inversores con varias propiedades, reunificación de deudas, no residentes, perfiles rechazados previamente por bancos. Si tu caso no es estándar, mi experiencia tampoco lo es.',
  },
  {
    title: 'Reserva profesional + honorarios a éxito',
    body: 'Una reserva profesional de seiscientos euros al firmar el contrato de intermediación (compromiso real de ambas partes), y el resto de honorarios solo si conseguimos la hipoteca. Cifras fijas, conocidas y firmadas antes de empezar. Ni comisiones ocultas, ni vinculaciones encubiertas, ni productos cruzados.',
  },
  {
    title: 'Fundador del instituto INARPA',
    body: 'Soy fundador de INARPA (Instituto de Arquitectura Patrimonial), donde formaré a otros profesionales en lo que sé hacer. Mi conocimiento es transferible y verificable: si puedo explicarlo, lo entiendo.',
  },
]
