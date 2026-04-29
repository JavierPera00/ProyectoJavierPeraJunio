package com.ProyectoJunio;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ProyectoJunio.model.Curso;
import com.ProyectoJunio.model.Noticia;
import com.ProyectoJunio.repository.CursoRepository;
import com.ProyectoJunio.servicio.NoticiaService;

@SpringBootApplication
public class ProyectoJunioApplication implements CommandLineRunner {

        @Autowired
        private NoticiaService noticiaService;

        @Autowired
        private CursoRepository cursoRepository;

        public static void main(String[] args) {
                SpringApplication.run(ProyectoJunioApplication.class, args);
        }

        @Override
        public void run(String... args) throws Exception {

                // Noticia 1
                Noticia n1 = new Noticia();
                n1.setTitulo("Notepad++ sufrió ataque dirigido de malware");
                n1.setDescripcion(
                                "El popular editor de código fue comprometido mediante su cadena de actualizaciones por atacantes vinculados a un grupo estatal.");
                n1.setFechaPublicacion(LocalDateTime.of(2026, 2, 6, 0, 0));
                n1.setUrlImagen("/notepad-plus-plus.jpg");
                n1.setUrlExterna(
                                "https://as.com/meristation/betech/notepad-fue-hackeado-durante-meses-y-se-sospecha-del-grupo-lotus-blossom-vinculado-a-intereses-chinos-f202602-n/");
                noticiaService.save(n1);

                // Noticia 2
                Noticia n2 = new Noticia();
                n2.setTitulo("Nueva vulnerabilidad en WinRAR explotada en ataques");
                n2.setDescripcion(
                                "Un fallo de seguridad en WinRAR está siendo utilizado activamente para ejecutar código malicioso; se recomienda actualizar.");
                n2.setFechaPublicacion(LocalDateTime.of(2026, 2, 5, 0, 0));
                n2.setUrlImagen("/OIP.webp");
                n2.setUrlExterna(
                                "https://www.techradar.com/pro/security/dangerous-new-malware-exploits-winrar-flaw-heres-what-we-know");
                noticiaService.save(n2);

                // Noticia 3
                Noticia n3 = new Noticia();
                n3.setTitulo("Nuevo malware Android usa repositorios populares");
                n3.setDescripcion(
                                "Se ha detectado malware que otorga acceso remoto completo a dispositivos Android disfrazado de app de seguridad.");
                n3.setFechaPublicacion(LocalDateTime.of(2026, 2, 3, 0, 0));
                n3.setUrlImagen("/intro-1657051170.jpg");
                n3.setUrlExterna(
                                "https://www.tomsguide.com/computing/malware-adware/hugging-face-ai-platform-used-to-deliver-android-malware-via-fake-apps-dont-fall-for-this");
                noticiaService.save(n3);

                // Noticia 4
                Noticia n4 = new Noticia();
                n4.setTitulo("AI impulsa crecimiento de phishing y ataques avanzados");
                n4.setDescripcion(
                                "Según informes, los ataques de phishing asistidos por IA aumentaron fuertemente en 2025, creando campañas más personalizadas.");
                n4.setFechaPublicacion(LocalDateTime.of(2026, 2, 1, 0, 0));
                n4.setUrlImagen("/Phishing-concept-pic.webp");
                n4.setUrlExterna(
                                "https://newsletter.7secure.eu/ai-driven-phishing-cloud-misconfigurations-and-state-backed-campaigns-shape-2026-threat-landscape/");
                noticiaService.save(n4);

                // Noticia 5
                Noticia n5 = new Noticia();
                n5.setTitulo("Hacienda investiga posible hackeo que compromete datos fiscales");
                n5.setDescripcion(
                                "El Ministerio de Hacienda investiga una posible brecha que podría haber expuesto datos bancarios y fiscales de millones.");
                n5.setFechaPublicacion(LocalDateTime.of(2026, 2, 2, 0, 0));
                n5.setUrlImagen("/Agencia_tributaria_espanola.jpeg");
                n5.setUrlExterna(
                                "https://elpais.com/economia/2026-02-02/hacienda-investiga-un-posible-hackeo-que-compromete-datos-personales-bancarios-y-fiscales-de-ciudadanos.html");
                noticiaService.save(n5);

                // Noticia 6
                Noticia n6 = new Noticia();
                n6.setTitulo("Top 10 Cibersecurity News de la semana");
                n6.setDescripcion(
                                "Resumen semanal con ataques ransomware, brechas de datos y extensiones maliciosas detectadas recientemente.");
                n6.setFechaPublicacion(LocalDateTime.of(2026, 1, 26, 0, 0));
                n6.setUrlImagen("/2540892.jpg");
                n6.setUrlExterna(
                                "https://innovatecybersecurity.com/security-threat-advisory/top-10-cybersecurity-news-jan-26-2026-apac-energy-firm-hit-by-dire-wolf-ransomware-ai-led-espionage-campaign-uses-autonomous-agents-pwn2own-automotive-2026-uncovers-76-zero-day-flaws-and-more/");
                noticiaService.save(n6);

                // Noticia 7
                Noticia n7 = new Noticia();
                n7.setTitulo("Hackeo a proveedor cloud expone datos de miles de empresas");
                n7.setDescripcion(
                                "Un ataque a un proveedor de servicios en la nube permitió a los atacantes acceder a copias de seguridad empresariales.");
                n7.setFechaPublicacion(LocalDateTime.of(2026, 2, 7, 0, 0));
                n7.setUrlImagen("/cloud.webp");
                n7.setUrlExterna(
                                "https://www.incibe.es/incibe-cert/publicaciones/bitacora-de-seguridad/brecha-de-datos-en-la-plataforma-oracle-cloud");
                noticiaService.save(n7);

                // Noticia 8
                Noticia n8 = new Noticia();
                n8.setTitulo("Brecha de seguridad en plataforma educativa filtra datos de estudiantes");
                n8.setDescripcion(
                                "Información personal y académica quedó expuesta tras un acceso no autorizado a los servidores de la plataforma.");
                n8.setFechaPublicacion(LocalDateTime.of(2026, 2, 6, 0, 0));
                n8.setUrlImagen("/descargar.webp");
                n8.setUrlExterna(
                                "https://elpais.com/espana/2026-02-09/proteccion-de-datos-sanciona-a-andalucia-por-vulnerar-la-intimidad-de-700000-estudiantes-menores-de-edad-y-dar-sus-datos-a-google.html");
                noticiaService.save(n8);

                // Noticia 9
                Noticia n9 = new Noticia();
                n9.setTitulo("Ataque a empresa de transporte compromete sistemas de reservas");
                n9.setDescripcion(
                                "Los atacantes obtuvieron acceso interno y provocaron interrupciones en los servicios de venta y gestión de billetes.");
                n9.setFechaPublicacion(LocalDateTime.of(2026, 2, 5, 0, 0));
                n9.setUrlImagen("/Email-Security-News-Round-Up-May-2022.jpg.webp");
                n9.setUrlExterna("https://www.esedsl.com/blog/casos-reales-de-ciberataques-en-el-sector-logistico");
                noticiaService.save(n9);

                // Noticia 10
                Noticia n10 = new Noticia();
                n10.setTitulo("Hackers roban credenciales de empleados mediante phishing interno");
                n10.setDescripcion(
                                "Correos fraudulentos dirigidos a trabajadores permitieron el acceso a sistemas corporativos sensibles.");
                n10.setFechaPublicacion(LocalDateTime.of(2026, 2, 4, 0, 0));
                n10.setUrlImagen("/los-ataques-de-robo-de-contrasenas.jpg");
                n10.setUrlExterna(
                                "https://www.mcafee.com/blogs/es-es/security-news/los-hackers-enganan-a-empleados-de-grandes-empresas-para-que-expongan-datos-de-salesforce/");
                noticiaService.save(n10);

                // Noticia 11
                Noticia n11 = new Noticia();
                n11.setTitulo("Filtración de datos afecta a usuarios de una popular red social");
                n11.setDescripcion(
                                "Un fallo en una API permitió la extracción masiva de perfiles, correos electrónicos y datos de contacto.");
                n11.setFechaPublicacion(LocalDateTime.of(2026, 2, 3, 0, 0));
                n11.setUrlImagen("/OIP (2).webp");
                n11.setUrlExterna(
                                "https://ciberseguridadegalicia.gal/es/ciberseguridad-al-dia/alertas/filtracion-masiva-de-datos-expone-48-millones-de-cuentas-de-gmail-y-65-millones-de-instagram");
                noticiaService.save(n11);

                // Noticia 12
                Noticia n12 = new Noticia();
                n12.setTitulo("Ataque informático bloquea sistemas municipales durante horas");
                n12.setDescripcion(
                                "Varios servicios públicos quedaron inaccesibles tras un ataque que afectó a la infraestructura digital del ayuntamiento.");
                n12.setFechaPublicacion(LocalDateTime.of(2026, 2, 2, 0, 0));
                n12.setUrlImagen("/OIP (3).webp");
                n12.setUrlExterna(
                                "https://www.diariodesevilla.es/sevilla/Bloqueo-servicios-Ayuntamiento-Sevilla-Ciberataque_0_1827119225.html");
                noticiaService.save(n12);

                // Noticia 13
                Noticia n13 = new Noticia();
                n13.setTitulo("Nuevo ransomware ataca hospitales europeos");
                n13.setDescripcion(
                                "Un grupo criminal ha paralizado sistemas hospitalarios exigiendo rescates millonarios.");
                n13.setFechaPublicacion(LocalDateTime.of(2026, 2, 8, 0, 0));
                n13.setUrlImagen("/noticia1.webp");
                n13.setUrlExterna(
                                "https://elpais.com/internacional/2020-10-03/ciberataque-a-un-hospital-aleman-en-tiempos-de-pandemia.html");
                noticiaService.save(n13);

                // Noticia 14
                Noticia n14 = new Noticia();
                n14.setTitulo("Google corrige fallo crítico en Android");
                n14.setDescripcion(
                                "Una vulnerabilidad permitía a apps maliciosas acceder a datos privados sin permisos.");
                n14.setFechaPublicacion(LocalDateTime.of(2026, 2, 9, 0, 0));
                n14.setUrlImagen("/noticia2.webp");
                n14.setUrlExterna(
                                "https://unaaldia.hispasec.com/2020/01/google-corrige-un-fallo-critico-con-rce-en-android.html");
                noticiaService.save(n14);

                // Noticia 15
                Noticia n15 = new Noticia();
                n15.setTitulo("Hackeo a empresa fintech expone tarjetas bancarias");
                n15.setDescripcion("Miles de usuarios afectados tras una brecha en sistemas de pago.");
                n15.setFechaPublicacion(LocalDateTime.of(2026, 2, 10, 0, 0));
                n15.setUrlImagen("/credit-card-theft-hacking.jpg");
                n15.setUrlExterna(
                                "https://www.iproup.com/finanzas/65137-ciberataque-a-figure-dejo-al-descubierto-informacion-de-casi-un-millon-de-usuarios");
                noticiaService.save(n15);

                // Noticia 16
                Noticia n16 = new Noticia();
                n16.setTitulo("Ataques DDoS baten récord en 2026");
                n16.setDescripcion("El volumen de ataques distribuidos alcanza cifras históricas.");
                n16.setFechaPublicacion(LocalDateTime.of(2026, 2, 11, 0, 0));
                n16.setUrlImagen("/BLOG-3098_6.png");
                n16.setUrlExterna(
                                "https://ecosistemastartup.com/mastodon-ddos-como-proteger-tu-startup-ante-ataques-2026/");
                noticiaService.save(n16);

                // Noticia 17
                Noticia n17 = new Noticia();
                n17.setTitulo("Microsoft alerta sobre nueva campaña de phishing");
                n17.setDescripcion("Correos falsos simulan ser soporte técnico para robar credenciales.");
                n17.setFechaPublicacion(LocalDateTime.of(2026, 2, 12, 0, 0));
                n17.setUrlImagen("/microsoft-primera-marca-mas-suplantada-ataques-phishing-q4-2023.jpg");
                n17.setUrlExterna(
                                "https://cybersecuritynews.es/microsoft-lidera-las-marcas-mas-suplantadas-en-phishing-en-el-primer-trimestre-de-2026/");
                noticiaService.save(n17);

                // Noticia 18
                Noticia n18 = new Noticia();
                n18.setTitulo("Malware roba criptomonedas desde wallets");
                n18.setDescripcion("Un troyano apunta a usuarios de criptodivisas.");
                n18.setFechaPublicacion(LocalDateTime.of(2026, 2, 13, 0, 0));
                n18.setUrlImagen("/five-threats-hardware-crypto-wallets-featured.jpg");
                n18.setUrlExterna(
                                "https://www.ibm.com/es-es/think/insights/spyagent-malware-targets-crypto-wallets-stealing-screenshots");
                noticiaService.save(n18);

                // Noticia 19
                Noticia n19 = new Noticia();
                n19.setTitulo("Hackers atacan videojuegos online");
                n19.setDescripcion("Servidores de juegos sufren intrusiones masivas.");
                n19.setFechaPublicacion(LocalDateTime.of(2026, 2, 14, 0, 0));
                n19.setUrlImagen("/hq720.jpg");
                n19.setUrlExterna(
                                "https://tn.com.ar/tecno/juegos/2026/04/13/ciberdelincuentes-atacaron-y-extorsionaron-a-los-creadores-de-gta-paguen-o-filtramos-la-informacion/");
                noticiaService.save(n19);

                // Noticia 20
                Noticia n20 = new Noticia();
                n20.setTitulo("Nueva estafa usa IA para clonar voces");
                n20.setDescripcion("Delincuentes suplantan identidad mediante audio generado.");
                n20.setFechaPublicacion(LocalDateTime.of(2026, 2, 15, 0, 0));
                n20.setUrlImagen("/esp-1.jpg");
                n20.setUrlExterna(
                                "https://www.caixabank.com/es/esfera/content/clonacion-voz-identificar-ciberseguridad");
                noticiaService.save(n20);

                // Noticia 21 - Smart Slider 3
                Noticia n21 = new Noticia();
                n21.setTitulo("Vulnerabilidad crítica en Smart Slider 3 de WordPress");
                n21.setDescripcion(
                                "Numerosos sitios web afectados tras la detección de un fallo de seguridad que permite ataques remotos.");
                n21.setFechaPublicacion(LocalDateTime.of(2026, 4, 28, 0, 0));
                n21.setUrlImagen("/smart-slider-3-vulnerabilidad-critica-wordpress-hero-768x429.jpg");
                n21.setUrlExterna(
                                "https://www.incibe.es/incibe-cert/alerta/vulnerabilidad-en-smart-slider-3-de-wordpress");
                noticiaService.save(n21);

                // Noticia 22 - AstraZeneca
                Noticia n22 = new Noticia();
                n22.setTitulo("AstraZeneca refuerza sistemas tras ataque informático");
                n22.setDescripcion(
                                "La farmacéutica sufrió una interrupción de sus sistemas tras un incidente de ciberseguridad a gran escala.");
                n22.setFechaPublicacion(LocalDateTime.of(2026, 4, 21, 0, 0));
                n22.setUrlImagen("/descarga (1).png");
                n22.setUrlExterna(
                                "https://www.redseguridad.com/actualidad/ciberataque-astrazeneca-seguridad-farmaceutica_20260421.html");
                noticiaService.save(n22);

                // Noticia 23 - Meta IA
                Noticia n23 = new Noticia();
                n23.setTitulo("Incidente con IA en Meta impulsa mejoras de control");
                n23.setDescripcion(
                                "Un agente autónomo de Meta genera una brecha de seguridad que obliga a replantear la supervisión de sistemas IA.");
                n23.setFechaPublicacion(LocalDateTime.of(2026, 4, 16, 0, 0));
                n23.setUrlImagen("/meta-director-seguridad-ia-openclaw-agente-fugitivo-eliminacion-correos.jpg");
                n23.setUrlExterna(
                                "https://www.xataka.com/seguridad/meta-ia-fallo-sistemas-autonomos-mejoras-seguridad");
                noticiaService.save(n23);

                // Noticia 24 - Vishing Europa
                Noticia n24 = new Noticia();
                n24.setTitulo("Desarticulada red internacional de vishing en Europa");
                n24.setDescripcion(
                                "Cooperación policial logra frenar una red dedicada al fraude telefónico masivo mediante ingeniería social.");
                n24.setFechaPublicacion(LocalDateTime.of(2026, 4, 14, 0, 0));
                n24.setUrlImagen("/68e7bf1350648.webp");
                n24.setUrlExterna(
                                "https://www.europol.europa.eu/newsroom/news/international-action-against-vishing-networks");
                noticiaService.save(n24);

                // Noticia 25 - LeakBase
                Noticia n25 = new Noticia();
                n25.setTitulo("Cierre de LeakBase: Golpe al cibercrimen global");
                n25.setDescripcion(
                                "Autoridades internacionales desmantelan una de las mayores plataformas de venta de datos robados.");
                n25.setFechaPublicacion(LocalDateTime.of(2026, 3, 31, 0, 0));
                n25.setUrlImagen("/OP-LEAK-cover.jpg");
                n25.setUrlExterna("https://www.incibe.es/incibe-cert/blog/operacion-leakbase-cibercrimen");
                noticiaService.save(n25);

                // Noticia 26 - CyberStrikeAI
                Noticia n26 = new Noticia();
                n26.setTitulo("CyberStrikeAI: IA lanzando ataques contra Fortinet");
                n26.setDescripcion(
                                "Detectan ofensivas automatizadas que utilizan inteligencia artificial para vulnerar firewalls empresariales.");
                n26.setFechaPublicacion(LocalDateTime.of(2026, 3, 26, 0, 0));
                n26.setUrlImagen("/cyberattacks.jpg");
                n26.setUrlExterna("https://www.fortinet.com/blog/threat-research/cyberstrikeai-automated-attacks");
                noticiaService.save(n26);

                // Noticia 27 - Deutsche Bahn
                Noticia n27 = new Noticia();
                n27.setTitulo("Ciberataque paraliza la red ferroviaria alemana");
                n27.setDescripcion(
                                "La empresa Deutsche Bahn restablece servicios tras un ataque DoS que afectó al transporte en toda Alemania.");
                n27.setFechaPublicacion(LocalDateTime.of(2026, 3, 10, 0, 0));
                n27.setUrlImagen("/FOTO-97.jpg");
                n27.setUrlExterna("https://www.dw.com/es/alemania-restablece-trenes-tras-ataque-hacker/a-68501234");
                noticiaService.save(n27);

                // Noticia 28 - Fraude Hotelero Madrid
                Noticia n28 = new Noticia();
                n28.setTitulo("Detenido en Madrid por vulnerar pasarelas de pago");
                n28.setDescripcion(
                                "Un joven es arrestado tras manipular sistemas de reserva hotelera para desviar fondos de clientes.");
                n28.setFechaPublicacion(LocalDateTime.of(2026, 3, 5, 0, 0));
                n28.setUrlImagen("/LATERAL-COCHE.jpg_1476148634.jpg");
                n28.setUrlExterna("https://www.elmundo.es/madrid/2026/03/05/fraude-hotelero-detencion.html");
                noticiaService.save(n28);

                // Noticia 29 - Comisión Europea
                Noticia n29 = new Noticia();
                n29.setTitulo("Intrusión en la infraestructura móvil de la Comisión Europea");
                n29.setDescripcion(
                                "Detección y respuesta rápida tras un intento de acceso no autorizado a los dispositivos del personal europeo.");
                n29.setFechaPublicacion(LocalDateTime.of(2026, 3, 3, 0, 0));
                n29.setUrlImagen("/ciberataque-movil.jpg");
                n29.setUrlExterna("https://ec.europa.eu/newsroom/cybersecurity/items/intrusions-mobile-infra");
                noticiaService.save(n29);

                // Noticia 30 - Metro4Shell React Native
                Noticia n30 = new Noticia();
                n30.setTitulo("Alerta por Metro4Shell en entornos React Native");
                n30.setDescripcion(
                                "Confirmada la explotación activa de una vulnerabilidad crítica en el servidor de desarrollo Metro.");
                n30.setFechaPublicacion(LocalDateTime.of(2026, 2, 26, 0, 0));
                n30.setUrlImagen("/cve-2025-11953-metro4shell-in-react-native-metro-server-enables-rce.jpg");
                n30.setUrlExterna("https://es.reactnative.dev/blog/security-vulnerability-metro4shell");
                noticiaService.save(n30);

                // Noticia 31 - Filtración masiva (Binance, TikTok, etc)
                Noticia n31 = new Noticia();
                n31.setTitulo("Filtración expone 149 millones de credenciales");
                n31.setDescripcion(
                                "Datos de acceso de Binance, Instagram y TikTok circulan en foros tras una brecha masiva.");
                n31.setFechaPublicacion(LocalDateTime.of(2026, 2, 17, 0, 0));
                n31.setUrlImagen("/cyber-security-briefing-post-i43565.jpg");
                n31.setUrlExterna(
                                "https://www.genbeta.com/actualidad/filtracion-masiva-credenciales-redes-sociales-2026");
                noticiaService.save(n31);

                // Noticia 32 - LinkedIn Malware
                Noticia n32 = new Noticia();
                n32.setTitulo("Malware distribuido a través de mensajes en LinkedIn");
                n32.setDescripcion(
                                "Nueva campaña de phishing utiliza perfiles profesionales para infectar sistemas con malware de acceso remoto.");
                n32.setFechaPublicacion(LocalDateTime.of(2026, 2, 12, 0, 0));
                n32.setUrlImagen("/Ofertas_de_trabajo_en_LinkedIn_con_malware_cabecera.jpg");
                n32.setUrlExterna("https://www.linkedin.com/help/linkedin/answer/a1339845/seguridad-mensajes");
                noticiaService.save(n32);

                // Noticia 33 - Agencia Espacial Europea (ESA)
                Noticia n33 = new Noticia();
                n33.setTitulo("La ESA confirma incidente en servidores externos");
                n33.setDescripcion(
                                "La Agencia Espacial Europea sufre una fuga de información tras el compromiso de un proveedor tecnológico externo.");
                n33.setFechaPublicacion(LocalDateTime.of(2026, 1, 20, 0, 0));
                n33.setUrlImagen("/ESA_floating_patch_pillars.png");
                n33.setUrlExterna("https://www.esa.int/About_Us/Corporate_news/ESA_cybersecurity_statement");
                noticiaService.save(n33);

                // Cursos
                Curso c1 = new Curso();
                c1.setTitulo("TryHackMe");
                c1.setDescripcion(
                                "Aprende hacking ético paso a paso con laboratorios prácticos. Explora redes, seguridad web, vulnerabilidades, scripting y criptografía en entornos seguros mientras realizas retos y simulaciones reales.");
                c1.setDuracion("15h");
                c1.setImagenUrl("/HA-TryHackMe.jpg");
                c1.setUrl("https://tryhackme.com/");
                cursoRepository.save(c1);

                Curso c2 = new Curso();
                c2.setTitulo("RoboShadow");
                c2.setDescripcion(
                                "Aprende a crear robots virtuales y automatizaciones avanzadas usando programación en TypeScript. Domina variables, tipos, interfaces, clases y funciones mientras construyes proyectos prácticos de automatización y simulación robótica.");
                c2.setDuracion("12h");
                c2.setImagenUrl("/1704983465885.jpg");
                c2.setUrl("https://www.roboshadow.com/");
                cursoRepository.save(c2);

                Curso c3 = new Curso();
                c3.setTitulo("Udemy");
                c3.setDescripcion(
                                "Explora una de las plataformas de aprendizaje online más grandes del mundo, con miles de cursos en vídeo sobre tecnología, negocios, diseño y más. Aprende a tu ritmo a través de lecciones on‑demand, recursos descargables, ejercicios y evaluaciones, y obtén certificados al completar cursos.");
                c3.setDuracion("10h");
                c3.setImagenUrl("/udemy-2023.webp");
                c3.setUrl("https://www.udemy.com/es/");
                cursoRepository.save(c3);

                Curso c4 = new Curso();
                c4.setTitulo("LabEx");
                c4.setDescripcion(
                                "LabEx es una plataforma de aprendizaje interactivo centrada en el aprendizaje práctico sin vídeos: dominarás habilidades de Linux, DevOps, ciberseguridad, programación y bases de datos a través de laboratorios interactivos en línea, proyectos reales y asistencia IA, aplicando conocimientos en entornos virtuales reales.");
                c4.setDuracion("12h");
                c4.setImagenUrl("/OIP (4).webp");
                c4.setUrl("https://labex.io/es");
                cursoRepository.save(c4);

                Curso c5 = new Curso();
                c5.setTitulo("Hack The Box Academy");
                c5.setDescripcion(
                                "Plataforma de ciberseguridad con laboratorios reales para aprender hacking ético, pentesting, redes y explotación de vulnerabilidades.");
                c5.setDuracion("20h");
                c5.setImagenUrl("/og-academy-business.webp");
                c5.setUrl("https://academy.hackthebox.com");
                cursoRepository.save(c5);

                Curso c6 = new Curso();
                c6.setTitulo("FreeCodeCamp");
                c6.setDescripcion(
                                "Aprende desarrollo web completo con HTML, CSS, JavaScript, React, Node.js y más mediante proyectos prácticos gratuitos.");
                c6.setDuracion("25h");
                c6.setImagenUrl("/01tPXClg2WjLamQzScplH3y-15.webp");
                c6.setUrl("https://www.freecodecamp.org");
                cursoRepository.save(c6);

                Curso c7 = new Curso();
                c7.setTitulo("PortSwigger Web Security Academy");
                c7.setDescripcion(
                                "Entrenamiento gratuito en seguridad web con laboratorios reales sobre XSS, SQL Injection, CSRF y ataques modernos.");
                c7.setDuracion("18h");
                c7.setImagenUrl("/portswigger-websecurity-academy-6589.png");
                c7.setUrl("https://portswigger.net/web-security");
                cursoRepository.save(c7);

                Curso c8 = new Curso();
                c8.setTitulo("AWS Skill Builder");
                c8.setDescripcion(
                                "Formación oficial de Amazon para aprender cloud computing, servidores, redes y arquitectura en la nube.");
                c8.setDuracion("15h");
                c8.setImagenUrl("/maxresdefault.jpg");
                c8.setUrl("https://skillbuilder.aws");
                cursoRepository.save(c8);

                Curso c9 = new Curso();
                c9.setTitulo("Python Institute");
                c9.setDescripcion(
                                "Aprende Python desde cero hasta nivel avanzado con certificaciones oficiales y ejercicios prácticos.");
                c9.setDuracion("14h");
                c9.setImagenUrl("/651eb5342fb67369437591.png");
                c9.setUrl("https://pythoninstitute.org");
                cursoRepository.save(c9);

                // Curso 10
                Curso c10 = new Curso();
                c10.setTitulo("OWASP Top 10 Security Training");
                c10.setDescripcion(
                                "Aprende las vulnerabilidades más peligrosas de aplicaciones web como SQL Injection, XSS, CSRF y control de acceso inseguro. Basado en el estándar OWASP.");
                c10.setDuracion("16h");
                c10.setImagenUrl("/image 2-1.webp");
                c10.setUrl("https://www.secureflag.com/secure-code?gad_source=1&gad_campaignid=21617031553&gclid=Cj0KCQjw2MbPBhCSARIsAP3jP9zlDuoQfmxkfXf8L1Ez_evhhJwWD9RXezqn_d7VogCt5iKFlmhLcmAaAikTEALw_wcB");
                cursoRepository.save(c10);

                // Curso 11
                Curso c11 = new Curso();
                c11.setTitulo("Cyber Threat Intelligence Basics");
                c11.setDescripcion(
                                "Introducción al análisis de amenazas cibernéticas, tracking de atacantes, malware y grupos de hacking organizados.");
                c11.setDuracion("18h");
                c11.setImagenUrl("/CYBER-THREAT-INTELLIGENCE.png");
                c11.setUrl("https://nordstellar.com/cyber-threat-intelligence/?gad_source=1&gad_campaignid=22500279727&gclid=Cj0KCQjw2MbPBhCSARIsAP3jP9xeUzgb-Buftg8d4dVR9xIv-TwvHJ22BTdlEuIAPCtTccG1Dx1c-OgaAjz0EALw_wcB");
                cursoRepository.save(c11);

                // Curso 12
                Curso c12 = new Curso();
                c12.setTitulo("Ethical Hacking & Penetration Testing");
                c12.setDescripcion(
                                "Aprende técnicas reales de hacking ético: reconocimiento, explotación de vulnerabilidades y escalada de privilegios en entornos controlados.");
                c12.setDuracion("22h");
                c12.setImagenUrl("/Hacking etico.png");
                c12.setUrl("https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/");
                cursoRepository.save(c12);

                // Curso 13
                Curso c13 = new Curso();
                c13.setTitulo("Malware Analysis Fundamentals");
                c13.setDescripcion(
                                "Aprende a analizar virus, troyanos y ransomware mediante ingeniería inversa y análisis de comportamiento.");
                c13.setDuracion("20h");
                c13.setImagenUrl("/descarga.png");
                c13.setUrl("https://www.fireeye.com/services.html");
                cursoRepository.save(c13);

                // Curso 14
                Curso c14 = new Curso();
                c14.setTitulo("DDoS Attack Defense & Mitigation");
                c14.setDescripcion(
                                "Entiende cómo funcionan los ataques DDoS y aprende técnicas para proteger servidores y redes empresariales.");
                c14.setDuracion("14h");
                c14.setImagenUrl("/images (2).png");
                c14.setUrl("https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/");
                cursoRepository.save(c14);

                // Curso 15
                Curso c15 = new Curso();
                c15.setTitulo("Digital Forensics & Cybercrime Investigation");
                c15.setDescripcion(
                                "Aprende a investigar delitos informáticos, recuperar evidencias digitales y analizar ataques cibernéticos.");
                c15.setDuracion("19h");
                c15.setImagenUrl("/informatica-forense.png");
                c15.setUrl("https://www.sans.org/cyber-security-courses/digital-forensics-incident-response/");
                cursoRepository.save(c15);

                // Curso 16
                Curso c16 = new Curso();
                c16.setTitulo("Social Engineering Attacks");
                c16.setDescripcion(
                                "Estudia técnicas de ingeniería social como phishing, vishing y spear phishing usadas por ciberdelincuentes.");
                c16.setDuracion("10h");
                c16.setImagenUrl("/shutterstock2179110671-q75.jpg");
                c16.setUrl("https://www.cisa.gov/topics/cybersecurity-best-practices/social-engineering");
                cursoRepository.save(c16);

                // Curso 17
                Curso c17 = new Curso();
                c17.setTitulo("Ransomware Attack Simulation");
                c17.setDescripcion(
                                "Simula ataques ransomware reales y aprende cómo se propagan y cómo defender sistemas críticos.");
                c17.setDuracion("17h");
                c17.setImagenUrl("/cabecera-ransomeware.png");
                c17.setUrl("https://www.cisa.gov/stopransomware");
                cursoRepository.save(c17);

                // Curso 18
                Curso c18 = new Curso();
                c18.setTitulo("Advanced Network Attacks & Defense");
                c18.setDescripcion(
                                "Aprende ataques avanzados a redes como MITM, sniffing, spoofing y técnicas de defensa profesional.");
                c18.setDuracion("21h");
                c18.setImagenUrl("/que-es-hacking-tecnicas-comunes-tipos-de-hackers-y-ciberseguridad.png");
                c18.setUrl("https://www.cisco.com/c/en/us/products/security/index.html");
                cursoRepository.save(c18);

        }

}
