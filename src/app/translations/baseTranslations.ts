// Define base structure for type safety
export const baseTranslations = {
    // Metadata translations
    meta: {
        title: "",
        description: ""
    },
    // Navigation translations
    navigation: {
        profile: "",
        projects: "",
        experience: "",
        training: ""
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
        sourceCode: "",
        logo: "",
        expandImage: "",
        closeImage: "",
        solvedProblems: ""
    },
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
    cv: {
        download: "",
        spanish: "",
        english: "",
        preview: "",
        unableToDisplay: "", // New translation key
        downloadInstead: ""  // New translation key
    },
    // Projects section translations
    projects: {
        title: "",
        current: "",
        // Add index signature to allow for project-specific properties
        neutralNews: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        eulix: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        competitiveProgramming: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        rickAndMorty: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        }
    },
    experiences: {
        title: "",
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
        }
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
        }
    },
    dates: {} as Record<string, string>,
};

export type Translations = typeof baseTranslations;
