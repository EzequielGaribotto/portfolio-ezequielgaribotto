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
    training: "Training"
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
    sourceCode: "View source code",
    logo: "Visit my GitHub profile",
    expandImage: "Expand image",
    closeImage: "Close image"
  },
  footer: {
    disclaimer: "© 2025 Ezequiel Garibotto.",
    githubLink: "GitHub repo"
  },
  aboutMe: {
    title: "Ezequiel Garibotto",
    description: "Multiplatform app developer | Junior software developer",
    photoAlt: "Photo of Ezequiel Garibotto"
  },
  cv: {
    download: "Download CV",
    spanish: "Spanish CV",
    english: "English CV",
    preview: "Preview CV",
    unableToDisplay: "Unable to display PDF file.",
    downloadInstead: "Download Instead",
    lastUpdated: "Last updated" // Add this new key
  },
  projects: {
    title: "Projects",
    current: "present",
    neutralNews: {
      title: "Neutral News",
      description: "Application under development that collects news from multiple Spanish media, groups them by topic and generates a neutral version of the events, with the aim of combating media bias through the combination of algorithms and advanced artificial intelligence techniques.",
      footer: "Academic project continuation",
      startDate: "December 2024"
    },
    eulix: {
      title: "Eulix App",
      description: "Android development of an app designed to recommend content (movies, series) based on user personality, mood, and preferences.",
      footer: "Internship",
      startDate: "October 2024",
      endDate: "April 2025"
    },
    competitiveProgramming: {
      title: "Competitive Programming",
      description: "Participation in competitive programming contests in teams, representing the institute, finishing fourth in the national contest. Problems solved on JO-EL and AceptaElReto for the ProgramaMe 2024 contest.",
      footer: "Academic Elective",
      startDate: "September 2023"
    },
    rickAndMorty: {
      title: "Efficient API List",
      description: "Typical API List App, but made in Android with Java8, DataBinding, Caché, Pagination, SDK-Like architecture, Quick response times and simple efficiency tracking",
      footer: "Technical Interview",
      startDate: "April 2025",
      endDate: "April 2025"
    }
  },
  experiences: {
    title: "Work experience",
    eulix: {
      company: "Eulix",
      position: "Junior Android Developer",
      period: "October 2024 - April 2025 (7 months)",
      description: "Development of an application with the objective of recommending content (movies, series), based on the user's personality, mood and preferences.\n" +
        "— Chatbot development (Virtual Assistant), Onboarding, How It Works section.\n" +
        "— UI and UX design and enhancements, with LiveData, DataBinding and XML layout. Idea generation and search for constant improvement.\n" +
        "— RESTful API integration with Retrofit in collaboration with the back-end.\n" +
        "— Coordination with an international team in India.",

      location: "Spain · Hybrid",
    },
    telus: {
      company: "TELUS Digital",
      position: "Online Data/Maps Analyst",
      period: "July 2023 - January 2025 (1 year 7 months)",
      description: "Classified, evaluated, and organized searches (queries), audio, video, images, and data of all kinds using professional English, general culture, and digital competence.",
      location: "Spain · Fully Remote",
    },
  },
  training: {
    title: "Academic training",
    itb: {
      institution: "Institut Tecnològic de Barcelona (ITB)",
      course: "Cross-Platform Application Development - Intelligent Systems",
      period: "2023 - 2025",
      location: "Nou Barris, Barcelona, Spain",

      description: "Higher vocational degree in cross-platform mobile and web application development, focusing on modern technologies and agile practices.\n\n" +
        "— Kotlin, Jetpack Compose / XML, Retrofit for Android development\n" +
        "— Machine Learning, Web Scraping, Sentiment Analysis, Classification, Decision and Prediction Algorithms\n" +
        "— SQL and NoSQL database management including PostgreSQL, MongoDB and Firebase\n" +
        "— Client-server communications with Ktor, file processing, data access\n" +
        "— Participation in competitive programming contests using Java and Kotlin\n\n" +
        "Grade: 9.01",
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
};