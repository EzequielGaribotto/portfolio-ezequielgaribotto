// Define base structure for type safety
export const baseTranslations = {
  // Footer translations
  footer: {
    disclaimer: "",
    githubLink: ""
  },
  // About Me section translations
  aboutMe: {
    title: "",
    description: "",
    photoAlt: ""
  },
  // Experience section translations
  experience: {
    title: "",
    positions: [] as Array<{
      company: string,
      role: string,
      period: string,
      location: string,
      type: string,
      description: string,
      responsibilities: string[]
    }>
  },
  // Projects section translations
  projects: {
    title: "",
    myprojects: "",
    viewAll: "",
    current: ""
  },
  // Contact section translations
  contact: {
    title: "",
    name: "",
    email: "",
    message: "",
    submit: "",
    success: "",
    error: ""
  },
  // Metadata translations
  meta: {
    title: "",
    description: ""
  },
  // Dates translations
  dates: {} as Record<string, string>,
  projectTitles: {} as Record<string, string>,
  projectDescriptions: {} as Record<string, string>,
  experiences: {} as Record<string, { company: string; position: string; description: string; location: string; technologies: string[] }>,
};

/**
 * English translations
 */
export const en = {
  ...baseTranslations,
  footer: {
    disclaimer: "© 2025 Ezequiel Garibotto. All rights reserved.",
    githubLink: "View on GitHub"
  },
  aboutMe: {
    title: "Ezequiel Garibotto",
    description: "Software developer with experience in mobile and web development. Inspired by the challenge.",
    photoAlt: "Photo of Ezequiel Garibotto"
  },
  experience: {
    title: "Work Experience",
    positions: [
      {
        company: "Eulix",
        role: "Junior Android Developer",
        period: "October 2024 - April 2025",
        location: "Spain",
        type: "Hybrid",
        description: "Developed an Android application aimed at recommending content (movies, series) based on user personality, mood, and preferences.",
        responsibilities: [
          "Implemented Virtual Assistant, Onboarding, and 'How It Works' section",
          "Designed and improved UI (XML) and user experience, generating ideas and seeking constant improvement",
          "Integrated API calls (Swagger) in collaboration with back-end team",
          "Coordinated iOS version development with an international team in India"
        ]
      }
    ]
  },
  projects: {
    title: "My Projects",
    myprojects: "Projects",
    viewAll: "View All",
    current: "PRESENT"
  },
  contact: {
    title: "Contact Me",
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Submit",
    success: "Message sent! I'll get back to you soon.",
    error: "Something went wrong. Please try again."
  },
  meta: {
    title: "Ezequiel Garibotto | Software Developer",
    description: "Portfolio of Ezequiel Garibotto, Software developer specialized in Android applications."
  },
  dates: {
    jan2023: "JAN 2023",
    feb2023: "FEB 2023",
    mar2023: "MAR 2023",
    apr2023: "APR 2023",
    may2023: "MAY 2023",
    jun2023: "JUN 2023",
    jul2023: "JUL 2023",
    aug2023: "AUG 2023",
    sep2023: "SEP 2023",
    oct2023: "OCT 2023",
    nov2023: "NOV 2023",
    dec2023: "DEC 2023",
    jan2024: "JAN 2024",
    feb2024: "FEB 2024",
    mar2024: "MAR 2024",
    apr2024: "APR 2024",
    may2024: "MAY 2024",
    jun2024: "JUN 2024",
    jul2024: "JUL 2024",
    aug2024: "AUG 2024",
    sep2024: "SEP 2024",
    oct2024: "OCT 2024",
    nov2024: "NOV 2024",
    dec2024: "DEC 2024",
    jan2025: "JAN 2025",
    feb2025: "FEB 2025",
    mar2025: "MAR 2025",
    apr2025: "APR 2025",
    may2025: "MAY 2025",
    jun2025: "JUN 2025",
    jul2025: "JUL 2025",
    aug2025: "AUG 2025",
    sep2025: "SEP 2025",
    oct2025: "OCT 2025",
    nov2025: "NOV 2025",
    dec2025: "DEC 2025"
  },
  projectTitles: {
    "m04-adivina-numero-secreto": "Guess the Secret Number",
    "m04-play-html-css": "Play with HTML & CSS",
    "m08-p4-maps-app": "Maps App",
    "trivial-app-jetpack-compose": "Trivial App",
    "zomb": "Zomb Game",
    "competitive-programming": "Competitive Programming",
    "neutral-news": "Neutral News",
    "eulix": "Eulix App"
  },
  projectDescriptions: {
    "m04-adivina-numero-secreto": "'Guess the secret number' - A basic HTML, CSS, and JavaScript project.",
    "m04-play-html-css": "A very basic HTML & CSS project with simple design and animations.",
    "m08-p4-maps-app": "CRUD app for map markers with Firebase integration for user data and photos.",
    "trivial-app-jetpack-compose": "A trivia app with customizable game settings like difficulty, themes, and categories.",
    "zomb": "Infinite horizontal scroller retro game with enemies, collisions, and more.",
    "competitive-programming": "Solved problems on JO-EL and AceptaElReto to prepare for the ProgramaMe 2024 contest.",
    "neutral-news": "A news aggregation app that provides unbiased and neutral news summaries.",
    "eulix": "Android development of an app designed to recommend content (movies, series) based on user personality, mood, and preferences."
  },
  experiences: {
    eulix: {
      company: "Eulix",
      position: "Junior Android Developer",
      description: "Developed an Android application aimed at recommending content (movies, series) based on user personality, mood, and preferences.\n— Developed the Virtual Assistant, Onboarding, and 'How It Works' section.\n— Designed and improved UI (XML) and user experience, generating ideas and seeking constant improvement.\n— Integrated API calls (Swagger) in collaboration with the back-end team.\n— Coordinated the iOS version with an international team in India.",
      location: "Spain · Hybrid",
      technologies: ["Gradle", "Android", "XML", "API Integration", "Swagger"], // Ensure this is an array
    },
    telus: {
      company: "TELUS Digital",
      position: "Online Data/Maps Analyst",
      description: "Classified, evaluated, and organized searches (queries), audio, video, images, and data of all kinds using professional English, general culture, and digital competence.",
      location: "Remote · Fully Remote",
      technologies: [
        "English",
        "JSON",
        "Data Analysis",
        "Data Classification",
        "Digital Competence",
      ], // Ensure this is an array
    },
  },
};

