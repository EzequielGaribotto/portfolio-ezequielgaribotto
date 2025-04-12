// Define base structure for type safety
export const baseTranslations = {
  footer: {
    disclaimer: "",
    githubLink: ""
  },
  about: {
    title: "",
    intro: "",
    skills: "",
    experience: ""
  },
  projects: {
    title: "",
    myprojects: "",
    viewAll: "",
    current: ""
  },
  projectTitles: {} as Record<string, string>,
  projectDescriptions: {} as Record<string, string>,
  contact: {
    title: "",
    name: "",
    email: "",
    message: "",
    submit: "",
    success: "",
    error: ""
  },
  meta: {
    title: "",
    description: ""
  },
  dates: {} as Record<string, string>,
  aboutMe: {
    title: "",
    description: "",
    photoAlt: ""
  }
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
  projects: {
    title: "My Projects",
    myprojects: "Projects",
    viewAll: "View All",
    current: "PRESENT"
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
  aboutMe: {
    title: "Ezequiel Garibotto",
    description: "Software developer with experience in mobile and web development. Inspired by the challenge.",
    photoAlt: "Photo of Ezequiel Garibotto"
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
  projects: {
    title: "Mis Proyectos",
    myprojects: "Proyectos",
    viewAll: "Ver Todos",
    current: "ACTUAL"
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
  aboutMe: {
    title: "Ezequiel Garibotto",
    description: "Desarrollador de software con experiencia en desarrollo móvil y web. Inspirado por el desafío.",
    photoAlt: "Foto de Ezequiel Garibotto"
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
