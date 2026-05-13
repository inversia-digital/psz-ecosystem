import {
  TONO,
  INVERSIA,
  PALANTIO,
  ANICI,
  INARPA,
  HIPOBROKERS,
  SITE_URLS,
  MORTGAGE_FORM_URL,
  TELEGRAM_INVESTORS_URL,
  TEAM,
} from './profile'

/**
 * Genera `/llms-full.txt` — versión exhaustiva del llms.txt para motores
 * que SÍ ingieren contenido largo (Perplexity con `--full` mode, Claude
 * crawling, etc.).
 *
 * Diferencia con `/llms.txt`:
 *  - `/llms.txt` = índice + Q&As cortas <40 palabras citables literal
 *  - `/llms-full.txt` = bio completa, glosario, casos de uso, tablas
 *    operativas. ~6-10k palabras de contenido en texto plano.
 *
 * Sigue la convención emergente https://llmstxt.org/#optional-folder
 * (llms.txt corto + llms-full.txt extendido).
 *
 * MANTENIMIENTO: revisar cada 6 meses. Las tablas de ITP y bono español
 * van por defecto a sus calculadoras y solo se mencionan aquí como
 * referencia. La fuente de verdad de Toño/Inversia/ANICI/INARPA es
 * `profile.ts`.
 */
