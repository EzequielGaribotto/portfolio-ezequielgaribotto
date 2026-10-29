// Define base structure for type safety
export const baseTranslations = {
  // Metadata translations
  meta: {
    title: "",
    description: "",
  },
  // Navigation translations
  navigation: {
    profile: "",
    projects: "",
    experience: "",
    training: "",
    gaming: "",
    contact: "",
  },
  // Tooltip translations
  tooltips: {
    github: "",
    linkedin: "",
    email: "",
    emailCopied: "",
    competition: "",
    playGame: "",
    playStore: "",
    appStore: "",
    sourceCode: "",
    logo: "",
    expandImage: "",
    closeImage: "",
    solvedProblems: "",
    playArcadeGame: "",
    viewPresentation: "",
    viewWebsite: "",
    viewImage: "",
  },
  // Footer translations
  contact: {
    title: "",
    email: "",
  },
  // Image carousel and expanded image controls
  carousel: {
    previous: "",
    next: "",
    goTo: "",
    pause: "",
    play: "",
    imageAlt: "",
    unavailable: "",
  },
  // Accessible names for controls that show only an icon or a symbol
  a11y: {
    home: "",
    menu: "",
    closeMenu: "",
    switchToDark: "",
    switchToLight: "",
    switchToSpanish: "",
    switchToEnglish: "",
    githubRepo: "",
    projectImage: "",
    language: "",
    skipToContent: "",
  },
  footer: {
    disclaimer: "",
    githubLink: "",
  },
  // About Me section translations
  aboutMe: {
    proof: "",
    proofLink: "",
    title: "",
    description: "",
    photoAlt: "",
    availability: "",
    scopesLabel: "",
  },
  cv: {
    download: "",
    spanish: "",
    english: "",
    english_ats: "",
    preview: "",
    unableToDisplay: "", // New translation key
    downloadInstead: "", // New translation key
    lastUpdated: "", // Add missing lastUpdated key to fix TypeScript error,
    otherVersions: "",
    downloadAts: "",
  },
  // Hover explanations for scope tags
  tagHints: {
    appliedAI: "",
    aiEngineering: "",
    agenticAI: "",
    agenticDevelopment: "",
    dataEngineering: "",
  },
  // Hover on a generic technology tag: the concrete technologies used under it
  techHints: {
    inProject: "",
    inProgram: "",
    acrossProjects: "",
  },
  tagExamples: {
    appliedAI: "",
    aiEngineering: "",
    agenticAI: "",
    agenticDevelopment: "",
    dataEngineering: "",
  },
  // Per-project examples (shown when hovering a tag inside that project's card)
  projectTagHints: {} as Record<string, Record<string, string>>,
  // Collapsible tag lists on cards
  scopeStatus: {
    planned: "",
    inProgress: "",
    noneBuilt: "",
  },
  links: {
    source: "",
    solved: "",
    website: "",
    playStore: "",
    appStore: "",
    play: "",
    competition: "",
    presentation: "",
  },
  tags: {
    showMore: "",
    showLess: "",
  },
  // Project documents (PDF preview / download)
  documents: {
    preview: "",
    download: "",
    close: "",
    pages: "",
    inSpanish: "",
  },
  // Search functionality translations
  search: {
    scopeLabel: "",
    techLabel: "",
    placeholder: "",
    clearFilters: "",
    noResults: "",
    showingAll: "",
    showingLimited: "",
    showingFiltered: "",
    filtered: "",
    tryAdjusting: "",
    showAllLink: "",
    showLessLink: "",
    sortBy: "",
    sortByRelevance: "",
    sortByDate: "",
    byRelevance: "",
    byDate: "",
    explainerLabel: "",
  },
  // Projects section translations
  projects: {
    title: "",
    current: "",
    since: "",
    // Add index signature to allow for project-specific properties
    neutralNews: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
      websiteLink: string;
    },
    ctennisstudio: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },
    eulix: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },
    competitiveProgramming: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },
    rickAndMorty: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },
    zomb: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },
    cronScheduleEditor: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },
    mapsApp: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },
    portfolioWebsite: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },
    peleaDeGallos: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },
    hackerNewsAPI: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },
    barcelonaInequality: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },
    shoppingCartChatbot: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },
    iaBigData: {} as {
      title: string;
      description: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
      docs?: { ames: string; keras: string; pytorch: string; sklearn: string };
      docShort?: { ames: string; keras: string; pytorch: string; sklearn: string };
    },
    prostring: {} as {
      title: string;
      description: string;
      summary: string;
      footer: string;
      startDate: string;
      endDate?: string | null;
    },

    readMoreExperience: "",
    showAllProjects: "",
    showLess: "",
  },
  experiences: {
    title: "",
    seidor: {
      company: "",
      position: "",
      period: "",
      location: "",
      description: "",
    },
    eulix: {
      company: "",
      position: "",
      period: "",
      location: "",
      description: "",
    },
    telus: {
      company: "",
      position: "",
      period: "",
      location: "",
      description: "",
    },
    prostring: {
      company: "",
      position: "",
      period: "",
      location: "",
      description: "",
    },
  },
  training: {
    title: "",
    itb: {
      institution: "",
      course: "",
      period: "",
      location: "",
      description: "",
    },
    linkia: {
      institution: "",
      course: "",
      period: "",
      location: "",
      description: "",
    },
    upf: {
      institution: "",
      course: "",
      period: "",
      location: "",
      description: "",
    },
    rb4: {
      institution: "",
      course: "",
      period: "",
      location: "",
      description: "",
    },
  },
  aboutMeSection: {
    title: "",
    personalInfo: "",
    lifestyleInfo: "",
    musicInfo: "",
    hobbiesInfo: "",
    heavyProfile: "",
    spotifyPlaylist: "",
  },
};

export type Translations = typeof baseTranslations;
