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
    closeImage: "Cerrar imagen",
    playArcadeGame: "Jugar Juego Arcade",
    viewPresentation: "Ver presentación"
  },
  footer: {
    disclaimer: "© 2025 Ezequiel Garibotto.",
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
    english_ats: "CV en Inglés (ATS)",
    preview: "Visualizar CV",
    unableToDisplay: "No se puede mostrar el archivo PDF.",
    downloadInstead: "Descargar en su lugar",
    lastUpdated: "Última actualización"
  },
  search: {
    placeholder: "Buscar proyectos por título, descripción o tecnología...",
    clearFilters: "Limpiar filtros",
    noResults: "No se encontraron proyectos que coincidan con tus criterios",
    showingAll: "Mostrando todos los {count} proyectos",
    showingLimited: "Mostrando {count} proyectos de {total}",
    showingFiltered: "Mostrando {filtered} de {total} proyectos",
    filtered: "(filtrado)",
    tryAdjusting: "Intenta ajustar tus criterios de búsqueda o eliminar algunos filtros.",
    showAllLink: "Ver todos los proyectos",
    showLessLink: "Ver menos"
  },
  projects: {
    title: "Proyectos",
    current: "presente",
    neutralNews: {
      title: "Neutral News",
      description: "Aplicación en desarrollo que recopila noticias de múltiples medios de comunicación españoles, las agrupa por temática y genera una versión neutral de los acontecimientos. El objetivo es combatir el sesgo mediático mediante la combinación de algoritmos y técnicas avanzadas de inteligencia artificial.",
      footer: "Académico en continuidad",
      startDate: "diciembre 2024"
    },
    eulix: {
      title: "Eulix",
      description: "Desarrollo Android de una aplicación con el objetivo de recomendar contenidos (películas, series) basándose en la personalidad, estado de ánimo y preferencias del usuario.",
      footer: "Prácticas formativas",
      startDate: "octubre 2024",
      endDate: "abril 2025"
    },
    competitiveProgramming: {
      title: "Programación Competitiva",
      description: "Participación en concursos de programación competitiva en equipos, representando al instituto, quedando cuartos en el cuncurso nacional. Problemas resueltos en JO-EL y AceptaElReto para el concurso ProgramaMe 2024.",
      footer: "Optativo Académico",
      startDate: "septiembre 2023"
    },
    rickAndMorty: {
      title: "Lista API Eficiente",
      description: "La típica API list, pero hecha en Android con Java8, DataBinding, Caché, Paginación, arquitectura tipo SDK, tiempos de respuesta rápidos y un seguimiento de eficiencia simple.",
      footer: "Proyecto de Aprendizaje",
      startDate: "abril 2025",
      endDate: "abril 2025"
    },
    zomb: {
      title: "Zomb - Juego Retro",
      description: "Juego retro de desplazamiento horizontal infinito desarrollado con Makecode Arcade. Incluye sistema de colisiones, enemigos que siguen al jugador, y mecánicas de supervivencia en un entorno zombie.",
      footer: "Proyecto de Aprendizaje",
      startDate: "noviembre 2024",
      endDate: "diciembre 2024"
    },
    cronScheduleEditor: {
      title: "Editor de Programación CRON",
      description: "Editor visual e intuitivo para crear y gestionar expresiones cron. Herramienta web que permite construir programaciones cron sin necesidad de memorizar la sintaxis, desarrollada para mejorar mi comprensión de useEffect.",
      footer: "Proyecto de Aprendizaje",
      startDate: "enero 2025",
      endDate: "enero 2025"
    },
    portfolioWebsite: {
      title: "Sitio Web Portfolio",
      description: "Sitio web portfolio personal moderno construido con React, Next.js y TypeScript. Incluye diseño responsivo, cambio de tema, soporte multi-idioma y muestra proyectos y experiencia profesional.",
      footer: "Proyecto de Aprendizaje",
      startDate: "abril 2025",
      endDate: "julio 2025"
    },
    mapsApp: {
      title: "Aplicación CRUD de Mapas",
      description: "Aplicación Android completa con operaciones CRUD para marcadores de mapas. Incluye sistema de registro, login y almacenamiento de datos de usuario (nombre, foto de perfil, fotos capturadas) en Firebase Database.",
      footer: "Proyecto Académico",
      startDate: "marzo 2024",
      endDate: "junio 2024"
    },
    peleaDeGallos: {
      title: "Pelea De Gallos",
      description: "Comunicación cliente-servidor con Ktor, procesamiento de archivos, acceso a datos.",
      footer: "Proyecto Académico",
      startDate: "mayo 2024",
      endDate: "mayo 2024"
    },
    hackerNewsAPI: {
      title: "API Scraper HackerNews",
      description: "Web scraper Python FastAPI que obtiene artículos de noticias de Hacker News con estrategia de caché inteligente. Incluye containerización Docker, desarrollo dirigido por pruebas y procesamiento eficiente de datos.",
      footer: "Proyecto de Aprendizaje",
      startDate: "junio 2025",
      endDate: "junio 2025"
    },
    barcelonaInequality: {
      title: "Análisis de Desigualdad en Barrios de Barcelona",
      description: "Proyecto de Machine Learning analizando patrones de desigualdad en los barrios de Barcelona usando Python. Procesamiento de datos, algoritmos de clasificación y análisis estadístico para identificar disparidades socioeconómicas. Proyecto final del curso de Python Machine Learning cubriendo preprocesamiento de datos, técnicas de IA y visualización.",
      footer: "Proyecto Académico",
      startDate: "marzo 2025",
      endDate: "marzo 2025"
    },
    showAllProjects: "Mostrar todos los proyectos",
    showLess: "Mostrar menos"
  },
  experiences: {
    title: "Experiencia profesional",
    eulix: {
      company: "Eulix",
      position: "Desarrollador Junior de Android",
      period: "octubre 2024 - abril 2025 (7 meses)",
      description: "Desarrollo de una aplicación con el objetivo de recomendar contenidos (pelis, series), basándose en la personalidad, estado de ánimo y preferencias del usuario.\n"+
                  "— Desarrollo del Chatbot (Asistente Virtual), Onboarding, sección How It Works.\n"+
                  "— Diseño y mejoras en la UI y UX, con LiveData, DataBinding y layout XML. Generación de ideas y búsqueda de una constante mejora.\n"+
                  "— Consumo de API RESTful con Retrofit en colaboración con el back-end.\n"+
                  "— Coordinación con un equipo internacional en India.",
      location: "España · Híbrido",
    },
    telus: {
      company: "TELUS Digital",
      position: "Analista de Datos/Mapas en línea",
      period: "julio 2023 - enero 2025 (1 año 7 meses)",
      description: "Clasificar, evaluar, describir y ordenar búsquedas (queries), audio, video, imágenes y datos de todo tipo, usando un inglés profesional, cultura general y competencia digital.",
      location: "España · Totalmente Remoto",
    },
  },
  training: {
    title: "Formación académica",
    itb: {
      institution: "Institut Tecnològic de Barcelona (ITB)",
      course: "Desarrollo de Aplicaciones Multiplataforma - Sistemas Inteligentes (DAMi)",
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
      period: "2021 - 2022 (formación académica interrumpida)",
      location: "Barcelona, España",
      description: "Grado en ingeniería en sistemas audiovisuales con enfoque en fundamentos teóricos y prácticos de la informática, incluyendo programación, algoritmos y estructuras de datos.",
    },
    rb4: {
      institution: "Ramón Berenguer IV (RB4)",
      course: "Bachillerato Tecnológico",
      period: "2019 - 2021",
      location: "Santa Coloma de Gramenet, España",
      description: "Bachillerato con enfoque en ciencias y tecnología, preparando para estudios superiores en ingeniería y desarrollo de software.",
    }
  },
};