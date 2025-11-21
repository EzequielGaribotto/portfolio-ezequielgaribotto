/**
 * Technology abbreviations and their full forms
 * Used to expand search terms so users can search by abbreviation or full name
 */
export const TECH_SYNONYMS: Record<string, string[]> = {
  // Machine Learning & AI
  'ML': ['Machine Learning'],
  'AI': ['Artificial Intelligence'],
  'NLP': ['Natural Language Processing'],
  'CV': ['Computer Vision'],
  'DL': ['Deep Learning'],
  'RL': ['Reinforcement Learning'],
  'NN': ['Neural Network', 'Neural Networks'],
  'CNN': ['Convolutional Neural Network'],
  'RNN': ['Recurrent Neural Network'],
  'GAN': ['Generative Adversarial Network'],
  'LLM': ['Large Language Model'],
  
  // Web Technologies
  'HTML': ['HyperText Markup Language'],
  'CSS': ['Cascading Style Sheets'],
  'JS': ['JavaScript'],
  'TS': ['TypeScript'],
  'API': ['Application Programming Interface'],
  'REST': ['Representational State Transfer', 'RESTful'],
  'HTTP': ['HyperText Transfer Protocol'],
  'HTTPS': ['HyperText Transfer Protocol Secure'],
  'DOM': ['Document Object Model'],
  'SPA': ['Single Page Application'],
  'SSR': ['Server-Side Rendering'],
  'CSR': ['Client-Side Rendering'],
  'SSG': ['Static Site Generation'],
  'PWA': ['Progressive Web App'],
  'AJAX': ['Asynchronous JavaScript and XML'],
  'JSON': ['JavaScript Object Notation'],
  'XML': ['Extensible Markup Language'],
  'YAML': ['YAML Ain\'t Markup Language'],
  
  // Frameworks & Libraries
  'React': ['ReactJS', 'React.js'],
  'Vue': ['VueJS', 'Vue.js'],
  'Next': ['NextJS', 'Next.js'],
  'Express': ['ExpressJS', 'Express.js'],
  'Node': ['NodeJS', 'Node.js'],
  'TF': ['TensorFlow'],
  
  // Databases
  'DB': ['Database'],
  'SQL': ['Structured Query Language'],
  'NoSQL': ['Not Only SQL'],
  'RDBMS': ['Relational Database Management System'],
  'ORM': ['Object-Relational Mapping'],
  
  // DevOps & Tools
  'CI': ['Continuous Integration'],
  'CD': ['Continuous Deployment', 'Continuous Delivery'],
  'CD/CI': ['Continuous Integration/Continuous Deployment'],
  'CI/CD': ['Continuous Integration/Continuous Deployment'],
  'AWS': ['Amazon Web Services'],
  'GCP': ['Google Cloud Platform'],
  'VM': ['Virtual Machine'],
  'CLI': ['Command Line Interface'],
  'GUI': ['Graphical User Interface'],
  'IDE': ['Integrated Development Environment'],
  'VCS': ['Version Control System'],
  'Git': ['GitHub', 'GitLab'],
  
  // Programming Concepts
  'OOP': ['Object-Oriented Programming'],
  'FP': ['Functional Programming'],
  'TDD': ['Test-Driven Development'],
  'BDD': ['Behavior-Driven Development'],
  'MVC': ['Model-View-Controller'],
  'MVVM': ['Model-View-ViewModel'],
  'SOLID': ['Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion'],
  'DRY': ['Don\'t Repeat Yourself'],
  'KISS': ['Keep It Simple, Stupid'],
  
  // Data & Analytics
  'ETL': ['Extract, Transform, Load'],
  'BI': ['Business Intelligence'],
  'OLAP': ['Online Analytical Processing'],
  'OLTP': ['Online Transaction Processing'],
  
  // Security
  'SSL': ['Secure Sockets Layer'],
  'TLS': ['Transport Layer Security'],
  'JWT': ['JSON Web Token'],
  'OAuth': ['Open Authorization'],
  '2FA': ['Two-Factor Authentication'],
  'MFA': ['Multi-Factor Authentication'],
  'XSS': ['Cross-Site Scripting'],
  'CSRF': ['Cross-Site Request Forgery'],
  'CORS': ['Cross-Origin Resource Sharing'],
  
  // Mobile & Desktop
  'iOS': ['iPhone OS'],
  'UI': ['User Interface'],
  'UX': ['User Experience'],
  'RWD': ['Responsive Web Design'],
  
  // Other
  'SEO': ['Search Engine Optimization'],
  'CMS': ['Content Management System'],
  'CRM': ['Customer Relationship Management'],
  'ERP': ['Enterprise Resource Planning'],
  'SaaS': ['Software as a Service'],
  'PaaS': ['Platform as a Service'],
  'IaaS': ['Infrastructure as a Service'],
  'IoT': ['Internet of Things'],
  'AR': ['Augmented Reality'],
  'VR': ['Virtual Reality'],
  'QA': ['Quality Assurance'],
  'GDPR': ['General Data Protection Regulation'],
};

/**
 * Expand search term to include synonyms
 * For example: "ML" -> ["ML", "Machine Learning"]
 */
export function expandSearchTerm(term: string): string[] {
  const trimmedTerm = term.trim();
  const upperTerm = trimmedTerm.toUpperCase();
  
  // Check if the uppercase version exists in our synonyms
  if (TECH_SYNONYMS[upperTerm]) {
    return [trimmedTerm, ...TECH_SYNONYMS[upperTerm]];
  }
  
  // Check if the term matches any synonym (case insensitive)
  for (const [abbreviation, synonyms] of Object.entries(TECH_SYNONYMS)) {
    const allVariants = [abbreviation, ...synonyms];
    if (allVariants.some(variant => variant.toLowerCase() === trimmedTerm.toLowerCase())) {
      // Return the abbreviation and all its synonyms
      return [abbreviation, ...synonyms, trimmedTerm];
    }
  }
  
  // No synonyms found, return original term
  return [trimmedTerm];
}

/**
 * Check if a text matches any of the search terms with proper word boundaries
 */
export function matchesWithSynonyms(text: string, searchTerm: string): boolean {
  const expandedTerms = expandSearchTerm(searchTerm);
  
  return expandedTerms.some(term => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // For short terms (1-3 chars), use strict word boundary
    if (term.length <= 3) {
      const regex = new RegExp(`\\b${escapedTerm}\\b`, 'i');
      return regex.test(text);
    }
    
    // For longer terms, allow partial matches but with word boundaries
    const regex = new RegExp(`\\b${escapedTerm}`, 'i');
    return regex.test(text);
  });
}

/**
 * Get all matching terms from expanded synonyms for highlighting
 */
export function getMatchingTerms(text: string, searchTerm: string): string[] {
  const expandedTerms = expandSearchTerm(searchTerm);
  const matches: string[] = [];
  
  for (const term of expandedTerms) {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // For short terms (1-3 chars), use strict word boundary
    if (term.length <= 3) {
      const regex = new RegExp(`\\b${escapedTerm}\\b`, 'i');
      if (regex.test(text)) {
        matches.push(term);
      }
    } else {
      // For longer terms, allow partial matches but with word boundaries
      const regex = new RegExp(`\\b${escapedTerm}`, 'i');
      if (regex.test(text)) {
        matches.push(term);
      }
    }
  }
  
  return matches;
}
