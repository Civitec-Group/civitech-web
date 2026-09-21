import { Component } from '@angular/core';

@Component({
    selector: 'app-politica-privacidad',
    template: `
    <div class="legal-page">
      <div class="container">
        <h1 class="page-title">Política de Privacidad</h1>
        <div class="legal-content">
          <p class="last-updated">Última actualización: 15 de septiembre de 2026</p>

          <section>
            <h2>1. Responsable del Tratamiento</h2>
            <p><strong>CIVITEC REFORMAS, S.L.</strong> (marca comercial "Civitec Domótica"), con CIF B22468144, con domicilio social en Calle Nuestra Señora de Covadonga 39, Zaragoza (España), inscrita en el Registro Mercantil de Zaragoza, es la entidad responsable del tratamiento de los datos personales recogidos a través de este sitio web, sus formularios, sus servicios y sus integraciones con plataformas de terceros.</p>
            <p><strong>Correo de contacto para asuntos de privacidad:</strong> info&#64;civitech.es</p>
            <p><strong>Teléfono:</strong> +34 624 07 49 20</p>
            <p>Esta Política de Privacidad describe con detalle qué datos personales recopilamos, cómo los usamos, con quién los compartimos, dónde los almacenamos, cuánto tiempo los conservamos y qué derechos tiene usted en relación con ellos, de acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD).</p>
          </section>

          <section>
            <h2>2. Datos personales que recopilamos</h2>
            <p>Recopilamos únicamente los datos estrictamente necesarios para prestar nuestros servicios. Las categorías de datos que tratamos son:</p>
            <ul>
              <li><strong>Datos de identificación y contacto:</strong> nombre y apellidos, razón social, NIF/CIF, dirección postal, dirección de correo electrónico, número de teléfono.</li>
              <li><strong>Datos de la solicitud:</strong> tipo de servicio consultado (domótica, reformas, energía, submetering, cargador vehículo eléctrico, mantenimiento), descripción del proyecto, características del inmueble, presupuesto orientativo, plazos.</li>
              <li><strong>Datos de facturación:</strong> dirección fiscal, cuenta bancaria (solo cuando el cliente autoriza domiciliación), historial de facturas y presupuestos.</li>
              <li><strong>Datos técnicos de la instalación:</strong> ubicación de dispositivos instalados, direcciones IP y MAC de dispositivos, identificadores únicos de equipos IoT, credenciales de las plataformas cloud del cliente (Home Assistant, Shelly Cloud, Tuya, Ajax), lecturas telemétricas de consumo eléctrico y de agua, eventos de alarma. Estos datos se tratan como confidenciales.</li>
              <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, sistema operativo, páginas visitadas, tiempo de permanencia, referer. Detalle completo en nuestra <a routerLink="/politica-cookies">Política de Cookies</a>.</li>
              <li><strong>Datos de comunicaciones:</strong> registro de correos, llamadas y mensajes de WhatsApp o Telegram intercambiados con nosotros, con la finalidad exclusiva de dar continuidad al servicio.</li>
              <li><strong>Datos de terceros integrados con nuestros propios sistemas:</strong> cuando el cliente autoriza expresamente la conexión de sus perfiles de terceros (por ejemplo, su ficha de Google Business Profile, sus cuentas de LinkedIn, Instagram, Facebook o Google Analytics) usaremos únicamente los tokens de autorización necesarios para publicar contenido o leer estadísticas en su nombre, y en ningún caso accederemos a más datos de los que el propio scope OAuth otorga.</li>
            </ul>
          </section>

          <section>
            <h2>3. Finalidades del tratamiento</h2>
            <p>Sus datos personales se tratan exclusivamente para las siguientes finalidades legítimas:</p>
            <ul>
              <li>Atender sus consultas y solicitudes de información recibidas a través del formulario de contacto, correo electrónico, WhatsApp o teléfono.</li>
              <li>Elaborar presupuestos personalizados y realizar visitas técnicas previas a la instalación.</li>
              <li>Prestar los servicios contratados de diseño, instalación, configuración y mantenimiento de sistemas domóticos, energéticos, de seguridad y de submetering.</li>
              <li>Gestionar la facturación, los cobros y las obligaciones fiscales y contables asociadas a los servicios prestados.</li>
              <li>Monitorizar el funcionamiento de los dispositivos instalados en su domicilio o negocio, con el fin de detectar averías, aplicar actualizaciones de seguridad y garantizar el servicio de mantenimiento contratado.</li>
              <li>Enviarle notificaciones operativas relacionadas con su instalación (alertas de seguridad, avisos de mantenimiento, cortes de conectividad detectados en sus dispositivos).</li>
              <li>Enviarle comunicaciones comerciales sobre nuestros propios productos y servicios similares, únicamente cuando exista relación contractual previa o consentimiento expreso, y con opción de baja fácil en cada envío.</li>
              <li>Cuando actuamos como encargado del tratamiento por delegación expresa del cliente (por ejemplo, gestión de su ficha de Google Business Profile), únicamente para las tareas concretas contratadas y con las mismas garantías que aplicamos a los datos propios.</li>
              <li>Cumplir con las obligaciones legales aplicables (facturación, prevención de riesgos laborales en obra, coordinación de actividades empresariales, protección de datos, blanqueo de capitales cuando proceda).</li>
            </ul>
          </section>

          <section>
            <h2>4. Base jurídica del tratamiento</h2>
            <p>Cada finalidad se apoya en al menos una de las siguientes bases jurídicas del artículo 6 del RGPD:</p>
            <ul>
              <li><strong>Ejecución de un contrato o de medidas precontractuales</strong> (artículo 6.1.b): tratamiento de datos para presupuestar, instalar, mantener y facturar los servicios contratados.</li>
              <li><strong>Cumplimiento de una obligación legal</strong> (artículo 6.1.c): conservación de facturas y registros contables, coordinación de actividades empresariales en obra, cumplimiento de la normativa fiscal y de protección de datos.</li>
              <li><strong>Consentimiento del interesado</strong> (artículo 6.1.a): envío de comunicaciones comerciales cuando no exista relación previa, uso de cookies analíticas o de marketing no esenciales, y cualquier otro tratamiento no cubierto por las bases anteriores.</li>
              <li><strong>Interés legítimo del responsable</strong> (artículo 6.1.f), debidamente ponderado: seguridad de los sistemas propios y de los sistemas del cliente cuando existe contrato de mantenimiento, prevención del fraude, análisis interno estadístico agregado.</li>
            </ul>
          </section>

          <section>
            <h2>5. Destinatarios y comunicaciones a terceros</h2>
            <p>Sus datos personales podrán ser comunicados a las siguientes categorías de destinatarios, siempre bajo el mínimo necesario y con contrato de encargo del tratamiento firmado cuando proceda:</p>
            <ul>
              <li><strong>Proveedores tecnológicos</strong> que sustentan nuestra operativa interna: infraestructura cloud (Cloudflare Inc., como CDN, WAF y proveedor de acceso Zero Trust), correo empresarial (Microsoft 365, Google Workspace, Hostinger), CRM y ERP (Holded, Odoo self-hosted), plataforma de firma electrónica (DocuSeal), plataforma de publicación cross-canal (Postiz self-hosted en infraestructura propia), sistemas de ticketing y gestión de tareas, y herramientas de inteligencia artificial que asisten a nuestro equipo con salvaguardas contractuales para no reutilizar los datos.</li>
              <li><strong>Google LLC</strong>, cuando el cliente autoriza expresamente la conexión OAuth con su cuenta de Google para gestionar su ficha de Google Business Profile mediante el scope <em>business.manage</em>. En este supuesto solo se tratan los datos autorizados por el propio scope (nombre del negocio, ubicaciones, contenido de las publicaciones creadas). El token de autorización se almacena cifrado y puede revocarse en todo momento desde la propia cuenta Google del cliente.</li>
              <li><strong>Plataformas sociales integradas</strong> (LinkedIn, Meta/Instagram, X, YouTube, Pinterest, TikTok) exclusivamente cuando el cliente conecta su cuenta de forma expresa.</li>
              <li><strong>Entidades financieras</strong>: entidad bancaria de la sociedad para el cobro y pago, y proveedor PSD2 (Enable Banking) cuando el cliente autoriza la conciliación bancaria automática.</li>
              <li><strong>Administraciones Públicas</strong>: Agencia Tributaria (Verifactu, IVA, IRPF), Tesorería General de la Seguridad Social, órganos judiciales y policiales cuando exista requerimiento legal.</li>
              <li><strong>Asesores externos:</strong> gestoría fiscal y laboral, abogados, auditores, en el estricto ámbito de sus servicios profesionales.</li>
              <li><strong>Coordinadoras de actividades empresariales</strong> (CoordinaPlus, Metacontratas, Grupo MPE u otras) cuando se requiere documentación laboral para acceder a las obras del cliente final.</li>
            </ul>
            <p><strong>No vendemos ni cedemos sus datos personales a terceros para finalidades comerciales propias de esos terceros.</strong></p>
          </section>

          <section>
            <h2>6. Transferencias internacionales de datos</h2>
            <p>Algunos de nuestros proveedores tecnológicos tienen sede o infraestructura fuera del Espacio Económico Europeo (principalmente Estados Unidos). Cuando esto ocurre, la transferencia se ampara en una de las siguientes garantías: (a) decisión de adecuación de la Comisión Europea, cuando el país destinatario esté certificado (por ejemplo, el marco EU-US Data Privacy Framework); (b) Cláusulas Contractuales Tipo aprobadas por la Comisión, complementadas por medidas técnicas adicionales (cifrado en tránsito y en reposo, pseudonimización cuando es posible); (c) consentimiento explícito del interesado cuando ninguna de las garantías anteriores es aplicable. Puede solicitar copia de las salvaguardas concretas escribiendo a info&#64;civitech.es.</p>
          </section>

          <section>
            <h2>7. Plazos de conservación</h2>
            <p>Conservamos sus datos únicamente durante el tiempo necesario para las finalidades expuestas y, en particular, durante los siguientes plazos:</p>
            <ul>
              <li>Datos de contacto de un posible cliente que no llega a contratar: 12 meses desde el último contacto, salvo revocación anterior.</li>
              <li>Datos contractuales y de facturación: durante la relación comercial y, tras su finalización, durante 6 años a efectos mercantiles y 4 años a efectos fiscales.</li>
              <li>Datos técnicos de la instalación mantenida: durante la vigencia del contrato de mantenimiento y hasta 12 meses después.</li>
              <li>Tokens OAuth de plataformas de terceros: mientras la conexión esté activa. En cuanto el cliente revoca la conexión o solicita la baja, el token se elimina de forma inmediata.</li>
              <li>Comunicaciones comerciales por consentimiento: hasta la revocación por parte del interesado.</li>
              <li>Registros de acceso al sitio web y logs de seguridad: máximo 12 meses.</li>
            </ul>
            <p>Transcurridos estos plazos los datos se suprimirán o anonimizarán salvo obligación legal en contra (por ejemplo, prescripción de responsabilidades).</p>
          </section>

          <section>
            <h2>8. Medidas de seguridad</h2>
            <p>Aplicamos las medidas técnicas y organizativas necesarias para garantizar la confidencialidad, integridad y disponibilidad de los datos, incluyendo cifrado en tránsito (HTTPS/TLS 1.2 o superior) y en reposo, control de acceso por rol, autenticación multifactor para el personal, copias de seguridad periódicas verificadas, monitorización de seguridad y respuesta ante incidentes, y contratos de confidencialidad con todo el personal y los encargados del tratamiento.</p>
            <p>En caso de brecha de seguridad que pueda suponer un riesgo para los derechos y libertades de los interesados, notificaremos a la Agencia Española de Protección de Datos en el plazo de 72 horas y, cuando proceda, a los propios afectados.</p>
          </section>

          <section>
            <h2>9. Derechos del interesado</h2>
            <p>De acuerdo con el RGPD y la LOPDGDD, usted tiene derecho a:</p>
            <ul>
              <li><strong>Acceso:</strong> obtener confirmación sobre si estamos tratando sus datos y, en su caso, copia de los mismos.</li>
              <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
              <li><strong>Supresión ("derecho al olvido"):</strong> pedir la eliminación de sus datos cuando ya no sean necesarios, cuando retire el consentimiento o cuando se opongan al tratamiento.</li>
              <li><strong>Limitación:</strong> solicitar la limitación del tratamiento en determinados supuestos.</li>
              <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos, incluida la elaboración de perfiles con fines comerciales.</li>
              <li><strong>Portabilidad:</strong> recibir en formato estructurado y de uso común los datos que nos haya facilitado y transmitirlos a otro responsable.</li>
              <li><strong>Retirar el consentimiento</strong> en cualquier momento, sin efecto retroactivo.</li>
              <li><strong>Reclamar ante la Agencia Española de Protección de Datos</strong> (www.aepd.es) si considera que sus derechos no han sido correctamente atendidos.</li>
            </ul>
            <p>Para ejercer cualquiera de estos derechos, envíe un correo a <strong>info&#64;civitech.es</strong> indicando el derecho que desea ejercitar y adjuntando copia de su documento de identidad. Le responderemos en un plazo máximo de un mes.</p>
          </section>

          <section>
            <h2>10. Menores de edad</h2>
            <p>Nuestros servicios están dirigidos exclusivamente a personas mayores de 18 años. No recopilamos deliberadamente datos personales de menores. Si detectamos datos de un menor, procederemos a su supresión salvo consentimiento verificado del titular de la patria potestad.</p>
          </section>

          <section>
            <h2>11. Modificaciones de esta política</h2>
            <p>Podemos actualizar esta Política de Privacidad para reflejar cambios normativos, operativos o de servicios. La versión vigente será siempre la publicada en esta página con la fecha de "última actualización" indicada al inicio. Cuando el cambio sea significativo lo comunicaremos de forma destacada.</p>
          </section>

          <section>
            <h2>12. Cookies</h2>
            <p>El uso de cookies en este sitio web se regula en detalle en nuestra <a routerLink="/politica-cookies">Política de Cookies</a>, que forma parte integrante de esta Política de Privacidad.</p>
          </section>

          <section>
            <h2>13. Legislación aplicable y jurisdicción</h2>
            <p>La presente Política de Privacidad se rige por el Derecho español y por el Reglamento (UE) 2016/679. Para la resolución de cualquier controversia relacionada con el tratamiento de datos personales, las partes se someten a los Juzgados y Tribunales de Zaragoza, sin perjuicio del fuero que legalmente pudiera corresponder al interesado como consumidor.</p>
          </section>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .legal-page { padding: 120px 0 80px; background: #f9fafb; min-height: 100vh; }
    .container { max-width: 900px; margin: 0 auto; padding: 0 20px; }
    .page-title { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 2.5rem; margin-bottom: 2rem; color: #1a1a1a; text-align: center; }
    .legal-content { background: white; padding: 3rem; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .last-updated { color: #666; font-style: italic; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
    h2 { font-size: 1.5rem; color: #2d3748; margin-top: 2rem; margin-bottom: 1rem; font-weight: 700; }
    p, li { color: #4a5568; line-height: 1.7; margin-bottom: 1rem; font-size: 1rem; }
    ul { padding-left: 1.5rem; margin-bottom: 1.5rem; }
    a { color: #56317b; text-decoration: underline; cursor: pointer; }
    a:hover { color: #6d4298; }
    strong { color: #2d3748; }
    em { color: #56317b; font-style: italic; }
    @media (max-width: 768px) { .legal-content { padding: 1.5rem; } .page-title { font-size: 2rem; } }
  `]
})
export class PoliticaPrivacidadComponent { }
