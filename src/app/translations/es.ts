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
    training: "Formación",
    gaming: "Sobre mí"
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
    appStore: "Descargar en la App Store",
    sourceCode: "Ver código fuente",
    logo: "Visita mi perfil de GitHub",
    expandImage: "Ampliar imagen",
    closeImage: "Cerrar imagen",
    playArcadeGame: "Jugar Juego Arcade",
    viewPresentation: "Ver presentación",
    viewWebsite: "Visitar sitio web",
    viewImage: "Ver imagen"
  },
  footer: {
    disclaimer: "© 2025 Ezequiel Garibotto.",
    githubLink: "GitHub repo"
  },
  aboutMe: {
    title: "Ezequiel Garibotto",
    description: "Desarrollador Junior Full-Stack de IA Aplicada | AI Engineering, Backend & Datos",
    photoAlt: "Foto de Ezequiel Garibotto"
  },
  cv: {
    download: "Descargar CV",
    spanish: "CV en Español",
    english: "CV en Inglés (2 páginas)",
    english_ats: "CV en Inglés (1 página, ATS)",
    preview: "Visualizar CV",
    unableToDisplay: "No se puede mostrar el archivo PDF.",
    downloadInstead: "Descargar en su lugar",
    lastUpdated: "Última actualización"
  },
  tagHints: {
    appliedAI: "Applied AI: IA dentro de un producto. Mi responsabilidad termina en la interfaz que usa el cliente final, no en el modelo en sí. Incluye diseñar flujos de trabajo agénticos que encadenan llamadas a LLM para automatizar una tarea.",
    aiEngineering: "AI Engineering: un rol más amplio que, en algunas empresas, roza la infraestructura (MLOps) o incluso el ajuste fino de modelos.",
    agenticAI: "Agentic AI: la responsabilidad llega hasta el runtime del agente: su fiabilidad, la evaluación de su comportamiento y su escalabilidad (frameworks de agentes, arquitecturas planner-executor, orquestación multiagente, estado multi-turno).",
    agenticDevelopment: "Agentic Development: usar agentes de IA (planner, subagentes, skills, servidores MCP) para construir software. Es parte de Applied AI y del desarrollo asistido por IA; no es lo mismo que construir sistemas de agentes (Agentic AI).",
    dataEngineering: "Data Engineering: mi responsabilidad termina en un conjunto de datos limpio y fiable: ingesta, parseo, controles de calidad y programación de tareas.",
  },
  techHints: {
    inProject: "Usado en este proyecto:",
    inProgram: "Usado en este programa:",
    acrossProjects: "Usado en mis proyectos:",
  },
  tagExamples: {
    appliedAI: "Ejemplos:\n• Facts: resúmenes de noticias neutrales generados con LLM dentro de una app Android\n• Chatbot de carrito de compra con LangGraph: reconocimiento de intención, estado de la conversación y validación",
    aiEngineering: "Ejemplos:\n• AI & Big Data: CNNs con Keras y PyTorch\n• Modelos de precios de vivienda (Random Forest, XGBoost, grid search) servidos con una API Flask\n• Facts: pipeline de embeddings y clustering semántico sobre más de 10 feeds de noticias",
    agenticAI: "Ejemplos:\n• Ninguno construido todavía\n• Planificado para ProString: los reportes de bug críticos disparan un arreglo propuesto por un LLM que reviso y apruebo, y las incidencias, emails y feedback se envían a la persona o grupo adecuado",
    agenticDevelopment: "Ejemplos:\n• ProString: agent harness propio con subagentes, skills, hooks y memoria persistente\n• 7 servidores MCP con acceso de mínimo privilegio (Supabase, GitHub, Stripe, Context7, Chrome DevTools, Hostinger, Laravel Boost)\n• Informes de coste de tokens por cada puerta de release\n• Análisis de competencia asistido por LLM que alimenta la hoja de ruta",
    dataEngineering: "Ejemplos:\n• Facts: scraping de más de 10 feeds RSS y un pipeline ETL con parseo XML\n• ProString: ingesta semanal de datasets públicos con pg_cron y Edge Functions\n• ProString: pipeline de importación con detección de columnas, de-duplicación de catálogo y puntuación de confianza",
  },
  projectTagHints: {
    "prostring": {
      appliedAI: "En este proyecto:\n• En curso: asistente de ayuda con RAG\n• En curso: importación de datos y analíticas asistidas por LLM",
      agenticAI: "En este proyecto:\n• Planificado: los reportes de bug críticos disparan un arreglo propuesto por un LLM que reviso y apruebo\n• Planificado: incidencias, emails y feedback enviados a la persona o grupo adecuado",
      agenticDevelopment: "En este proyecto:\n• Agent harness propio: subagentes, skills, hooks y memoria persistente\n• 7 servidores MCP con acceso de mínimo privilegio (Supabase, GitHub, Stripe, Context7, Chrome DevTools, Hostinger, Laravel Boost)\n• Informes de coste de tokens por cada puerta de release\n• Análisis de competencia asistido por LLM que alimenta la hoja de ruta",
      dataEngineering: "En este proyecto:\n• Ingesta semanal de datasets públicos con pg_cron y Edge Functions\n• Pipeline de importación: detección de columnas, de-duplicación de catálogo y puntuación de confianza\n• En curso: pipelines en Python que agregan datos públicos de tenis (rankings, raquetas, marcas, modelos)",
    },
    "neutral-news": {
      appliedAI: "En este proyecto:\n• Resúmenes de noticias neutrales generados con LLM dentro de la app Android",
      aiEngineering: "En este proyecto:\n• Embeddings y clustering semántico de noticias de más de 10 feeds RSS",
      dataEngineering: "En este proyecto:\n• Scraping de más de 10 feeds RSS\n• Pipeline ETL con parseo XML",
    },
    "ia-bigdata": {
      aiEngineering: "En este proyecto:\n• CNNs con Keras y PyTorch\n• Modelos de precios de vivienda (Random Forest, XGBoost, grid search) servidos con una API Flask\n• En curso: proyecto final de regresión y clustering sobre datos de e-commerce",
    },
    "shoppingcart-chatbot": {
      appliedAI: "En este proyecto:\n• Chatbot con LangGraph y flujo de compra completo: reconocimiento de intención, estado de la conversación, validación y pruebas automáticas",
    },
    "linkia": {
      aiEngineering: "En este programa:\n• CNNs con Keras y PyTorch\n• Modelos de precios de vivienda (Random Forest, XGBoost, grid search) servidos con una API Flask\n• En curso: proyecto final de regresión y clustering sobre datos de e-commerce",
    },
  },
  tags: {
    showMore: "+{count} más",
    showLess: "Ver menos",
  },
  documents: {
    preview: "Previsualizar",
    download: "Descargar",
    close: "Cerrar",
  },
  search: {
    scopeLabel: "Alcance",
    techLabel: "Tecnología",
    placeholder: "Buscar proyectos por título, descripción o tecnología...",
    clearFilters: "Limpiar filtros",
    noResults: "No se encontraron proyectos que coincidan con tus criterios",
    showingAll: "Mostrando todos los {count} proyectos",
    showingLimited: "Mostrando {count} proyectos de {total}",
    showingFiltered: "Mostrando {filtered} de {total} proyectos",
    filtered: "(filtrado)",
    tryAdjusting: "Intenta ajustar tus criterios de búsqueda o eliminar algunos filtros.",
    showAllLink: "Ver todos los proyectos",
    showLessLink: "Ver menos",
    sortBy: "Ordenar por",
    sortByDate: "Fecha",
    sortByRelevance: "Relevancia"
  },
  projects: {
    title: "Proyectos",
    current: "presente",
    neutralNews: {
      title: "Neutral News / Facts",
      description: "Aplicación con flujo ETL que genera noticias neutrales, combinando diversas tecnologías potentes para el backend: Scraping, parsing XML, algoritmos ML para embedding y clustering, uso de APIs de generación de texto, entre otros.\n" +
        "• Implementé clustering semántico periódico de artículos de noticias obtenidos de feeds RSS de más de 10 medios españoles.\n" +
        "• Construí un sistema robusto para asegurar la generación de versiones neutrales para clusters de noticias agrupadas semánticamente.\n" +
        "• Desarrollé tanto un backend sólido y complejo como una aplicación Android amigable para el usuario.",
      footer: "En pausa",
      startDate: "diciembre 2024",
      websiteLink: "https://getfacts.app"
    },
    ctennisstudio: {
      title: "Custom Tennis Studio",
      description: "Desarrollo de una página web de venta de servicios de tenis\n\n" +
        "• Landing page moderna y responsive usando React, Next.js y TailwindCSS\n" +
        "• Interfaz intuitiva para mostrar servicios profesionales, experiencia en torneos y programas de formación\n" +
        "• Sistema de contacto integrado via Email para facilitar la comunicación con clientes\n" +
        "• Optimicé el rendimiento web y SEO para maximizar la visibilidad online del negocio",
      footer: "Proyecto Freelance",
      startDate: "noviembre 2025"
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
      startDate: "septiembre 2023",
      endDate: "junio 2025"
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
    shoppingCartChatbot: {
      title: "Chatbot Conversacional para Carrito de Compras con LangGraph",
      description: "Chatbot de e-commerce basado en LangGraph que implementa un flujo de compra completo mediante gestión de estados y orquestación de LLMs. Incluye detección de intenciones, extracción de entidades, validaciones y testing automatizado.",
      footer: "Proyecto de Aprendizaje",
      startDate: "enero 2026",
      endDate: "enero 2026"
    },
    iaBigData: {
      title: "Portfolio de la Especialización en IA y Big Data",
      description: "Repositorio de aprendizaje de la Especialización en IA y Big Data: aprendizaje automático, deep learning (CNNs con Keras y PyTorch), modelos de precios de vivienda (Random Forest, XGBoost) servidos con una API Flask y un proyecto final de regresión y clustering (en curso).",
      footer: "Proyecto de Aprendizaje",
      startDate: "diciembre 2025",
      endDate: "diciembre 2026",
      docs: {
        ames: "Ames Housing: informe de predicción de precios de vivienda (PDF)",
        keras: "CNN con Keras/TensorFlow: informe del ejercicio (PDF)",
        pytorch: "CNN con PyTorch: informe del ejercicio (PDF)",
        sklearn: "Perceptrón multicapa con scikit-learn: informe del ejercicio (PDF)",
        bi: "Propuesta de sistema de BI para una PyME (PDF)",
      },
    },
    prostring: {
      title: "ProString Manage - SaaS de Gestión de Talleres de Encordado y Torneos",
      description: "Plataforma SaaS profesional para talleres de encordado de raquetas, tiendas especializadas, clubes deportivos y equipos de torneo. Gestión de pedidos de encordado, historial de clientes y raquetas, inventario de productos, facturación y negocios multi-sede. Organización de torneos con asignación de máquinas y encordadores, estadísticas de carga y seguimiento de premios. Incluye planes de suscripción, impresión automática de recibos y etiquetas, escaneo de códigos de barras, importación de datos con matching inteligente, facturas inmutables con numeración consecutiva, MFA aplicado en la base de datos e internacionalización completa en 6 idiomas. Desarrollado en solitario con un agent harness propio (subagentes, skills y 7 servidores MCP).",
      footer: "Proyecto Profesional Actual",
      startDate: "mayo 2026",
      endDate: null
    },
    readMoreExperience: "Leer más sobre mi experiencia →",
    showAllProjects: "Mostrar todos los proyectos",
    showLess: "Mostrar menos"
  },
  experiences: {
    title: "Experiencia profesional",
    eulix: {
      company: "Eulix",
      position: "Desarrollador Junior de Android",
      period: "09/2024 - 04/2025 (7 meses)",
      description: "Desarrollo de una aplicación con el objetivo de recomendar contenidos (películas, series) basándose en la personalidad, estado de ánimo y preferencias del usuario.\n" +
        "• Desarrollé un chatbot (Asistente Virtual) para onboarding y sección 'Cómo Funciona', mejorando el engagement y soporte al usuario.\n" +
        "• Diseñé y mejoré la UI en todas las pantallas de la app, impulsando mejoras continuas de UX a través de ideas de diseño iterativo.\n" +
        "• Integré API RESTful con Retrofit en colaboración con el equipo de back-end, asegurando intercambio de datos fluido y funcionalidad de la aplicación.\n" +
        "• Coordiné con un equipo internacional en India, facilitando comunicación efectiva y alineación del proyecto a través de diferentes zonas horarias.",
      location: "Barcelona, España · Híbrido",
    },
    telus: {
      company: "TELUS Digital",
      position: "Anotador de Datos",
      period: "07/2023 - 01/2025 (1 año 7 meses)",
      description: "• Clasifiqué, evalué y describí consultas, audio, video, imágenes y otros tipos de datos para asegurar relevancia y calidad.\n" +
        "• Apliqué inglés profesional, conocimiento general y alfabetización digital para mejorar la precisión y comprensión contextual del contenido.",
      location: "España · Totalmente Remoto",
    },
    seidor: {
      company: "SEIDOR NTS",
      position: "Asistente Técnico de Salesforce",
      period: "08/2025 - 10/2025 (2 meses)",
      location: "Barcelona, España · Híbrido",
      description:
        "• Desarrollo de servicios y APIs (Apex)\n" +
        "• Desarrollo web y componentes interactivos (LWC)\n" +
        "• Soluciones low-code (Flow Builder)\n" +
        "• Diseño de arquitectura de aplicaciones empresariales (Sales/Service Cloud)\n" +
        "• Clases asíncronas y pruebas unitarias\n" +
        "• Integración de servicios externos usando llamadas HTTP y Postman",
    },
    prostring: {
      company: "ProString Manage",
      position: "Desarrollador Junior de IA Aplicada",
      period: "",
      location: "Remoto",
      description:
        "Diseño, desarrollo y despliegue en solitario de una aplicación web SaaS multi-tenant para talleres de encordado de raquetas y gestión de torneos, combinando un frontend Vue 3 + Vite con un backend serverless en Supabase, construida con un agent harness propio.\n\n" +
        "• Diseñé una arquitectura dual (Torneo / Tienda) con 23 Pinia stores, 45+ vistas, 230+ componentes y 70+ composables en Vue 3 + TypeScript\n" +
        "• Apliqué aislamiento de datos por tenant/rol con 180+ políticas de Row-Level Security, validación de precios del lado del servidor y operaciones atómicas, además de MFA TOTP con AAL2 exigido a nivel de base de datos\n" +
        "• Implementé RBAC con 2 modos, 3 roles y 29 features con 130+ permisos granulares\n" +
        "• Construí un backend serverless con 23 Edge Functions en Deno y 80+ RPCs transaccionales en PL/pgSQL que cubren ciclo de vida de usuarios, autenticación, envío de emails, provisionamiento demo y provisionamiento automático de tenants mediante webhooks de Stripe (4 planes, descuentos para miembros GRSA)\n" +
        "• Implementé facturación: numeración consecutiva asignada por el servidor, facturas emitidas inmutables garantizadas por triggers de base de datos con correcciones mediante facturas rectificativas y formatos de factura para 7 países\n" +
        "• Desarrollé pipelines de datos: ingesta semanal programada de datasets públicos con pg_cron y Edge Functions, un motor de informes configurable, snapshots con retención y restauración, y un pipeline de importación con auto-detección de columnas, detección de splits, de-duplicación de catálogo y confidence scoring\n" +
        "• Entregué una UX optimizada para torneos en vivo: entrada de pedidos orientada a teclado con salto automático entre campos, impresión de recibos y etiquetas con un clic mediante QZ Tray y ESC/POS (sin diálogo de impresión del navegador) y sincronización con Supabase Realtime con caché a nivel de store\n" +
        "• Mantuve la calidad con 1.500+ tests automatizados, 8 workflows de CI/CD en GitHub Actions y validación de migraciones desde cero; localicé la interfaz en 6 idiomas con un sistema de overrides de traducciones por tenant\n" +
        "• Construí un agent harness propio: subagentes, skills, hooks y memoria persistente, con 7 servidores MCP (Supabase, GitHub, Stripe, Context7, Chrome DevTools, Hostinger, Laravel Boost) con acceso de mínimo privilegio\n" +
        "• En curso: asistente RAG reforzado frente a prompt injection, importación de datos y generación de analíticas asistidas por LLM, y pipelines en Python que agregan datos públicos de tenis",
    }
  },
  training: {
    title: "Formación académica",
    itb: {
      institution: "Institut Tecnològic de Barcelona (ITB)",
      course: "Desarrollo de Aplicaciones Multiplataforma - Sistemas Inteligentes (DAMi)",
      period: "2023 - 2025",
      location: "Nou Barris, Barcelona, España",
      description: "Grado superior de desarrollo de aplicaciones móviles y web, con énfasis en tecnologías modernas y metodología Agile y Scrum.\n\n" +
        "• Kotlin, Jetpack Compose / XML, Retrofit, para desarrollo Android\n" +
        "• Machine Learning, Web Scraping, Sentiment Analysis, Algoritmos de Clasificación, Decisión y Predicción\n" +
        "• Gestión de bases de datos SQL y NoSQL como PostgreSQL, MongoDB y Firebase\n" +
        "• Comunicaciones cliente-servidor con Ktor, lectura de ficheros, acceso a datos\n" +
        "• Participación en concursos de programación competitiva, usando Java y Kotlin\n\n" +
        "Nota: 9.08",
    },
    linkia: {
      institution: "Linkia FP",
      course: "Especialización en Inteligencia Artificial y Big Data",
      period: "febrero 2026 - diciembre 2026 (previsto)",
      location: "Remoto",
      description: "Especialización en inteligencia artificial y big data, centrada en AI engineering y desarrollo agéntico sobre bases de aprendizaje automático y big data.\n\n" +
        "• Práctica: CNNs (Keras, PyTorch) y modelos de precios de vivienda (XGBoost, grid search) servidos con una API Flask\n" +
        "• Proyecto final en curso: regresión y clustering sobre 540K registros de e-commerce\n" +
        "• Módulos: programación de IA, sistemas de aprendizaje automático, big data aplicado, modelos de IA, sistemas de big data y un proyecto de IA y big data\n\n" +
        "Nota: 9",
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
  aboutMeSection: {
    title: "Sobre mí",
    personalInfo: "Enfocado en ingeniería de software con IA aplicada y desarrollo agéntico. Mi stack principal es Python, TypeScript, Vue, Supabase y APIs de LLM. Soy el desarrollador en solitario de ProString Manage, una plataforma SaaS multi-tenant en producción para talleres de encordado y gestión de torneos, construida con un agent harness propio. Representé a mi instituto en las finales nacionales de ProgramaMe 2024 y 2025, logrando el 4º puesto. Cursando una Especialización en IA y Big Data mientras codesarrollo Facts: News AI Summary, una solución Android + Python con pipeline ETL completo para generación de noticias neutrales — actualmente en pausa pero con planes de continuarlo.",
    lifestyleInfo: "Y la segunda mejor decisión fue empezar a entrenar. Disfruto mantenerme activo y saludable, llevando un estilo de vida equilibrado.",
    musicInfo: "Escucho principalmente metal, rock, rap español, rock nacional (argentino). Y solía escuchar mucha música electrónica, ahora esa música me da nostalgia.",
    hobbiesInfo: "En cuanto a otros hobbies, solía jugar mucho Minecraft, pero no construir, ni hacer mecanismos de redstone, como muchos programadores que conozco, a mi me gustaba jugar el PvP competitivo de la 1.7.10. Pero soy una persona normal, lo juro, también disfruto de las experiencias inmersivas de un solo jugador que ofrecen narrativas ricas y exploración de mundo abierto como la saga de The Elder Scrolls, Red Dead Redemption, Spore, Atomic Heart, por mencionar algunos.",
    heavyProfile: "Me puedes agregar en Hevy, si te van los hierros",
    spotifyPlaylist: "Te regalo mi playlist"
  },
};