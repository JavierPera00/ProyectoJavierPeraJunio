package com.ProyectoJunio;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ProyectoJunio.model.Noticia;
import com.ProyectoJunio.model.Usuario;
import com.ProyectoJunio.servicio.NoticiaService;
import com.ProyectoJunio.servicio.UsuarioService;

@SpringBootApplication
public class ProyectoJunioApplication implements CommandLineRunner {

    @Autowired
    private NoticiaService noticiaService;
    
    @Autowired
    private UsuarioService usuarioService;

    public static void main(String[] args) {
        SpringApplication.run(ProyectoJunioApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
	
    	// Noticia 1
        Noticia n1 = new Noticia();
        n1.setTitulo("Notepad++ sufrió ataque dirigido de malware");
        n1.setDescripcion("El popular editor de código fue comprometido mediante su cadena de actualizaciones por atacantes vinculados a un grupo estatal.");
        n1.setFechaPublicacion(LocalDateTime.of(2026, 2, 6, 0, 0));
        n1.setUrlImagen("/notepad-plus-plus.jpg");
        n1.setUrlExterna("https://as.com/meristation/betech/notepad-fue-hackeado-durante-meses-y-se-sospecha-del-grupo-lotus-blossom-vinculado-a-intereses-chinos-f202602-n/");
        noticiaService.save(n1);

        // Noticia 2
        Noticia n2 = new Noticia();
        n2.setTitulo("Nueva vulnerabilidad en WinRAR explotada en ataques");
        n2.setDescripcion("Un fallo de seguridad en WinRAR está siendo utilizado activamente para ejecutar código malicioso; se recomienda actualizar.");
        n2.setFechaPublicacion(LocalDateTime.of(2026, 2, 5, 0, 0));
        n2.setUrlImagen("/OIP.webp");
        n2.setUrlExterna("https://www.techradar.com/pro/security/dangerous-new-malware-exploits-winrar-flaw-heres-what-we-know");
        noticiaService.save(n2);

        // Noticia 3
        Noticia n3 = new Noticia();
        n3.setTitulo("Nuevo malware Android usa repositorios populares");
        n3.setDescripcion("Se ha detectado malware que otorga acceso remoto completo a dispositivos Android disfrazado de app de seguridad.");
        n3.setFechaPublicacion(LocalDateTime.of(2026, 2, 3, 0, 0));
        n3.setUrlImagen("/intro-1657051170.jpg");
        n3.setUrlExterna("https://www.tomsguide.com/computing/malware-adware/hugging-face-ai-platform-used-to-deliver-android-malware-via-fake-apps-dont-fall-for-this");
        noticiaService.save(n3);

        // Noticia 4
        Noticia n4 = new Noticia();
        n4.setTitulo("AI impulsa crecimiento de phishing y ataques avanzados");
        n4.setDescripcion("Según informes, los ataques de phishing asistidos por IA aumentaron fuertemente en 2025, creando campañas más personalizadas.");
        n4.setFechaPublicacion(LocalDateTime.of(2026, 2, 1, 0, 0));
        n4.setUrlImagen("/Phishing-concept-pic.webp");
        n4.setUrlExterna("https://newsletter.7secure.eu/ai-driven-phishing-cloud-misconfigurations-and-state-backed-campaigns-shape-2026-threat-landscape/");
        noticiaService.save(n4);

        // Noticia 5
        Noticia n5 = new Noticia();
        n5.setTitulo("Hacienda investiga posible hackeo que compromete datos fiscales");
        n5.setDescripcion("El Ministerio de Hacienda investiga una posible brecha que podría haber expuesto datos bancarios y fiscales de millones.");
        n5.setFechaPublicacion(LocalDateTime.of(2026, 2, 2, 0, 0));
        n5.setUrlImagen("/Agencia_tributaria_espanola.jpeg");
        n5.setUrlExterna("https://elpais.com/economia/2026-02-02/hacienda-investiga-un-posible-hackeo-que-compromete-datos-personales-bancarios-y-fiscales-de-ciudadanos.html");
        noticiaService.save(n5);

        // Noticia 6
        Noticia n6 = new Noticia();
        n6.setTitulo("Top 10 Cibersecurity News de la semana");
        n6.setDescripcion("Resumen semanal con ataques ransomware, brechas de datos y extensiones maliciosas detectadas recientemente.");
        n6.setFechaPublicacion(LocalDateTime.of(2026, 1, 26, 0, 0));
        n6.setUrlImagen("/2540892.jpg");
        n6.setUrlExterna("https://innovatecybersecurity.com/security-threat-advisory/top-10-cybersecurity-news-jan-26-2026-apac-energy-firm-hit-by-dire-wolf-ransomware-ai-led-espionage-campaign-uses-autonomous-agents-pwn2own-automotive-2026-uncovers-76-zero-day-flaws-and-more/");
        noticiaService.save(n6);
        
     // --- Crear usuarios ---
        Usuario u1 = new Usuario();
        u1.setUsername("juan123");
        u1.setEmail("juan123@gmail.com");
        u1.setPassword("password1");
        u1.setActivo(true);
        usuarioService.save(u1);

        Usuario u2 = new Usuario();
        u2.setUsername("maria456");
        u2.setEmail("maria456@gmail.com");
        u2.setPassword("password2");
        u2.setActivo(true);
        usuarioService.save(u2);

        Usuario u3 = new Usuario();
        u3.setUsername("carlos789");
        u3.setEmail("carlos789@gmail.com");
        u3.setPassword("password3");
        u3.setActivo(true);
        usuarioService.save(u3);

        Usuario u4 = new Usuario();
        u4.setUsername("ana321");
        u4.setEmail("ana321@gmail.com");
        u4.setPassword("password4");
        u4.setActivo(true);
        usuarioService.save(u4);

        Usuario u5 = new Usuario();
        u5.setUsername("luis654");
        u5.setEmail("luis654@gmail.com");
        u5.setPassword("password5");
        u5.setActivo(true);
        usuarioService.save(u5);

        Usuario u6 = new Usuario();
        u6.setUsername("sofia987");
        u6.setEmail("sofia987@gmail.com");
        u6.setPassword("password6");
        u6.setActivo(true);
        usuarioService.save(u6);

        Usuario u7 = new Usuario();
        u7.setUsername("miguel111");
        u7.setEmail("miguel111@gmail.com");
        u7.setPassword("password7");
        u7.setActivo(true);
        usuarioService.save(u7);

        Usuario u8 = new Usuario();
        u8.setUsername("laura222");
        u8.setEmail("laura222@gmail.com");
        u8.setPassword("password8");
        u8.setActivo(true);
        usuarioService.save(u8);

        Usuario u9 = new Usuario();
        u9.setUsername("pedro333");
        u9.setEmail("pedro333@gmail.com");
        u9.setPassword("password9");
        u9.setActivo(true);
        usuarioService.save(u9);

        Usuario u10 = new Usuario();
        u10.setUsername("carla444");
        u10.setEmail("carla444@gmail.com");
        u10.setPassword("password10");
        u10.setActivo(true);
        usuarioService.save(u10);
	}

}
