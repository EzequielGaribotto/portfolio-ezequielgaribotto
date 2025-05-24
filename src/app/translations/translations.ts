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
  // Navigation translations
  navigation: {
    profile: "",
    projects: "",
    experience: "",
    training: ""
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
  aboutMe: {
    title: "Ezequiel Garibotto",
    description: "Software developer with experience in mobile, web and cloud services.",
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
    current: "Present"
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
    title: "Ezequiel Garibotto - Portfolio",
    description: "Software developer with experience in mobile, web and cloud services.",
  },
  dates: {
    jan2023: "Jan 2023",
    feb2023: "Feb 2023",
    mar2023: "Mar 2023",
    apr2023: "Apr 2023",
    may2023: "May 2023",
    jun2023: "Jun 2023",
    jul2023: "Jul 2023",
    aug2023: "Aug 2023",
    sep2023: "Sep 2023",
    oct2023: "Oct 2023",
    nov2023: "Nov 2023",
    dec2023: "Dec 2023",
    jan2024: "Jan 2024",
    feb2024: "Feb 2024",
    mar2024: "Mar 2024",
    apr2024: "Apr 2024",
    may2024: "May 2024",
    jun2024: "Jun 2024",
    jul2024: "Jul 2024",
    aug2024: "Aug 2024",
    sep2024: "Sep 2024",
    oct2024: "Oct 2024",
    nov2024: "Nov 2024",
    dec2024: "Dec 2024",
    jan2025: "Jan 2025",
    feb2025: "Feb 2025",
    mar2025: "Mar 2025",
    apr2025: "Apr 2025",
    may2025: "May 2025",
    jun2025: "Jun 2025",
    jul2025: "Jul 2025",
    aug2025: "Aug 2025",
    sep2025: "Sep 2025",
    oct2025: "Oct 2025",
    nov2025: "Nov 2025",
    dec2025: "Dec 2025"
  },
  projectTitles: {
    "rick-and-morty-api-list": "Efficient API List",
    "competitive-programming": "Competitive Programming",
    "neutral-news": "Neutral News",
    "eulix": "Eulix App"
  },
  projectDescriptions: {
    "competitive-programming": "Participation in competitive programming contests in teams, representing the institute, finishing fourth in the national contest. Problems solved on JO-EL and AceptaElReto for the ProgramaMe 2024 contest.",
    "neutral-news": "Application under development that collects news from multiple Spanish media, groups them by topic and generates a neutral version of the events, with the aim of combating media bias through the combination of algorithms and advanced artificial intelligence techniques.",
    "eulix": "Android development of an app designed to recommend content (movies, series) based on user personality, mood, and preferences.",
    "rick-and-morty-api-list": "Typical API List App, but made in Android with Java8, DataBinding, Caché, Pagination, SDK-Like architecture, Quick response times and simple efficiency tracking"
  },
  projectFooters: {
    "competitive-programming": "Academic Elective",
    "neutral-news": "Academic project continuation",
    "eulix": "Internship",
    "rick-and-morty-api-list": "Technical Interview"
  },
  experiences: {
    eulix: {
      company: "Eulix",
      position: "Junior Android Developer",
      period: "October 2024 - April 2025",
      description: "Developed an Android application aimed at recommending content (movies, series) based on user personality, mood, and preferences.\n"+
                   "— Developed the Virtual Assistant, Onboarding, and 'How It Works' section.\n"+
                   "— Designed and improved UI (XML) and user experience, generating ideas and seeking constant improvement.\n"+
                   "— Integrated API calls (Swagger) in collaboration with the back-end team.\n"+
                   "— Coordinated the iOS version with an international team in India.",
      location: "Spain · Hybrid",
      technologies: ["Android", "XML", "API Integration", "Gradle", "AI/ML Integration", "Front-End", "Data Binding", "Android Jetpack", "Retrofit", "Kotlin DSL", "LiveData", "Android SDK", "Git"], // Ensure this is an array
    },
    telus: {
      company: "TELUS Digital",
      position: "Online Data/Maps Analyst",
      period: "July 2023 - January 2025",
      description: "Classified, evaluated, and organized searches (queries), audio, video, images, and data of all kinds using professional English, general culture, and digital competence.",
      location: "Spain · Fully Remote",
      technologies: [
        "English",
        "JSON",
        "Data Analysis",
        "Data Classification",
        "Digital Competence",
      ],
    },
  },
  cv: {
    download: "Download CV",
    spanish: "Spanish CV",
    english: "English CV"
  },
  training: {
    title: "Academic Training",
    itb: {
      institution: "Institut Tecnològic de Barcelona (ITB)",
      course: "Cross-Platform Application Development",
      period: "2023 - 2025",
      location: "Nou Barris, Barcelona, Spain",
      description: "Higher degree in cross-platform mobile and web application development, focusing on modern technologies and agile practices.",
      technologies: ["Java", "Kotlin", "Python", "Android", "React", "Node.js", "AWS", "Cloud", "SQL", "NoSQL", "Git", "Docker", "CI/CD", "Agile", "Scrum"]
    },
    upf: {
      institution: "Universitat Pompeu Fabra (UPF)",
      course: "Engineering in Audiovisual Systems",
      period: "2021 - 2022 (abandoned studies)",
      location: "Barcelona, Spain",
      description: "Degree in engineering in audiovisual systems with a focus on theoretical and practical foundations of computer science, including programming, algorithms, and data structures.",
      technologies: ["Python", "C++", "MatLab", "Processing", "Collab", "OOP", "Cisco Packet Tracer", "Assembly"]
    },
    rb4: {
      institution: "Ramón Berenguer IV (RB4)",
      course: "Technological Baccalaureate",
      period: "2019-2021",
      location: "Santa Coloma de Gramenet, Spain",
      description: "Baccalaureate with a focus on science and technology, preparing for higher studies in engineering and software development.",
      technologies: ["Excel", "Python", "Scratch"]
    }
  },
  navigation: {
    profile: "Profile",
    projects: "Projects",
    experience: "Experience",
    training: "Training"
  }
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
    description: "Desarrollador de software con experiencia en desarrollo móvil, web y servicios cloud.",
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
        ],
      }
    ]
  },
  projects: {
    title: "Proyectos",
    myprojects: "Proyectos",
    viewAll: "Ver Todos",
    current: "Actual"
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
    title: "Ezequiel Garibotto - Portfolio",
    description: "Desarrollador de software con experiencia en desarrollo móvil, web y servicios cloud."
  },
  dates: {
    jan2023: "Ene 2023",
    feb2023: "Fen 2023",
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
  projectTitles: {
    "competitive-programming": "Programación Competitiva",
    "neutral-news": "Neutral News",
    "eulix": " Eulix",
    "rick-and-morty-api-list": "API list eficiente"
  },
  projectDescriptions: {
    "competitive-programming": "Participación en concursos de programación competitiva en equipos, representando al instituto, quedando cuartos en el cuncurso nacional. Problemas resueltos en JO-EL y AceptaElReto para el concurso ProgramaMe 2024.",
    "neutral-news": "Aplicación en desarrollo que recopila noticias de múltiples medios de comunicación españoles, las agrupa por temática y genera una versión neutral de los acontecimientos. El objetivo es combatir el sesgo mediático mediante la combinación de algoritmos y técnicas avanzadas de inteligencia artificial.",
    "eulix": "Desarrollo Android de una aplicación con el objetivo de recomendar contenidos (películas, series) basándose en la personalidad, estado de ánimo y preferencias del usuario.",
    "rick-and-morty-api-list": "La típica API list, pero hecha en Android con Java8, DataBinding, Caché, Paginación, arquitectura tipo SDK, tiempos de respuesta rápidos y un seguimiento de eficiencia simple."
  },
  projectFooters: {
    "competitive-programming": "Optativo Académico",
    "neutral-news": "Académico en continuidad",
    "eulix": "Prácticas formativas",
    "rick-and-morty-api-list": "Entrevista técnica"
  },
  experiences: {
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
  cv: {
    download: "Descargar CV",
    spanish: "CV en Español",
    english: "CV en Inglés"
  },
  training: {
    title: "Formación Académica",
    itb: {
      institution: "Institut Tecnològic de Barcelona (ITB)",
      course: "Desarrollo de Aplicaciones Multiplataforma (DAM)",
      period: "2023 - 2025",
      location: "Nou Barris, Barcelona, España",
      description: "Grado superior de desarrollo de aplicaciones móviles y web, con énfasis en tecnologías modernas y metodología Agile.",
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
  navigation: {
    profile: "Perfil",
    projects: "Proyectos",
    experience: "Experiencia",
    training: "Formación"
  }
};

/**
 * Combined translations object for all supported languages
 */
const translations = {
  en,
  es
};

export default translations;
