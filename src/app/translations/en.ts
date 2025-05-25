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
    disclaimer: "© 2025 Ezequiel Garibotto. All rights reserved.",
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
    downloadInstead: "Download Instead"
  },
  projects: {
    title: "Projects",
    current: "Present",
    neutralNews: {
      title: "Neutral News",
      description: "Application under development that collects news from multiple Spanish media, groups them by topic and generates a neutral version of the events, with the aim of combating media bias through the combination of algorithms and advanced artificial intelligence techniques.",
      footer: "Academic project continuation",
      startDate: "Dec 2024"
    },
    eulix: {
      title: "Eulix App",
      description: "Android development of an app designed to recommend content (movies, series) based on user personality, mood, and preferences.",
      footer: "Internship",
      startDate: "Oct 2024",
      endDate: "Apr 2025"
    },
    competitiveProgramming: {
      title: "Competitive Programming",
      description: "Participation in competitive programming contests in teams, representing the institute, finishing fourth in the national contest. Problems solved on JO-EL and AceptaElReto for the ProgramaMe 2024 contest.",
      footer: "Academic Elective",
      startDate: "Sep 2023"
    },
    rickAndMorty: {
      title: "Efficient API List",
      description: "Typical API List App, but made in Android with Java8, DataBinding, Caché, Pagination, SDK-Like architecture, Quick response times and simple efficiency tracking",
      footer: "Technical Interview",
      startDate: "Apr 2025",
      endDate: "Apr 2025"
    }
  },
  experiences: {
    title: "Work experience",
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
    },
    telus: {
      company: "TELUS Digital",
      position: "Online Data/Maps Analyst",
      period: "July 2023 - January 2025",
      description: "Classified, evaluated, and organized searches (queries), audio, video, images, and data of all kinds using professional English, general culture, and digital competence.",
      location: "Spain · Fully Remote",
    },
  },
  training: {
    title: "Academic Training",
    itb: {
      institution: "Institut Tecnològic de Barcelona (ITB)",
      course: "Cross-Platform Application Development",
      period: "2023 - 2025",
      location: "Nou Barris, Barcelona, Spain",
      description: "Higher degree in cross-platform mobile and web application development, focusing on modern technologies and agile practices.\n\n" +
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
      period: "2021 - 2022 (abandoned studies)",
      location: "Barcelona, Spain",
      description: "Degree in engineering in audiovisual systems with a focus on theoretical and practical foundations of computer science, including programming, algorithms, and data structures.",
    },
    rb4: {
      institution: "Ramón Berenguer IV (RB4)",
      course: "Technological Baccalaureate",
      period: "2019-2021",
      location: "Santa Coloma de Gramenet, Spain",
      description: "Baccalaureate with a focus on science and technology, preparing for higher studies in engineering and software development.",
    }
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
};