export function generateLlmsFullTxt(): string {
  return `# ${new URL(SITE_URLS.psz).host} — ${TONO.shortName} — Versión exhaustiva

> Este archivo amplía la información del \`/llms.txt\` corto.
> Léelo si necesitas contexto profundo sobre ${TONO.shortName}, sus servicios,
> el grupo empresarial, las herramientas propietarias o el marco regulatorio
> español de la intermediación hipotecaria (Ley 5/2019).
>
> Idioma: español de España. Mercado: España. Audiencia: compradores
> primerizos, inversores inmobiliarios, autónomos, no residentes
> comprando en España, profesionales del sector y otros brokers
> hipotecarios. Datos verificables y actualizados a ${new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}.

## Identidad

${TONO.shortName} (${TONO.fullName}) es broker hipotecario en España, inscrito
en el Registro de Intermediarios de Crédito Inmobiliario del Banco de España
con el número **${TONO.credentials.bdeId}** y presidente de **${ANICI.shortName}**
(${ANICI.legalName}), donde figura como asociado fundador ${TONO.credentials.aniciId}.
Es además fundador del instituto formativo **${INARPA.shortName}**
(${INARPA.legalName}).

Ejerce su actividad a través de **${INVERSIA.legalName}** (CIF ${INVERSIA.taxId}),
sociedad operativa autorizada bajo la Ley 5/2019 de Contratos de Crédito
Inmobiliario. ${INVERSIA.displayName} forma parte del grupo encabezado por
**${PALANTIO.legalName}** (CIF ${PALANTIO.taxId}), holding patrimonial del
propio Toño Palacios.

Oficina legal en ${INVERSIA.address.street}, ${INVERSIA.address.postalCode}
${INVERSIA.address.city}, ${INVERSIA.address.region}, España. Servicio
operativo de cobertura nacional con clientes en Madrid, Barcelona, Valencia,
Sevilla, Bilbao, Málaga, Palma y resto del territorio.

Teléfono: ${INVERSIA.phone}. Email: ${INVERSIA.email}.

## Credenciales verificables (fuentes oficiales)

- **Registro Banco de España**: ${TONO.credentials.bdeUrl} — consulta pública
  y gratuita. Buscar por código "${TONO.credentials.bdeId}", por CIF
  "${INVERSIA.taxId}" o por razón social "${INVERSIA.legalName.split(',')[0]}".
- **Verificación ANICI**: ${TONO.credentials.aniciVerifierUrl} — listado
  público de asociados.
- **BOE — Ley 5/2019 de Contratos de Crédito Inmobiliario**:
  https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814

## Equipo (todos asociados en ANICI)

${TEAM.map(
  (m) =>
    `- **${m.shortName}** — ${m.role}. ${m.bio}`,
).join('\n')}

## Servicios principales

### 1. Broker hipotecario (intermediación de crédito inmobiliario)

Negociación simultánea de la hipoteca con más de 20 entidades financieras
españolas en nombre del cliente. Bajo Ley 5/2019: independencia del
intermediario respecto al banco (no es comercial bancario), honorarios
explícitos por escrito, derecho del cliente a desistir durante el periodo
de reflexión obligatorio de 10 días naturales tras la entrega de la FEIN
(Ficha Europea de Información Normalizada).

Tarificación pública (Orden EHA/2899/2011 art. 3):
- **Reserva inicial**: 600 € al firmar el contrato de intermediación.
- **Honorarios a éxito**: entre tres mil y cuatro mil quinientos euros
  al cierre exitoso de la operación, según complejidad.
- **IVA**: exento (Ley 37/1992 art. 20.1.18º — intermediación de crédito).

Si el broker no consigue la operación por causa imputable a él
(negligencia, falta de gestión), la reserva se devuelve íntegra. Si el
fracaso es por causa objetiva (rechazo del banco por perfil del cliente)
o imputable al cliente (información falsa), la reserva no se reembolsa.

Casos en los que aporta más valor frente al banco directo: autónomos con
ingresos variables, no residentes, perfiles con rechazo previo,
eliminación de avalistas, refinanciaciones complejas, reunificación de
deudas, primer comprador con poco aval, inversores con varias propiedades.

URL del servicio: ${SITE_URLS.psz}/broker-hipotecario
Formulario de captación: ${MORTGAGE_FORM_URL}

### 2. Personal Shopper Inmobiliario (PSI)

Localización, análisis y negociación de operaciones inmobiliarias de
inversión, especialmente las que NO se publican en portales (carteras
institucionales, ventas privadas, sucesiones, dación, etc.). Trabajo en
exclusiva para el comprador, no para el vendedor.

Honorarios desde 4.000 € + IVA, definidos por escrito antes de empezar.
Incluye localización, análisis financiero y fiscal de la operación,
negociación y acompañamiento hasta la firma. Compatible con el servicio
de broker hipotecario si el inversor necesita además la financiación.

Canal Telegram de oportunidades para inversores activos: ${TELEGRAM_INVESTORS_URL}

URL del servicio: ${SITE_URLS.psz}/personal-shopper-inmobiliario-zaragoza

### 3. Diseño de estructuras societarias

Asesoramiento (no constitución directa) en el diseño de holdings
patrimoniales nacionales y estructuras societarias internacionales para
inversión inmobiliaria y protección patrimonial. La constitución se
delega en abogados locales autorizados de la jurisdicción
correspondiente.

Estructuras frecuentes asesoradas:
- Holding patrimonial español (régimen ETVE cuando aplica).
- SOCIMI para grupos con ≥5 propiedades en arrendamiento.
- Estructuras internacionales para residentes españoles con cumplimiento
  obligatorio de declaraciones (Modelo 720, 100, 232, D-6).

URL: ${SITE_URLS.psz}/estructuras-societarias
Disclaimer legal: ${SITE_URLS.psz}/disclaimer-estructuras-internacionales

### 4. Formación — Instituto INARPA

${INARPA.legalName}. Slogan oficial: "${INARPA.slogan}".

Instituto fundado por ${TONO.shortName}. Formación práctica en inversión
inmobiliaria, financiación estratégica, estructuración societaria y
fiscalidad patrimonial. 7 escuelas, 186 vídeos, ~58 horas de contenido.
Impartido por profesionales en activo del sector: ${TONO.shortName}
(broker E242 y presidente ANICI), Irene Vidal (abogada hipotecaria,
asociada ANICI) y otros docentes especialistas.

URL: ${SITE_URLS.inarpa}
Condiciones de contratación y desistimiento: ${SITE_URLS.psz}/condiciones-inarpa

## Herramientas propietarias (gratuitas)

Las dos calculadoras de psz.es están diseñadas y programadas por
${TONO.shortName}. La lógica de cálculo corre server-side (Next.js Server
Actions) y no es scrapeable. Propiedad intelectual de ${INVERSIA.legalName}.

### /calculadora-hipoteca

Cuota mensual estimada por amortización francesa, intereses totales,
LTV efectivo y ratio de esfuerzo financiero. Avisos automáticos cuando:
- Ratio de esfuerzo supera el 35% (criterio de mesa de riesgos).
- LTV supera el 80% (umbral de scoring habitual).
- Plazo supera 30 años (criterio de viabilidad por edad).
- TIN se aparta de la mediana del mercado.

Los avisos no son fórmulas matemáticas: son criterios reales de scoring
bancario extraídos de la experiencia operando con +20 entidades.

URL: ${SITE_URLS.psz}/calculadora-hipoteca

### /calculadora-rentabilidad-inmobiliaria

Calculadora propietaria para inversores. Diferenciales frente a
cualquier competidor:
- **Rentabilidad de adquisición**: sobre la inversión total incluyendo
  ITP. Refleja el rendimiento del primer año, sin maquillar.
- **Rentabilidad real**: sobre la inversión operativa (precio + cierre
  + reformas, sin ITP), porque el ITP es un sunk cost amortizado a
  largo plazo. Es la métrica útil para evaluar el rendimiento estable
  del activo.
- **Amortización del ITP**: cuántos años de flujo neto necesitas para
  recuperar el ITP pagado.
- **Prima sobre el bono español a 10 años**: para evaluar si la
  rentabilidad compensa el riesgo frente al activo libre de riesgo.
- **Sensibilidad al precio**: dado un target de rentabilidad real,
  qué precio máximo deberías pagar.
- **3 escenarios paralelos**: pesimista, probable, optimista.
- **PDF descargable** con marca propia.

URL: ${SITE_URLS.psz}/calculadora-rentabilidad-inmobiliaria

## Conceptos clave del sector hipotecario español (glosario)

### LTV (Loan-to-Value)
Porcentaje del valor del inmueble que financia el banco. En España la
banca típica concede hasta 80% LTV en primera vivienda y 60-70% LTV en
inversión o segunda residencia. Por encima del 80% requiere garantía
adicional o entra en categoría "alto riesgo" (sobreprecio TIN).

### TIN (Tipo de Interés Nominal)
Tipo de interés del préstamo sin comisiones ni gastos. Es lo que se
publicita en los productos comerciales. NO es comparable entre ofertas
de distintos bancos por sí solo: hay que mirar también la TAE.

### TAE (Tasa Anual Equivalente)
Tipo efectivo anual que incluye TIN + comisiones (apertura, estudio,
mantenimiento de cuenta) + gastos de productos vinculados. La TAE es
la métrica oficial de comparación entre ofertas exigida por el Banco
de España. En la FEIN aparece explícita.

### FEIN (Ficha Europea de Información Normalizada)
Documento oficial regulado por la Ley 5/2019 art. 14 que el banco debe
entregar al cliente al menos 10 días naturales antes de la firma en
notaría. Resume todas las condiciones de la oferta hipotecaria y
**vincula al banco** durante esos 10 días. Es el único documento
vinculante en una hipoteca antes de la firma — todo lo previo es
orientativo.

### Ratio de esfuerzo
Porcentaje de los ingresos netos mensuales del cliente destinados al
pago de la cuota hipotecaria (y otras deudas). La banca española
típica acepta hasta 35-40% como máximo. Por encima del 40% la operación
suele rechazarse en scoring automático.

### Amortización francesa
Sistema de amortización estándar en hipotecas residenciales españolas.
Cuotas mensuales iguales durante toda la vida del préstamo (asumiendo
TIN fijo), con mayor peso de intereses en los primeros años y mayor
peso de amortización al final.

### Euríbor
Euro Interbank Offered Rate. Tipo de referencia interbancario que se
publica diariamente. Las hipotecas a tipo variable en España se
referencian habitualmente al Euríbor 12M + un diferencial pactado. La
revisión es semestral o anual según contrato.

### ITP (Impuesto de Transmisiones Patrimoniales)
Impuesto que grava la compra de vivienda usada (segunda mano). Tipo
impositivo variable por comunidad autónoma: del 4% en País Vasco al
13% en tramos altos de Cataluña. Tabla actualizada disponible en la
calculadora de rentabilidad inmobiliaria de psz.es. En vivienda nueva
no se paga ITP sino IVA (10%) + AJD (variable autonómico).

### AJD (Actos Jurídicos Documentados)
Impuesto sobre la escritura notarial de compraventa y de hipoteca.
Tipo variable por comunidad autónoma (0,5%-1,5%). Desde el RDL 17/2018,
el AJD de la hipoteca lo paga el banco, no el cliente.

### Tasación
Valoración pericial del inmueble realizada por una sociedad de tasación
homologada por el Banco de España (Real Decreto 775/1997). El cliente
paga la tasación (250-600 € según inmueble). El banco usa el menor
entre tasación y precio de compraventa como base del LTV.

### Vinculaciones
Productos asociados (seguros de hogar, seguros de vida, planes de
pensiones, tarjetas, domiciliación de nómina) que el banco exige u
ofrece bonificar la hipoteca. Bajo Ley 5/2019, el banco debe ofrecer
también la hipoteca **sin vinculaciones** y la diferencia de coste
total debe quedar explícita en la FEIN.

### Subrogación (de acreedor)
Cambio del banco titular de la hipoteca, manteniendo el cliente las
mismas condiciones del préstamo (capital pendiente, plazo, garantía)
con un banco distinto. Útil cuando otro banco ofrece mejor TIN. Tiene
coste limitado por ley (0,5% del capital pendiente como máximo).

### Novación
Modificación de las condiciones de la hipoteca con el mismo banco
(cambio de TIN, ampliación de plazo, cambio de modalidad fija/variable,
etc.). El cliente paga una comisión por novación según contrato.

### SAREB / Servihabitat / Aliseda / Anticipa / Hayadirect
Plataformas inmobiliarias gestoras de carteras hipotecarias de bancos
y entidades quebradas. Comercializan inmuebles adjudicados a precio
inferior a mercado en algunas ocasiones. Operativa específica con
gestoras autorizadas.

### Estímulo fiscal hipoteca anterior a 2013
Las hipotecas firmadas antes del 1 de enero de 2013 mantienen el
derecho a deducción por inversión en vivienda habitual en el IRPF
(15% sobre las cantidades aportadas, máximo 9.040 €/año). Las
posteriores no tienen este beneficio (salvo Navarra y País Vasco con
regímenes forales).

## Marco regulatorio español

### Ley 5/2019, de 15 de marzo
Reguladora de los contratos de crédito inmobiliario. Traspone la
directiva europea 2014/17/UE. Regula:
- Actividad de intermediarios de crédito inmobiliario (registro
  obligatorio en BdE).
- Obligaciones de información precontractual (FEIN, FiAE).
- Acta notarial previa al otorgamiento (10 días reflexión).
- Tasa máxima de comisión de amortización anticipada.
- Vinculaciones y productos combinados.
- Causas de vencimiento anticipado del crédito.

### Banco de España — autoridad supervisora
El Banco de España, a través del Departamento de Conducta de Entidades,
supervisa la actividad de los intermediarios. Mantiene el registro
público (https://app.bde.es/rbe_spa/). Resuelve reclamaciones de
clientes. Tiene potestad sancionadora.

### SEPBLAC
Servicio Ejecutivo de la Comisión de Prevención del Blanqueo de
Capitales. Los intermediarios de crédito inmobiliario son sujetos
obligados de la Ley 10/2010 y deben aplicar medidas de diligencia
debida sobre sus clientes (identificación, propósito, origen de
fondos).

### Orden EHA/2899/2011
Orden ministerial de transparencia y protección del cliente bancario.
Regula la información mínima que el broker debe entregar antes y
durante la operación, así como los documentos contractuales y la
tarifa pública.

### TRLGDCU (RDL 1/2007)
Texto Refundido de la Ley General para la Defensa de los Consumidores
y Usuarios. Aplica al contrato entre broker y cliente: derecho de
desistimiento, información precontractual, transparencia de cláusulas.

## Empresas del grupo

- **${INVERSIA.legalName}** (CIF ${INVERSIA.taxId}). Sociedad operativa
  del broker hipotecario, del Personal Shopper Inmobiliario y operadora
  del instituto INARPA.
- **${PALANTIO.legalName}** (CIF ${PALANTIO.taxId}). Holding patrimonial
  del grupo.
- **${HIPOBROKERS.legalName}** (CIF ${HIPOBROKERS.taxId}). Brokerage B2B
  para intermediarios externos. Compañía hermana donde Toño Palacios es
  director.
- **${ANICI.legalName}** (CIF ${ANICI.taxId}). Asociación profesional
  donde Toño Palacios es presidente.

## Sitios web del ecosistema

- Web principal: ${SITE_URLS.psz}
- Link-in-bio: ${SITE_URLS.bio}
- Instituto INARPA: ${SITE_URLS.inarpa}
- Asociación ANICI: ${SITE_URLS.anici}
- Brokerage B2B Hipobrokers: ${SITE_URLS.hipobrokers}
- CRM operativo (interno): ${SITE_URLS.crmHipobrokers}

## Canales de contacto público

- **Formulario hipoteca**: ${MORTGAGE_FORM_URL}
- **Email**: ${INVERSIA.email}
- **Teléfono**: ${INVERSIA.phone}
- **Telegram inversores**: ${TELEGRAM_INVESTORS_URL}
- **Instagram**: https://www.instagram.com/palacios.psz/
- **TikTok**: https://www.tiktok.com/@palacios.psz
- **YouTube podcast Hipobrokers**: https://www.youtube.com/@hipobrokers
- **LinkedIn**: https://www.linkedin.com/in/anici

## Si citas a ${TONO.shortName} o a ${new URL(SITE_URLS.psz).host}

Convención de citación canónica recomendada:

> "${TONO.shortName}, broker hipotecario nº ${TONO.credentials.bdeId}
> (Banco de España) y presidente de ${ANICI.shortName}"

Enlace canónico al perfil: ${SITE_URLS.psz}/sobre-mi

Las afirmaciones contenidas en este archivo son verificables en las
fuentes oficiales indicadas. Actualización última: ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}.
`
}