/**
 * Spanish translations
 */
export const es = {
  ...baseTranslations,
  footer: {
    disclaimer: "© 2025 Ezequiel Garibotto. Todos los derechos reservados.",
    githubLink: "Ver en GitHub"
  },
  aboutMe: {
    title: "Ezequiel Garibotto",
    description: "Desarrollador de software con experiencia en desarrollo móvil y web. Inspirado por el desafío.",
    photoAlt: "Foto de Ezequiel Garibotto"
  },
  experience: {
    title: "Experiencia Laboral",
    positions: [
      {
        company: "Eulix",
        role: "Desarrollador Junior de Android",
        period: "Octubre 2024 - Abril 2025",
        location: "España",
        type: "Híbrido",
        description: "Desarrollo Android de una aplicación con el objetivo de recomendar contenidos (películas, series), basándose en la personalidad, estado de ánimo y preferencias del usuario.",
        responsibilities: [
          "Desarrollo del Asistente Virtual, Onboarding, sección How It Works",
          "Diseño y mejoras en la interfaz gráfica (XML) y en la experiencia de usuario, generación de ideas y búsqueda de una constante mejora",
          "Integración de llamadas de la API (Swagger) en colaboración con el back-end",
          "Coordinación de la versión iOS con un equipo internacional en India"
        ]
      }
    ]
  },
  projects: {
    title: "Mis Proyectos",
    myprojects: "Proyectos",
    viewAll: "Ver Todos",
    current: "ACTUAL"
  },
  contact: {
    title: "Contáctame",
    name: "Nombre",
    email: "Correo Electrónico",
    message: "Mensaje",
    submit: "Enviar",
    success: "¡Mensaje enviado! Me pondré en contacto contigo pronto.",
    error: "Algo salió mal. Por favor, inténtalo de nuevo."
  },
  meta: {
    title: "Ezequiel Garibotto | Desarrollador de Software",
    description: "Portfolio de Ezequiel Garibotto, Desarrollador de Software especializado en aplicaciones Android."
  },
  dates: {
    jan2023: "ENE 2023",
    feb2023: "FEB 2023",
    mar2023: "MAR 2023",
    apr2023: "ABR 2023",
    may2023: "MAY 2023",
    jun2023: "JUN 2023",
    jul2023: "JUL 2023",
    aug2023: "AGO 2023",
    sep2023: "SEP 2023",
    oct2023: "OCT 2023",
    nov2023: "NOV 2023",
    dec2023: "DIC 2023",
    jan2024: "ENE 2024",
    feb2024: "FEB 2024",
    mar2024: "MAR 2024",
    apr2024: "ABR 2024",
    may2024: "MAY 2024",
    jun2024: "JUN 2024",
    jul2024: "JUL 2024",
    aug2024: "AGO 2024",
    sep2024: "SEP 2024",
    oct2024: "OCT 2024",
    nov2024: "NOV 2024",
    dec2024: "DIC 2024",
    jan2025: "ENE 2025",
    feb2025: "FEB 2025",
    mar2025: "MAR 2025",
    apr2025: "ABR 2025",
    may2025: "MAY 2025",
    jun2025: "JUN 2025",
    jul2025: "JUL 2025",
    aug2025: "AGO 2025",
    sep2025: "SEP 2025",
    oct2025: "OCT 2025",
    nov2025: "NOV 2025",
    dec2025: "DIC 2025"
  },
  projectTitles: {
    "m04-adivina-numero-secreto": "Adivina el Número Secreto",
    "m04-play-html-css": "Juega con HTML y CSS",
    "m08-p4-maps-app": "Aplicación de Mapas",
    "trivial-app-jetpack-compose": "Aplicación de Trivial",
    "zomb": "Juego Zomb",
    "competitive-programming": "Programación Competitiva",
    "neutral-news": "Noticias Neutrales",
    "eulix": "Aplicación Eulix"
  },
  projectDescriptions: {
    "m04-adivina-numero-secreto": "'Adivina el número secreto' - Un proyecto básico de HTML, CSS y JavaScript.",
    "m04-play-html-css": "Un proyecto muy básico de HTML y CSS con diseño simple y animaciones.",
    "m08-p4-maps-app": "Aplicación CRUD para marcadores de mapas con integración de Firebase.",
    "trivial-app-jetpack-compose": "Una aplicación de trivial con configuraciones personalizables.",
    "zomb": "Juego retro de desplazamiento horizontal infinito con enemigos y colisiones.",
    "competitive-programming": "Problemas resueltos en JO-EL y AceptaElReto para el concurso ProgramaMe 2024.",
    "neutral-news": "Una aplicación de noticias que proporciona resúmenes imparciales y neutrales.",
    "eulix": "Desarrollo Android de una aplicación con el objetivo de recomendar contenidos (películas, series) basándose en la personalidad, estado de ánimo y preferencias del usuario."
  },
  experiences: {
    eulix: {
      company: "Eulix",
      position: "Desarrollador Junior de Android",
      description: "Desarrollo Android de una aplicación con el objetivo de recomendar contenidos (películas, series), basándose en la personalidad, estado de ánimo y preferencias del usuario.\n— Desarrollo del Asistente Virtual, Onboarding, sección 'Cómo Funciona'.\n— Diseño y mejoras en la interfaz gráfica (XML) y en la experiencia de usuario, generación de ideas y búsqueda de una constante mejora.\n— Integración de llamadas de la API (Swagger) en colaboración con el equipo de back-end.\n— Coordinación de la versión iOS con un equipo internacional en India.",
      location: "España · Híbrido",
      technologies: ["Gradle", "Android", "XML", "Integración de API", "Swagger"], // Ensure this is an array
    },
    telus: {
      company: "TELUS Digital",
      position: "Analista de Datos/Mapas en Línea",
      description: "Clasificar, evaluar, describir y ordenar búsquedas (queries), audio, video, imágenes y datos de todo tipo, usando un inglés profesional, cultura general y competencia digital.",
      location: "Remoto · Totalmente Remoto",
      technologies: ["Inglés", "JSON", "Análisis de Datos", "Clasificación de Datos", "Competencia Digital"], // Ensure this is an array
    },
  },
};

/**
 * Combined translations object for all supported languages
 */
const translations = {
  en,
  es
};

export default translations;
