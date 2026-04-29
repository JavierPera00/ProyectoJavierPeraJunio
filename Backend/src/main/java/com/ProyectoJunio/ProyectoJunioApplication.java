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
        n7.setUrlExterna("https://example.com/hackeo-proveedor-cloud");
        noticiaService.save(n7);

        // Noticia 8
        Noticia n8 = new Noticia();
        n8.setTitulo("Brecha de seguridad en plataforma educativa filtra datos de estudiantes");
        n8.setDescripcion(
                "Información personal y académica quedó expuesta tras un acceso no autorizado a los servidores de la plataforma.");
        n8.setFechaPublicacion(LocalDateTime.of(2026, 2, 6, 0, 0));
        n8.setUrlImagen("/descargar.webp");
        n8.setUrlExterna("https://example.com/brecha-plataforma-educativa");
        noticiaService.save(n8);

        // Noticia 9
        Noticia n9 = new Noticia();
        n9.setTitulo("Ataque a empresa de transporte compromete sistemas de reservas");
        n9.setDescripcion(
                "Los atacantes obtuvieron acceso interno y provocaron interrupciones en los servicios de venta y gestión de billetes.");
        n9.setFechaPublicacion(LocalDateTime.of(2026, 2, 5, 0, 0));
        n9.setUrlImagen("/Email-Security-News-Round-Up-May-2022.jpg.webp");
        n9.setUrlExterna("https://example.com/hackeo-empresa-transporte");
        noticiaService.save(n9);

        // Noticia 10
        Noticia n10 = new Noticia();
        n10.setTitulo("Hackers roban credenciales de empleados mediante phishing interno");
        n10.setDescripcion(
                "Correos fraudulentos dirigidos a trabajadores permitieron el acceso a sistemas corporativos sensibles.");
        n10.setFechaPublicacion(LocalDateTime.of(2026, 2, 4, 0, 0));
        n10.setUrlImagen("/los-ataques-de-robo-de-contrasenas.jpg");
        n10.setUrlExterna("https://example.com/phishing-interno-empresa");
        noticiaService.save(n10);

        // Noticia 11
        Noticia n11 = new Noticia();
        n11.setTitulo("Filtración de datos afecta a usuarios de una popular red social");
        n11.setDescripcion(
                "Un fallo en una API permitió la extracción masiva de perfiles, correos electrónicos y datos de contacto.");
        n11.setFechaPublicacion(LocalDateTime.of(2026, 2, 3, 0, 0));
        n11.setUrlImagen("/OIP (2).webp");
        n11.setUrlExterna("https://example.com/filtracion-red-social");
        noticiaService.save(n11);

        // Noticia 12
        Noticia n12 = new Noticia();
        n12.setTitulo("Ataque informático bloquea sistemas municipales durante horas");
        n12.setDescripcion(
                "Varios servicios públicos quedaron inaccesibles tras un ataque que afectó a la infraestructura digital del ayuntamiento.");
        n12.setFechaPublicacion(LocalDateTime.of(2026, 2, 2, 0, 0));
        n12.setUrlImagen("/OIP (3).webp");
        n12.setUrlExterna("https://example.com/ataque-sistemas-municipales");
        noticiaService.save(n12);

        // Noticia 13
        Noticia n13 = new Noticia();
        n13.setTitulo("Nuevo ransomware ataca hospitales europeos");
        n13.setDescripcion("Un grupo criminal ha paralizado sistemas hospitalarios exigiendo rescates millonarios.");
        n13.setFechaPublicacion(LocalDateTime.of(2026, 2, 8, 0, 0));
        n13.setUrlImagen("https://source.unsplash.com/800x600/?hospital,cybersecurity");
        n13.setUrlExterna("https://example.com/ransomware-hospitales");
        noticiaService.save(n13);

        // Noticia 14
        Noticia n14 = new Noticia();
        n14.setTitulo("Google corrige fallo crítico en Android");
        n14.setDescripcion("Una vulnerabilidad permitía a apps maliciosas acceder a datos privados sin permisos.");
        n14.setFechaPublicacion(LocalDateTime.of(2026, 2, 9, 0, 0));
        n14.setUrlImagen("https://source.unsplash.com/800x600/?android,security");
        n14.setUrlExterna("https://example.com/android-vulnerabilidad");
        noticiaService.save(n14);

        // Noticia 15
        Noticia n15 = new Noticia();
        n15.setTitulo("Hackeo a empresa fintech expone tarjetas bancarias");
        n15.setDescripcion("Miles de usuarios afectados tras una brecha en sistemas de pago.");
        n15.setFechaPublicacion(LocalDateTime.of(2026, 2, 10, 0, 0));
        n15.setUrlImagen("https://source.unsplash.com/800x600/?bank,hacker");
        n15.setUrlExterna("https://example.com/fintech-hack");
        noticiaService.save(n15);

        // Noticia 16
        Noticia n16 = new Noticia();
        n16.setTitulo("Ataques DDoS baten récord en 2026");
        n16.setDescripcion("El volumen de ataques distribuidos alcanza cifras históricas.");
        n16.setFechaPublicacion(LocalDateTime.of(2026, 2, 11, 0, 0));
        n16.setUrlImagen("https://source.unsplash.com/800x600/?server,attack");
        n16.setUrlExterna("https://example.com/ddos-record");
        noticiaService.save(n16);

        // Noticia 17
        Noticia n17 = new Noticia();
        n17.setTitulo("Microsoft alerta sobre nueva campaña de phishing");
        n17.setDescripcion("Correos falsos simulan ser soporte técnico para robar credenciales.");
        n17.setFechaPublicacion(LocalDateTime.of(2026, 2, 12, 0, 0));
        n17.setUrlImagen("https://source.unsplash.com/800x600/?phishing,email");
        n17.setUrlExterna("https://example.com/phishing-microsoft");
        noticiaService.save(n17);

        // Noticia 18
        Noticia n18 = new Noticia();
        n18.setTitulo("Malware roba criptomonedas desde wallets");
        n18.setDescripcion("Un troyano apunta a usuarios de criptodivisas.");
        n18.setFechaPublicacion(LocalDateTime.of(2026, 2, 13, 0, 0));
        n18.setUrlImagen("https://source.unsplash.com/800x600/?bitcoin,hack");
        n18.setUrlExterna("https://example.com/crypto-malware");
        noticiaService.save(n18);

        // Noticia 19
        Noticia n19 = new Noticia();
        n19.setTitulo("Hackers atacan videojuegos online");
        n19.setDescripcion("Servidores de juegos sufren intrusiones masivas.");
        n19.setFechaPublicacion(LocalDateTime.of(2026, 2, 14, 0, 0));
        n19.setUrlImagen("https://source.unsplash.com/800x600/?gaming,server");
        n19.setUrlExterna("https://example.com/gaming-hack");
        noticiaService.save(n19);

        // Noticia 20
        Noticia n20 = new Noticia();
        n20.setTitulo("Nueva estafa usa IA para clonar voces");
        n20.setDescripcion("Delincuentes suplantan identidad mediante audio generado.");
        n20.setFechaPublicacion(LocalDateTime.of(2026, 2, 15, 0, 0));
        n20.setUrlImagen("https://source.unsplash.com/800x600/?ai,voice");
        n20.setUrlExterna("https://example.com/ai-scam");
        noticiaService.save(n20);

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

    }

}
