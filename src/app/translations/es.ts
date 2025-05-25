import { baseTranslations, Translations } from './baseTranslations';

/**
 * Spanish translations
 */
export const es: Translations = {
  ...baseTranslations,
  meta: {
    title: "Ezequiel Garibotto - Portfolio",
    description: "Desarrollador de software con experiencia en desarrollo móvil, web y servicios cloud."
  },
  navigation: {
    profile: "Perfil",
    projects: "Proyectos",
    experience: "Experiencia",
    training: "Formación"
  },
  tooltips: {
    github: "Visita mi perfil de GitHub",
    linkedin: "Conecta conmigo en LinkedIn",
    email: "Copiar email",
    emailCopied: "✓ ¡Copiado!",
    competition: "Ver detalles de la competición",
    solvedProblems: "Ver problemas resueltos", // For competitive programming source code
    playGame: "Jugar al juego",
    playStore: "Descargar en la Play Store",
    sourceCode: "Ver código fuente",
    logo: "Visita mi perfil de GitHub",
    expandImage: "Ampliar imagen",
    closeImage: "Cerrar imagen"
  },
  footer: {
    disclaimer: "© 2025 Ezequiel Garibotto. Todos los derechos reservados.",
    githubLink: "GitHub repo"
  },
  aboutMe: {
    title: "Ezequiel Garibotto",
    description: "Desarrollador de aplicaciones multiplataforma | Desarrollador de software Junior",
    photoAlt: "Foto de Ezequiel Garibotto"
  },
  cv: {
    download: "Descargar CV",
    spanish: "CV en Español",
    english: "CV en Inglés",
    preview: "Visualizar CV",
    unableToDisplay: "No se puede mostrar el archivo PDF.",
    downloadInstead: "Descargar en su lugar"
  },
  projects: {
    title: "Proyectos",
    current: "Presente",
    neutralNews: {
      title: "Neutral News",
      description: "Aplicación en desarrollo que recopila noticias de múltiples medios de comunicación españoles, las agrupa por temática y genera una versión neutral de los acontecimientos. El objetivo es combatir el sesgo mediático mediante la combinación de algoritmos y técnicas avanzadas de inteligencia artificial.",
      footer: "Académico en continuidad",
      startDate: "Dic 2024"
    },
    eulix: {
      title: "Eulix",
      description: "Desarrollo Android de una aplicación con el objetivo de recomendar contenidos (películas, series) basándose en la personalidad, estado de ánimo y preferencias del usuario.",
      footer: "Prácticas formativas",
      startDate: "Oct 2024",
      endDate: "Abr 2025"
    },
    competitiveProgramming: {
      title: "Programación Competitiva",
      description: "Participación en concursos de programación competitiva en equipos, representando al instituto, quedando cuartos en el cuncurso nacional. Problemas resueltos en JO-EL y AceptaElReto para el concurso ProgramaMe 2024.",
      footer: "Optativo Académico",
      startDate: "Sep 2023"
    },
    rickAndMorty: {
      title: "API list eficiente",
      description: "La típica API list, pero hecha en Android con Java8, DataBinding, Caché, Paginación, arquitectura tipo SDK, tiempos de respuesta rápidos y un seguimiento de eficiencia simple.",
      footer: "Entrevista técnica",
      startDate: "Abr 2025",
      endDate: "Abr 2025"
    }
  },
  experiences: {
    title: "Experiencia Profesional",
    eulix: {
      company: "Eulix",
      position: "Desarrollador Junior de Android",
      period: "Octubre 2024 - Abril 2025",
      description: "Desarrollo Android de una aplicación con el objetivo de recomendar contenidos (películas, series), basándose en la personalidad, estado de ánimo y preferencias del usuario.\n"+
                  "— Desarrollo del Asistente Virtual, Onboarding, sección 'Cómo Funciona'.\n"+
                  "— Diseño y mejoras en la interfaz gráfica (XML) y en la experiencia de usuario, generación de ideas y búsqueda de una constante mejora.\n"+
                  "— Integración de llamadas de la API (Swagger) en colaboración con el equipo de back-end.\n"+
                  "— Coordinación de la versión iOS con un equipo internacional en India.",
      location: "España · Híbrido",
    },
    telus: {
      company: "TELUS Digital",
      position: "Analista de Datos/Mapas en Línea",
      period: "Julio 2023 - Enero 2025",
      description: "Clasificar, evaluar, describir y ordenar búsquedas (queries), audio, video, imágenes y datos de todo tipo, usando un inglés profesional, cultura general y competencia digital.",
      location: "España · Totalmente Remoto",
    },
  },
  training: {
    title: "Formación Académica",
    itb: {
      institution: "Institut Tecnològic de Barcelona (ITB)",
      course: "Desarrollo de Aplicaciones Multiplataforma (DAM)",
      period: "2023 - 2025",
      location: "Nou Barris, Barcelona, España",
      description: "Grado superior de desarrollo de aplicaciones móviles y web, con énfasis en tecnologías modernas y metodología Agile y Scrum.\n\n" +
        "— Kotlin, Jetpack Compose / XML, Retrofit, para desarrollo Android\n" +
        "— Machine Learning, Web Scraping, Sentiment Analysis, Algoritmos de Clasificación, Decisión y Predicción\n" +
        "— Gestión de bases de datos SQL y NoSQL como PostgreSQL, MongoDB y Firebase\n" +
        "— Comunicaciones cliente-servidor con Ktor, lectura de ficheros, acceso a datos\n" +
        "— Participación en concursos de programación competitiva, usando Java y Kotlin\n\n" +
        "Nota: 9.01",
    },
    upf: {
      institution: "Universitat Pompeu Fabra (UPF)",
      course: "Ingeniería en Sistemas Audiovisuales",
      period: "2021 - 2022 (estudios abandonados)",
      location: "Barcelona, España",
      description: "Grado en ingeniería en sistemas audiovisuales con enfoque en fundamentos teóricos y prácticos de la informática, incluyendo programación, algoritmos y estructuras de datos.",
    },
    rb4: {
      institution: "Ramón Berenguer IV (RB4)",
      course: "Bachillerato Tecnológico",
      period: "2019-2021",
      location: "Santa Coloma de Gramenet, España",
      description: "Bachillerato con enfoque en ciencias y tecnología, preparando para estudios superiores en ingeniería y desarrollo de software.",
    }
  },
  dates: {
    jan2023: "Ene 2023",
    feb2023: "Feb 2023",
    mar2023: "Mar 2023",
    apr2023: "Abr 2023",
    may2023: "May 2023",
    jun2023: "Jun 2023",
    jul2023: "Jul 2023",
    aug2023: "Ago 2023",
    sep2023: "Sep 2023",
    oct2023: "Oct 2023",
    nov2023: "Nov 2023",
    dec2023: "Dic 2023",
    jan2024: "Ene 2024",
    feb2024: "Feb 2024",
    mar2024: "Mar 2024",
    apr2024: "Abr 2024",
    may2024: "May 2024",
    jun2024: "Jun 2024",
    jul2024: "Jul 2024",
    aug2024: "Ago 2024",
    sep2024: "Sep 2024",
    oct2024: "Oct 2024",
    nov2024: "Nov 2024",
    dec2024: "Dic 2024",
    jan2025: "Ene 2025",
    feb2025: "Feb 2025",
    mar2025: "Mar 2025",
    apr2025: "Abr 2025",
    may2025: "May 2025",
    jun2025: "Jun 2025",
    jul2025: "Jul 2025",
    aug2025: "Ago 2025",
    sep2025: "Sep 2025",
    oct2025: "Oct 2025",
    nov2025: "Nov 2025",
    dec2025: "Dic 2025"
  },
};