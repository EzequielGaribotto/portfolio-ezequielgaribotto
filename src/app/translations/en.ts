import { baseTranslations, Translations } from './baseTranslations';

/**
 * English translations
 */
export const en: Translations = {
  ...baseTranslations,
  meta: {
    title: "Ezequiel Garibotto - Portfolio",
    description: "Software developer with experience in mobile, web and cloud services.",
  },
  navigation: {
    profile: "Profile",
    projects: "Projects",
    experience: "Experience",
    training: "Training",
    gaming: "About Me"
  },
  tooltips: {
    github: "Visit my GitHub profile",
    linkedin: "Connect with me on LinkedIn",
    email: "Copy email",
    emailCopied: "✓ Copied!",
    competition: "View competition details",
    solvedProblems: "View solved problems",
    playGame: "Play the game",
    playStore: "Download from Play Store",
    appStore: "Download from App Store",
    sourceCode: "View source code",
    logo: "Visit my GitHub profile",
    expandImage: "Expand image",
    closeImage: "Close image",
    playArcadeGame: "Play Arcade Game",
    viewPresentation: "View Presentation",
    viewWebsite: "Visit website",
    viewImage: "View image"
  },
  footer: {
    disclaimer: "© 2025 Ezequiel Garibotto.",
    githubLink: "GitHub repo"
  },
  aboutMe: {
    title: "Ezequiel Garibotto",
    description: "Junior Full-Stack Applied AI Developer | AI Engineering, Backend & Data",
    photoAlt: "Photo of Ezequiel Garibotto"
  },
  cv: {
    download: "Download CV",
    spanish: "Spanish CV",
    english: "English CV (2 pages)",
    english_ats: "English CV (1 page, ATS)",
    preview: "Preview CV",
    unableToDisplay: "Unable to display PDF file.",
    downloadInstead: "Download Instead",
    lastUpdated: "Last updated"
  },
  tagHints: {
    appliedAI: "Applied AI: AI inside a product. My responsibility ends at the interface the end user touches, not at the model itself. It includes designing agentic workflows that chain LLM calls to automate a task.",
    aiEngineering: "AI Engineering: a broader scope that, in some companies, reaches infrastructure (MLOps) or even model fine-tuning.",
    agenticAI: "Agentic AI: the scope extends into the agent's runtime: reliability, behavior evaluation and scalability (agent frameworks, planner-executor architectures, multi-agent orchestration, multi-turn state). Not built yet. Next level for ProString: agents that triage incidents, route them to the right person and propose fixes for human approval.",
    agenticDevelopment: "Agentic Development: using AI agents (planner, subagents, skills, MCP servers) to build software. It is part of Applied AI and AI-assisted development; it is not the same as building agent systems (Agentic AI).",
  },
  search: {
    placeholder: "Search projects by title, description, or technology...",
    clearFilters: "Clear filters",
    noResults: "No projects found matching your criteria",
    showingAll: "Showing all {count} projects",
    showingLimited: "Showing {count} projects out of {total}",
    showingFiltered: "Showing {filtered} of {total} projects",
    filtered: "(filtered)",
    tryAdjusting: "Try adjusting your search criteria or remove some filters.",
    showAllLink: "Show all projects",
    showLessLink: "Show less",
    sortBy: "Sort by",
    sortByRelevance: "Relevance",
    sortByDate: "Date"
  },
  projects: {
    title: "Projects",
    current: "present",
    neutralNews: {
      title: "Neutral News / Facts",
      description: "Application with ETL flow that generates neutral news, combining various powerful backend technologies: Scraping, XML parsing, ML algorithms for embedding and clustering, use of text generation APIs, among others.\n" +
        "• Implemented periodic semantic clustering of news articles sourced from the RSS feeds of more than 10 Spanish media outlets.\n" +
        "• Built a robust system to ensure the generation of neutral versions for clusters of semantically grouped news.\n" +
        "• Developed both a solid and complex backend and a user-friendly Android application.",
      footer: "Paused",
      startDate: "December 2024",
      websiteLink: "https://getfacts.app"
    },
    ctennisstudio: {
      title: "Custom Tennis Studio",
      description: "Development of a tennis services sales website.\n\n" +
        "• Modern and responsive landing page using React, Next.js, and TailwindCSS\n" +
        "• Intuitive interface to showcase professional services, tournament experience, and training programs\n" +
        "• Integrated contact system with Email to facilitate client communication\n" +
        "• Optimized web performance and SEO to maximize the business's online visibility",
      footer: "Freelance Project",
      startDate: "November 2025"
    },
    eulix: {
      title: "Eulix",
      description: "Android development of an app designed to recommend content (movies, series) based on user personality, mood, and preferences.",
      footer: "Internship",
      startDate: "October 2024",
      endDate: "April 2025"
    },
    competitiveProgramming: {
      title: "Competitive Programming",
      description: "Participation in competitive programming contests in teams, representing the institute, finishing fourth in the national contest. Problems solved on JO-EL and AceptaElReto for the ProgramaMe 2024 contest.",
      footer: "Academic Elective",
      startDate: "September 2023",
      endDate: "June 2025"
    },
    rickAndMorty: {
      title: "Efficient API List",
      description: "Typical API List App, but made in Android with Java8, DataBinding, Caché, Pagination, SDK-Like architecture, Quick response times and simple efficiency tracking",
      footer: "Learning Project",
      startDate: "April 2025",
      endDate: "April 2025"
    },
    zomb: {
      title: "Zomb - Retro Game",
      description: "Infinite horizontal scroller retro game made with Makecode Arcade, featuring collision systems, enemies that follow the player, and survival mechanics in a zombie environment.",
      footer: "Learning Project",
      startDate: "November 2024",
      endDate: "December 2024"
    },
    cronScheduleEditor: {
      title: "CRON Schedule Editor",
      description: "User-friendly visual editor for creating and managing cron expressions. Web tool that helps build cron schedules without memorizing the syntax, developed to improve my understanding of useEffect.",
      footer: "Learning Project",
      startDate: "January 2025",
      endDate: "January 2025"
    },
    portfolioWebsite: {
      title: "Portfolio Website",
      description: "Modern personal portfolio website built with React, Next.js, and TypeScript. Features responsive design, theme switching, multiple language support, and showcases projects and professional experience.",
      footer: "Learning Project",
      startDate: "April 2025",
      endDate: "July 2025"
    },
    mapsApp: {
      title: "Maps CRUD Application",
      description: "Complete Android CRUD app for map markers with user registration, login, and Firebase Database storage for user data (name, profile picture, captured photos).",
      footer: "Academic Project",
      startDate: "March 2024",
      endDate: "June 2024"
    },
    peleaDeGallos: {
      title: "Pelea De Gallos",
      description: "Client-server communication with Ktor, file processing, data access.",
      footer: "Academic Project",
      startDate: "May 2024",
      endDate: "May 2024"
    },
    hackerNewsAPI: {
      title: "HackerNews Scraper API",
      description: "Python FastAPI web scraper that fetches news articles from Hacker News with intelligent caching strategy. Features Docker containerization, test-driven development, and efficient data processing.",
      footer: "Learning Project",
      startDate: "June 2025",
      endDate: "June 2025"
    },
    barcelonaInequality: {
      title: "Barcelona Neighborhoods Inequality Analysis",
      description: "Machine Learning project analyzing inequality patterns across Barcelona neighborhoods using Python. Data processing, classification algorithms, and statistical analysis to identify socioeconomic disparities. Final project for Python Machine Learning course covering data preprocessing, AI techniques, and visualization.",
      footer: "Academic Project",
      startDate: "March 2025",
      endDate: "March 2025"
    },
    shoppingCartChatbot: {
      title: "Shopping Cart Conversational Chatbot with LangGraph",
      description: "An e-commerce chatbot based on LangGraph that implements a complete purchasing workflow through state management and the orchestration of large language models (LLMs). It includes intent recognition, entity extraction, validation and automated testing.",
      footer: "Learning Project",
      startDate: "January 2026",
      endDate: "January 2026"
    },
    iaBigData: {
      title: "AI & Big Data Specialization Portfolio",
      description: "Learning repository of the Specialization in AI and Big Data: machine learning, deep learning (CNNs with Keras and PyTorch), house-price models (Random Forest, XGBoost) served through a Flask API, and a capstone on regression and clustering (in progress).",
      footer: "Learning Project",
      startDate: "December 2025",
      endDate: "December 2026",
    },
    prostring: {
      title: "ProString Manage - SaaS for Stringing Workshop & Tournament Management",
      description: "Professional SaaS platform for racket stringing workshops, specialized shops, sports clubs and tournament teams. Manage stringing orders, client and racket history, product inventory, invoicing, and multi-location businesses. Organize tournaments with machine and stringer assignment, workload statistics, and prize money tracking. Features subscription plans, automated receipt and label printing, barcode scanning, data import with smart matching, immutable consecutively numbered invoices, database-enforced MFA and full internationalization in 6 languages. Built solo with a custom agent harness (subagents, skills and 7 MCP servers).",
      footer: "Current Professional Project",
      startDate: "May 2026",
      endDate: null
    },
    readMoreExperience: "Read more about my experience →",
    showAllProjects: "Show all projects",
    showLess: "Show less"
  },
  experiences: {
    title: "Work experience",
    eulix: {
      company: "Eulix",
      position: "Junior Android Developer",
      period: "October 2024 - April 2025 (7 months)",
      description: "Development of an application with the objective of recommending content (movies, series), based on the user's personality, mood and preferences.\n" +
        "• Developed a chatbot (Virtual Assistant) for onboarding and 'How It Works' section, enhancing user engagement and support.\n" +
        "• Designed and enhanced the UI across all app screens, driving continuous UX improvements through iterative design ideas.\n" +
        "• Integrated RESTful API with Retrofit in collaboration with the back-end team, ensuring seamless data exchange and application functionality.\n" +
        "• Coordinated with an international team in India, facilitating effective communication and project alignment across different time zones.",
      location: "Spain, Barcelona · Hybrid",
    },
    telus: {
      company: "TELUS Digital",
      position: "Data Annotator",
      period: "July 2023 - January 2025 (1 year 7 months)",
      description: "• Classified, evaluated, and described queries, audio, video, images, and other data types to ensure relevance and quality.\n" +
        "• Applied professional English, general knowledge, and digital literacy to enhance the accuracy and contextual understanding of content.",
      location: "Spain · Fully Remote",
    },
    seidor: {
      company: "SEIDOR NTS",
      position: "Salesforce Technical Assistant",
      period: "Aug 2025 - Oct 2025",
      location: "Spain, Barcelona · Hybrid",
      description:
        "• Service and API development (Apex)\n" +
        "• Web development and interactive components (LWC)\n" +
        "• Low-code solutions (Flow Builder)\n" +
        "• Enterprise application architecture design (Sales/Service Cloud)\n" +
        "• Asynchronous classes and unit testing\n" +
        "• Integration of external services using HTTP calls and Postman",
    },
    prostring: {
      company: "ProString Manage",
      position: "Applied AI Junior Developer",
      period: "",
      location: "Remote",
      description:
        "Solo design, development and deployment of a multi-tenant SaaS web application for racket stringing workshops and tournament management, combining a Vue 3 + Vite frontend with a serverless Supabase backend, built with a custom agent harness.\n\n" +
        "• Engineered a dual-mode architecture (Tournament / Shop) with 23 Pinia stores, 45+ views, 230+ components and 70+ composables in Vue 3 + TypeScript\n" +
        "• Enforced tenant/role data isolation with 180+ Row-Level Security policies, server-side price validation and atomic operations, plus TOTP MFA with AAL2 enforced at the database level\n" +
        "• Implemented RBAC across 2 modes, 3 roles and 29 features with 130+ granular permissions\n" +
        "• Built a serverless backend of 23 Deno Edge Functions and 80+ transactional PL/pgSQL RPCs covering user lifecycle, authentication flows, email delivery, demo provisioning and automatic tenant provisioning via Stripe webhooks (4 plans, GRSA member discounts)\n" +
        "• Implemented invoicing: server-allocated consecutive invoice numbers, immutable issued invoices enforced by database triggers with rectificative-invoice corrections, and invoice formats for 7 countries\n" +
        "• Developed data pipelines: scheduled weekly ingestion of public datasets with pg_cron and Edge Functions, a configurable report engine, retention-based snapshots with restore, and an import pipeline with column auto-detection, split detection, catalog deduplication and confidence scoring\n" +
        "• Delivered optimized UX for live tournaments: keyboard-first order entry with auto-jump between fields, one-click receipt/label printing via QZ Tray and ESC/POS (no browser print dialog) and Supabase Realtime sync with store-level caching\n" +
        "• Maintained quality with 1,500+ automated tests, 8 GitHub Actions CI/CD workflows and from-scratch migration validation; localized the UI in 6 languages with a per-tenant translation override system\n" +
        "• Built a custom agent harness: subagents, skills, hooks and persistent memory, with 7 MCP servers (Supabase, GitHub, Stripe, Context7, Chrome DevTools, Hostinger, Laravel Boost) under least-privilege access\n" +
        "• In progress: RAG assistant hardened against prompt injection, LLM-assisted data import and analytics, and Python pipelines aggregating public tennis data",
    }
  },
  training: {
    title: "Academic training",
    itb: {
      institution: "Institut Tecnològic de Barcelona (ITB)",
      course: "Cross-Platform Application Development - Intelligent Systems",
      period: "2023 - 2025",
      location: "Nou Barris, Barcelona, Spain",

      description: "Higher vocational degree in cross-platform mobile and web application development, focusing on modern technologies and agile practices.\n\n" +
        "• Kotlin, Jetpack Compose / XML, Retrofit for Android development\n" +
        "• Machine Learning, Web Scraping, Sentiment Analysis, Classification, Decision and Prediction Algorithms\n" +
        "• SQL and NoSQL database management including PostgreSQL, MongoDB and Firebase\n" +
        "• Client-server communications with Ktor, file processing, data access\n" +
        "• Participation in competitive programming contests using Java and Kotlin\n\n" +
        "Grade: 9.08",
    },
    linkia: {
      institution: "Linkia FP",
      course: "Specialization in Artificial Intelligence and Big Data",
      period: "February 2026 - December 2026 (expected)",
      location: "Remote",
      description: "Specialization in artificial intelligence and big data, focused on AI engineering and agentic development on top of machine learning and big data foundations.\n\n" +
        "• Hands-on: CNNs (Keras, PyTorch) and house-price models (XGBoost, grid search) served through a Flask API\n" +
        "• Capstone in progress: regression and clustering on 540K e-commerce records\n" +
        "• Modules: AI programming, machine learning systems, applied big data, AI models, big data systems and an AI and big data project\n\n" +
        "Grade: 9",
    },
    upf: {
      institution: "Universitat Pompeu Fabra (UPF)",
      course: "Engineering in Audiovisual Systems",
      period: "2021 - 2022 (discontinued academic program)",
      location: "Barcelona, Spain",
      description: "Degree in engineering in audiovisual systems with a focus on theoretical and practical foundations of computer science, including programming, algorithms, and data structures.",
    },
    rb4: {
      institution: "Ramón Berenguer IV (RB4)",
      course: "Technological Baccalaureate",
      period: "2019 - 2021",
      location: "Santa Coloma de Gramenet, Spain",
      description: "Baccalaureate with a focus on science and technology, preparing for higher studies in engineering and software development.",
    }
  },
  aboutMeSection: {
    title: "About Me",
    personalInfo: "Focused on applied AI software engineering, agentic workflows and AI engineering. My core stack is Python, TypeScript, Vue, Supabase and LLM APIs. I am the solo developer of ProString Manage, a production multi-tenant SaaS platform for racket stringing workshops and tournament management, built with a custom agent harness. I represented my institute in the national ProgramaMe 2024 and 2025 finals, achieving 4th place. Pursuing a Specialization in AI and Big Data while also co-developing Facts: News AI Summary, an Android + Python solution with an end-to-end ETL pipeline for neutral news generation — currently paused but planned to continue.",
    lifestyleInfo: "And the second best decision was starting to train. I enjoy staying active and healthy, maintaining a balanced lifestyle.",
    musicInfo: "I mostly listen to metal, rock, Spanish rap, national rock (Argentinean). I used to listen to electronic music a lot, now that music gives me nostalgia.",
    hobbiesInfo: "As for other hobbies, I used to play Minecraft a lot, but not building or making redstone mechanisms like many programmers I know. I enjoyed the competitive PvP of version 1.7.10. But I'm a normal person, I swear, I also enjoy immersive single-player experiences that offer rich narratives and open-world exploration like The Elder Scrolls saga, Red Dead Redemption, Spore, Atomic Heart, to mention a few.",
    heavyProfile: "You can add me on Hevy, if you're into lifting",
    spotifyPlaylist: "I gift you my playlist"
  },
};