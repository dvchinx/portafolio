import { useEffect, useRef, useState } from 'react';
import './Portfolio.css';
import ProfilePhoto from '../../../assets/Me/Yo.jpeg';
import TasksImage from '../../../assets/Images/Tasks.png';
import Pizzeria from '../../../assets/Images/Pizzeria.png';
import FractalImage from '../../../assets/Images/Fractal_Gallery.png';
import TrophyIcon from '../../../assets/SVGs/Trophy_Icon.svg';
import TrophyIcon2 from '../../../assets/SVGs/Trophy_Icon2.svg';
import WebIcon from '../../../assets/SVGs/Web_Icon.svg';
import AppIcon from '../../../assets/SVGs/App_Icon.svg';
import DeployIcon from '../../../assets/SVGs/Deploy_Icon.svg';

function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [certListHeight, setCertListHeight] = useState(null);
  const skillsLeftRef = useRef(null);
  const skillsRightHeaderRef = useRef(null);

  useEffect(() => {
    const projectShells = document.querySelectorAll('.project-story-shell');
    projectShells.forEach((shell) => shell.classList.add('project-visible'));

    if (!projectShells.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('project-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    projectShells.forEach((shell) => observer.observe(shell));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncCertListHeight = () => {
      if (!skillsLeftRef.current || !skillsRightHeaderRef.current) return;

      const leftHeight = skillsLeftRef.current.getBoundingClientRect().height;
      const headerHeight = skillsRightHeaderRef.current.getBoundingClientRect().height;
      const gapBetweenHeaderAndList = 24;
      const desktopHeight = Math.max(260, Math.floor(leftHeight - headerHeight - gapBetweenHeaderAndList));

      // On stacked layouts, keep a controlled viewport-bound area so certs are always scrollable.
      const isNarrowViewport = window.innerWidth <= 968;
      const viewportHeightCap = Math.max(260, Math.floor(window.innerHeight * 0.58));
      const nextHeight = isNarrowViewport
        ? Math.min(desktopHeight, viewportHeightCap)
        : desktopHeight;

      setCertListHeight(nextHeight);
    };

    syncCertListHeight();

    const resizeObserver = new ResizeObserver(syncCertListHeight);
    if (skillsLeftRef.current) resizeObserver.observe(skillsLeftRef.current);
    if (skillsRightHeaderRef.current) resizeObserver.observe(skillsRightHeaderRef.current);

    window.addEventListener('resize', syncCertListHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', syncCertListHeight);
    };
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    sections.forEach((section) => section.classList.add('reveal-visible'));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -12% 0px'
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const onScroll = () => {
      setShowBackToTop(window.scrollY > 560);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsNavOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Por favor completa todos los campos' 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Usando Web3Forms (servicio gratuito sin necesidad de registro previo)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '0747e6a8-4350-4ca8-b840-8aaf7effeb64',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to: 'jesus.florezch@gmail.com',
          subject: `Nuevo mensaje de ${formData.name} desde tu portafolio`
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: '¡Mensaje enviado exitosamente! Te contactaré pronto.' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Hubo un error al enviar el mensaje. Por favor inténtalo de nuevo.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillDomains = [
    {
      title: 'Backend Core',
      summary: 'Diseño de APIs seguras, robustas y listas para producción.',
      items: [
        {
          name: 'Java 17+ y Spring Boot',
          level: 'Avanzado',
          evidence: '3+ años implementando APIs REST, seguridad y lógica transaccional.'
        },
        {
          name: 'Seguridad OAuth2/JWT',
          level: 'Avanzado',
          evidence: 'Flujos de autenticación/autorización en suite empresarial pública.'
        },
        {
          name: 'Persistencia SQL',
          level: 'Avanzado',
          evidence: 'Diseño de modelo relacional, paginación y auditoría en MySQL.'
        }
      ]
    },
    {
      title: 'Arquitectura y Eventos',
      summary: 'Sistemas modulares orientados a escalabilidad por dominios.',
      items: [
        {
          name: 'Microservicios',
          level: 'Avanzado',
          evidence: 'Separación de responsabilidades y despliegue independiente por servicio.'
        },
        {
          name: 'Kafka + RabbitMQ',
          level: 'Avanzado',
          evidence: 'Mensajería asíncrona para eventos de negocio y procesamiento diferido.'
        },
        {
          name: 'Patrones de integración',
          level: 'Intermedio+',
          evidence: 'Orquestación entre APIs backend, procesos async e IA como servicio.'
        }
      ]
    },
    {
      title: 'Infraestructura y DevOps',
      summary: 'Operación confiable de servicios backend en entornos reales.',
      items: [
        {
          name: 'Docker y despliegues',
          level: 'Intermedio+',
          evidence: 'Despliegue de servicios en VPS Debian y entornos cloud.'
        },
        {
          name: 'AWS / Cloud',
          level: 'Intermedio',
          evidence: 'Experiencia práctica con EC2 y RDS para servicios productivos.'
        },
        {
          name: 'GitHub Flow + PR Reviews',
          level: 'Avanzado',
          evidence: 'Colaboración activa en repos open source y blog técnico semanal.'
        }
      ]
    },
    {
      title: 'Data y AI Integration',
      summary: 'Integración de capacidades IA al backend sin comprometer estabilidad.',
      items: [
        {
          name: 'Python / Flask',
          level: 'Intermedio+',
          evidence: 'Microservicios para tareas de IA y procesamiento especializado.'
        },
        {
          name: 'Spring AI / MaaS',
          level: 'Intermedio+',
          evidence: 'Consumo de modelos y selección según costo/beneficio de uso.'
        },
        {
          name: 'Rendimiento numérico',
          level: 'Intermedio',
          evidence: 'NumPy/Numba aplicados a generación de fractales y optimización.'
        }
      ]
    }
  ];

  const credentialsHighlights = [
    { value: '+30', label: 'Certificados técnicos' },
    { value: '+3 años', label: 'Experiencia backend' },
    { value: 'CCPL', label: 'Competidor 2024-2026' },
    { value: 'OSS', label: 'Contribuidor open source' }
  ];

  const certificatePlaceholders = Array.from({ length: 30 }, (_, index) => ({
    id: String(index + 1).padStart(2, '0'),
    title: `Certificación ${String(index + 1).padStart(2, '0')} · Nombre del programa`,
    institution: 'Institución y URL pendientes'
  }));

  const projectStories = [
    {
      id: 'suite-jflorez',
      title: 'JFlorez Suite Empresarial',
      subtitle: 'Plataforma gratuita con arquitectura distribuida',
      summary:
        'Suite modular orientada a productividad: autenticación robusta, mensajería asíncrona y servicios desacoplados para escalar por dominio.',
      tags: ['React', 'Spring Boot', 'Flask', 'Kafka', 'RabbitMQ', 'OAuth2', 'JWT', 'Docker', 'MySQL'],
      liveUrl: '/',
      repoUrl: 'https://github.com/dvchinx',
      preview: { src: TasksImage, alt: 'JFlorez Suite' },
      architecture: {
        nodes: ['Frontend React', 'API Gateway + OAuth2', 'Core Spring APIs', 'Kafka / RabbitMQ', 'Microservicio IA (Flask)'],
        links: [
          'React consume APIs seguras con JWT + refresh tokens',
          'Eventos de negocio se propagan por Kafka/RabbitMQ',
          'El servicio IA se orquesta por colas para tareas intensivas'
        ]
      },
      stackReasoning: [
        { tech: 'Spring Boot', reason: 'Seguridad madura, modularidad y despliegue predecible en producción.' },
        { tech: 'Kafka + RabbitMQ', reason: 'Combina streaming de eventos y colas confiables según caso de uso.' },
        { tech: 'React', reason: 'Interfaz ágil para dominios múltiples con buena mantenibilidad.' }
      ],
      metrics: [
        { label: 'Latencia API (p95)', value: '< 120ms', note: 'placeholder en medición continua' },
        { label: 'Uptime objetivo', value: '99.9%', note: 'baseline de arquitectura' },
        { label: 'Procesamiento asíncrono', value: '2K+ eventos/h', note: 'estimación bajo carga media' }
      ],
      tradeoffs: [
        'Elegí consistencia eventual en flujos asíncronos para ganar resiliencia.',
        'Separé IA en microservicio para escalar computación sin afectar APIs core.',
        'Aumenta complejidad operativa, pero mejora la evolución por dominios.'
      ]
    },
    {
      id: 'blog-personal',
      title: 'Blog Personal Colaborativo',
      subtitle: 'Publicaciones semanales y contribuciones vía PR',
      summary:
        'Blog técnico con flujo editorial continuo, enfoque en calidad de contenido y colaboración abierta mediante pull requests de la comunidad.',
      tags: ['GitHub', 'Pull Requests', 'Open Source', 'Contenido Técnico', 'CI/CD'],
      liveUrl: 'https://github.com/dvchinx',
      repoUrl: 'https://github.com/dvchinx',
      architecture: {
        nodes: ['Autor principal', 'Repositorio GitHub', 'Workflow CI', 'Review PRs', 'Publicación final'],
        links: [
          'Cada aporte entra por PR con validaciones automáticas.',
          'El contenido se revisa por calidad técnica y claridad pedagógica.',
          'La publicación se programa en cadencia semanal.'
        ]
      },
      stackReasoning: [
        { tech: 'GitHub Flow', reason: 'Trazabilidad y colaboración ordenada para múltiples contribuidores.' },
        { tech: 'PR Reviews', reason: 'Asegura consistencia editorial y rigor técnico antes de publicar.' },
        { tech: 'Automatización CI', reason: 'Reduce errores manuales en formato y checks de calidad.' }
      ],
      metrics: [
        { label: 'Frecuencia', value: '1 post/semana', note: 'cadencia editorial constante' },
        { label: 'Tiempo de review', value: '< 72h', note: 'objetivo para PRs de comunidad' },
        { label: 'Contribuciones externas', value: 'En crecimiento', note: 'indicador de comunidad activa' }
      ],
      tradeoffs: [
        'Abrir PRs incrementa revisión, pero eleva la calidad final del contenido.',
        'Priorizo claridad técnica sobre velocidad de publicación.',
        'La automatización reduce fricción para mantener la disciplina semanal.'
      ]
    },
    {
      id: 'pizzeria-api',
      title: 'Backend Monolítico para Pizzería',
      subtitle: 'Dominio transaccional con API robusta',
      summary:
        'API backend para gestión de clientes, pedidos y catálogo, con foco en integridad de datos, paginación y auditoría operativa.',
      tags: ['Java 17+', 'Spring Framework', 'Gradle', 'MySQL', 'REST API'],
      repoUrl: 'https://github.com/dvchinx/Pizzeria-API',
      preview: { src: Pizzeria, alt: 'Backend Pizzería' },
      architecture: {
        nodes: ['Cliente/Panel', 'Controladores REST', 'Servicios de dominio', 'Persistencia JPA', 'MySQL'],
        links: [
          'Las reglas de negocio viven en capa de servicios.',
          'La persistencia garantiza integridad relacional y consultas paginadas.',
          'La auditoría facilita trazabilidad operativa de órdenes.'
        ]
      },
      stackReasoning: [
        { tech: 'Monolito modular', reason: 'Permite entregar rápido sin sobrecosto operativo temprano.' },
        { tech: 'Spring + JPA', reason: 'Acelera CRUD y capas transaccionales con buenas prácticas.' },
        { tech: 'MySQL', reason: 'Modelo relacional sólido para entidades de negocio y reportes.' }
      ],
      metrics: [
        { label: 'Cobertura endpoints', value: '100% CRUD dominio', note: 'clientes, pizzas, órdenes' },
        { label: 'Latencia objetivo', value: '< 150ms', note: 'placeholder para p95 interno' },
        { label: 'Paginación', value: 'Activa', note: 'optimiza listados de órdenes' }
      ],
      tradeoffs: [
        'Monolito reduce complejidad inicial frente a microservicios.',
        'Escala verticalmente bien, con ruta clara a separación por bounded contexts.',
        'Centralizar auditoría simplifica soporte y observabilidad.'
      ]
    },
    {
      id: 'fractal-gallery',
      title: 'Galería y Generador de Fractales',
      subtitle: 'Pipeline numérico y visualización científica',
      summary:
        'Proyecto orientado a generación de fractales con parámetros ajustables, optimización numérica y salida gráfica para exploración visual.',
      tags: ['Python', 'Flask', 'NumPy', 'Numba', 'Matplotlib', 'Pillow'],
      repoUrl: 'https://github.com/dvchinx/Fractal-Gallery',
      preview: { src: FractalImage, alt: 'Fractal Gallery' },
      architecture: {
        nodes: ['CLI / UI', 'Motor fractal', 'Optimización Numba', 'Render Matplotlib', 'Exportación imagen'],
        links: [
          'La parametrización alimenta el motor matemático de generación.',
          'Numba acelera cálculos en iteraciones intensivas.',
          'El pipeline termina en exportación reutilizable para galería.'
        ]
      },
      stackReasoning: [
        { tech: 'NumPy + Numba', reason: 'Excelente costo-beneficio para cálculo de alto volumen.' },
        { tech: 'Flask', reason: 'Entrega rápida de endpoints para experimentar con generación remota.' },
        { tech: 'Matplotlib/Pillow', reason: 'Control fino del render y exportación de resultados.' }
      ],
      metrics: [
        { label: 'Resolución objetivo', value: '4K', note: 'placeholder para renders finales' },
        { label: 'Aceleración', value: '3x - 8x', note: 'estimación con Numba según fractal' },
        { label: 'Tiempo por render', value: '< 4s', note: 'escenario base en hardware medio' }
      ],
      tradeoffs: [
        'Mayor precisión matemática incrementa tiempo de render.',
        'Optimización prematura se evita hasta medir cuellos reales.',
        'Se prioriza reproducibilidad visual sobre efectos no deterministas.'
      ]
    }
  ];

  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="portfolio-nav">
        <div className="portfolio-nav-brand">
          <span className="brand-text">Portafolio</span>
        </div>
        <button
          type="button"
          className={`portfolio-nav-toggle ${isNavOpen ? 'open' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={isNavOpen}
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`portfolio-nav-links ${isNavOpen ? 'open' : ''}`}>
          <a 
            href="#home" 
            className={activeSection === 'home' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            Inicio
          </a>
          <a 
            href="#about" 
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
          >
            Sobre mí
          </a>
          <a 
            href="#skills" 
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}
          >
            Habilidades
          </a>
          <a 
            href="#projects" 
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
          >
            Proyectos
          </a>
          <a 
            href="#contact" 
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            Contacto
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="portfolio-hero reveal-section">
        {/* Animated background elements */}
        <div className="hero-bg-element hero-bg-1"></div>
        <div className="hero-bg-element hero-bg-2"></div>
        <div className="hero-bg-element hero-bg-3"></div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-greeting">Hola, soy <br />Jesús Flórez</h1>
            <h2 className="hero-title">Desarrollador Back-End</h2>
            <p className="hero-description">
              Creando soluciones back-end robustas, escalables y eficientes
              con pasión y precisión.
            </p>
            <div className="hero-badges">
              <span className="hero-badge">+3 años en backend</span>
              <span className="hero-badge">Competidor CCPL/ICPC</span>
              <span className="hero-badge">Java / Spring</span>
            </div>
            <div className="hero-actions">
              <a 
                href="mailto:jesus.florezch@gmail.com" 
                className="btn-hero-primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" strokeWidth="2"/>
                </svg>
                Contáctame
              </a>
              <a 
                href="https://github.com/dvchinx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-hero-secondary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
          
          <div className="hero-image-container">
            <div className="hero-image-glow"></div>
            <div className="hero-image">
              <img src={ProfilePhoto} alt="Jesús Flórez" className="profile-photo" />
            </div>
            
            {/* Floating tech icons */}
            <div className="floating-icon icon-1">
              <span>☕</span>
            </div>
            <div className="floating-icon icon-2">
              <span>🍃</span>
            </div>
            <div className="floating-icon icon-3">
              <span>🐳</span>
            </div>
            <div className="floating-icon icon-4">
              <span>🐍</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="portfolio-section reveal-section">
        <div className="section-content">
          
          <div className="about-container">
            <div className="about-left">
              <div className="about-timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                  <div className="timeline-icon-wrapper">
                    <img src={WebIcon} alt="Web Development" className="timeline-icon" />
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">Desarrollo Web de Endpoints y Seguridad</h3>
                    <p className="timeline-description">
                      Mediante Spring Framework y sus herramientas, expongo
                      de manera efectiva y segura endpoints consumibles por
                      parte del servidor bajo demanda del Front-End.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                  <div className="timeline-icon-wrapper">
                    <img src={AppIcon} alt="AI Development" className="timeline-icon" />
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">Consumo y Desarrollo de Modelos de IA</h3>
                    <p className="timeline-description">
                      Usando Spring AI, consumo los MaaS más óptimos para
                      satisfacer la necesidad o en su defecto, creo mi propio
                      modelo implementando Python como microservicio.
                    </p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-icon-wrapper">
                    <img src={DeployIcon} alt="Cloud Deployment" className="timeline-icon" />
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">Despliegue de Servicios en la Nube</h3>
                    <p className="timeline-description">
                      +1 año de experiencia consumiendo servicios de Cloud
                      tales como: AWS EC2, Amazon RDS y de VPS: Debian
                      con conexión por SSH y despliegue con Docker Compose.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-right">
              <h2 className="section-title">ACERCA DE MÍ</h2>
              <div className="about-intro">
                <p className="about-intro-text">
                  Llevo más de 3 años desarrollando software con Java
                  17+, Spring Framework y Python con Flask/FastAPI.
                </p>
                <p className="about-intro-text">
                  Mi pasión es la construcción de aplicaciones web que
                  resuelvan problemas complejos, me gusta retarme día
                  a día y aprender algo nuevo.
                </p>
                <p className="about-intro-text">
                  Actualmente estoy contribuyendo a proyectos de
                  código abierto (open-source) y participando
                  activamente en programación competitiva.
                </p>
              </div>
              <div className="about-achievements">
                <div className="achievement-item">
                  <img src={TrophyIcon} alt="Trophy Gold" />
                  <p className="achievement-text">Reto Back-End<br />Net&Dev 2025</p>
                </div>
                <div className="achievement-item">
                  <img src={TrophyIcon2} alt="Trophy Silver" />
                  <p className="achievement-text">2°do Puesto<br />CCPL R8 2025</p>
                </div>
              </div>
              <a href="#contact" className="btn-more">Ver más logros →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="portfolio-section reveal-section">
        <div className="section-content">
          <h2 className="section-title-two">Habilidades y Certificaciones</h2>
          <div className="skills-container">
            <div className="skills-left" ref={skillsLeftRef}>
              <h3 className="skills-subtitle">Capacidades Técnicas</h3>
              <p className="skills-summary-text">
                Stack backend orientado a producción, arquitectura distribuida y calidad de entrega.
              </p>

              <div className="skills-overview-grid">
                {credentialsHighlights.map((item) => (
                  <article key={item.label} className="skills-overview-card">
                    <p className="skills-overview-value">{item.value}</p>
                    <p className="skills-overview-label">{item.label}</p>
                  </article>
                ))}
              </div>

              <div className="skills-domain-grid">
                {skillDomains.map((domain) => (
                  <article key={domain.title} className="skills-domain-card">
                    <h4 className="skills-domain-title">{domain.title}</h4>
                    <p className="skills-domain-summary">{domain.summary}</p>

                    <div className="skills-evidence-list">
                      {domain.items.map((item) => (
                        <div key={item.name} className="skills-evidence-item">
                          <div className="skills-evidence-head">
                            <p className="skills-evidence-name">{item.name}</p>
                            <span className="skills-level-chip">{item.level}</span>
                          </div>
                          <p className="skills-evidence-text">{item.evidence}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="skills-right">
              <div className="skills-right-header" ref={skillsRightHeaderRef}>
                <h3 className="skills-subtitle">Estudios y Certificados</h3>
                <p className="skills-summary-text">
                  Lista preparada para tus 30 certificaciones. Puedes reemplazar cada placeholder
                  por el nombre real, institución y enlace del certificado.
                </p>
              </div>
              <div
                className="certifications-list"
                role="list"
                aria-label="Lista de certificaciones"
                style={
                  certListHeight !== null
                    ? { '--cert-list-height': `${certListHeight}px` }
                    : undefined
                }
              >
                {certificatePlaceholders.map((item) => (
                  <article key={item.id} className="certification-card certification-placeholder" role="listitem">
                    <div className="cert-placeholder-index">{item.id}</div>
                    <div className="cert-content">
                      <h4 className="cert-title">{item.title}</h4>
                      <p className="cert-institution">{item.institution}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="portfolio-section portfolio-projects-section reveal-section">
        <div className="section-content">
          <h2 className="section-title-two">MIS PROYECTOS</h2>
          <p className="projects-intro">
            Cada proyecto incluye un recorrido técnico: arquitectura, decisiones de stack,
            métricas de referencia y trade-offs de ingeniería. Desplázate en cada panel
            para explorar la narrativa completa.
          </p>

          <div className="project-story-list">
            {projectStories.map((project, index) => (
              <article key={project.id} className="project-story-shell">
                <div className="project-story-sticky">
                  <div className="project-story-meta">
                    <p className="project-rank">Proyecto {String(index + 1).padStart(2, '0')}</p>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                    <p className="project-summary">{project.summary}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={`${project.id}-${tag}`} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.liveUrl && (
                        <a href={project.liveUrl} className="project-link-btn" target="_blank" rel="noopener noreferrer">
                          Ver proyecto ↗
                        </a>
                      )}
                      {project.repoUrl && (
                        <a href={project.repoUrl} className="project-link-btn" target="_blank" rel="noopener noreferrer">
                          Ver repositorio ↗
                        </a>
                      )}
                    </div>
                    <div className="project-media-preview">
                      {project.preview ? (
                        <img src={project.preview.src} alt={project.preview.alt} className="project-preview-image" />
                      ) : (
                        <div className="project-preview-placeholder">
                          <span>Documentación visual en preparación</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="project-story-rail" aria-label={`Narrativa técnica de ${project.title}`}>
                    <section className="story-panel">
                      <p className="story-label">Arquitectura</p>
                      <h4 className="story-title">Diagrama funcional del sistema</h4>
                      <div className="story-diagram-grid">
                        {project.architecture.nodes.map((node) => (
                          <div key={`${project.id}-${node}`} className="diagram-node">{node}</div>
                        ))}
                      </div>
                      <ul className="story-bullets">
                        {project.architecture.links.map((line) => (
                          <li key={`${project.id}-${line}`}>{line}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="story-panel">
                      <p className="story-label">Stack</p>
                      <h4 className="story-title">Tecnologías y decisión de diseño</h4>
                      <div className="story-key-values">
                        {project.stackReasoning.map((item) => (
                          <div key={`${project.id}-${item.tech}`} className="story-key-row">
                            <p className="story-key">{item.tech}</p>
                            <p className="story-value">{item.reason}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="story-panel">
                      <p className="story-label">Métricas</p>
                      <h4 className="story-title">Indicadores placeholder de desempeño</h4>
                      <div className="metrics-grid">
                        {project.metrics.map((metric) => (
                          <article key={`${project.id}-${metric.label}`} className="metric-card">
                            <p className="metric-label">{metric.label}</p>
                            <p className="metric-value">{metric.value}</p>
                            <p className="metric-note">{metric.note}</p>
                          </article>
                        ))}
                      </div>
                    </section>

                    <section className="story-panel">
                      <p className="story-label">Trade-offs</p>
                      <h4 className="story-title">Retos reales y decisiones estratégicas</h4>
                      <ul className="story-bullets">
                        {project.tradeoffs.map((tradeoff) => (
                          <li key={`${project.id}-${tradeoff}`}>{tradeoff}</li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="portfolio-section contact-section reveal-section">
        <div className="section-content">
          <div className="contact-container">
            <div className="contact-left">
              <h2 className="contact-main-title">
                HAGAMOS
                <br />
                QUE
                <br />
                SUCEDA
              </h2>
              <p className="contact-subtitle">
                Transformo retos técnicos en productos sólidos, escalables y listos para producción.
              </p>
              <div className="contact-pill-list">
                <span className="contact-pill">Respuesta en menos de 24h</span>
                <span className="contact-pill">Arquitectura y consultoría técnica</span>
              </div>
            </div>
            <div className="contact-right">
              <h3 className="contact-form-heading">Trabajemos juntos</h3>
              <p className="contact-form-subheading">
                Cuéntame tu desafío y diseñemos una solución robusta con una ejecución profesional.
              </p>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-input" 
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Correo</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-input" 
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Mensaje</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    className="form-input form-textarea" 
                    placeholder="Tu mensaje aquí..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                {submitStatus.message && (
                  <div className={`form-message form-message-${submitStatus.type}`}>
                    {submitStatus.message}
                  </div>
                )}
                <button type="submit" className="form-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="portfolio-footer reveal-section">
        <div className="footer-content">
          <div className="footer-left">
            <h3 className="footer-name">
              Jesús Flórez
            </h3>
            <p className="footer-copyright">© Todos los derechos reservados.</p>
          </div>
          <div className="footer-right">
            <p className="footer-info">
              Sitio diseñado con Figma. Desarrollado con React.js y Spring Boot.
            </p>
            <div className="footer-socials">
              <a 
                href="https://github.com/dvchinx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/dvchinx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button
          type="button"
          className="back-to-top"
          aria-label="Volver arriba"
          onClick={() => scrollToSection('home')}
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default Portfolio;
