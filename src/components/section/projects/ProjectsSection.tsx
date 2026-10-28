"use client";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import LazyProjectCard from "./card/LazyProjectCard";
import MasonryItem from "./MasonryItem";
import ProjectSearch from "./ProjectSearch";
import SearchResults from "./SearchResults";
import { useTranslation } from "../../../context/TranslationContext";
import { useProjectSearch, SortBy } from "../../../hooks/useProjectSearch";
import { Project } from "../../../models/Project";
import { descendants } from "../../../constants/techTaxonomy";
import styles from './ProjectsSection.module.css';
import Section from "../Section";

export default function ProjectsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [chipHover, setChipHover] = useState<string | null>(null);

  const eulixTech = ["Android", "Kotlin", "UI", "UX", "Retrofit", "DataBinding", "MVVM", "XML", "Kotlin DSL", "LiveData", "Git", "Agile", "RESTful API", "International Team"];
  const neutralNewsTech = ["Applied AI", "AI Engineering", "Data Engineering", "Python", "Pandas", "NumPy", "BeautifulSoup", "LLM", "Generative AI", "Machine Learning", "Embeddings", "Clustering", "NLP", "ETL", "Scraping", "Crawling", "Parsing", "Back-end", "Google Cloud Platform", "Docker", "Firebase", "NoSQL", "Front-end", "UI", "UX", "Google Colab", "Jupyter Notebooks", "Android", "Kotlin", "Hilt", "Dagger", "Room", "DAO", "Datastore"];
  const compTech = ["Java", "Algorithms", "Data Structures", "Problem Solving"];
  const apiListTech = ["Android", "Java", "UX", "Caching", "Coroutines", "Android SDK"];
  const zombTech = ["Game Development", "UX", "Python", "MakeCode Arcade", "Collision Detection", "Retro Gaming"];
  const cronTech = ["Front-end", "UX", "React", "TypeScript", "Vite", "CSS", "JavaScript", "HTML", "Web", "useEffect"];
  const mapsTech = ["Android", "UI", "UX", "Kotlin", "Firebase", "Google Maps API", "CRUD", "Authentication", "Database"];
  const portfolioTech = ["Front-end", "UI", "UX", "React", "Next.js", "TypeScript", "TailwindCSS", "Portfolio", "Node.js", "Web Development", "Responsive Design", "Theme Switching", "Multi-language"];
  const peleaDeGallosTech = ["Back-end", "Front-end", "Kotlin", "Ktor", "UI", "UX", "Client-server Communication", "File processing", "Data access", "NoSQL", "MongoDB"];
  const hackerNewsAPITech = ["Back-end", "Python", "FastAPI", "Web Scraping", "API", "Docker", "TDD", "Caching", "Data Processing"];
  const barcelonaInequalityTech = ["Python", "Machine Learning", "Exploratory Data Analysis (EDA)", "Classification", "Statistical Analysis", "Data Processing", "Data Visualization", "Pandas", "NumPy", "Google Colab", "Jupyter Notebooks", "Socioeconomic Analysis"];
  const ctennisstudioTech = ["Front-end", "React", "Next.js", "TypeScript", "TailwindCSS", "Vercel", "UI", "UX", "Responsive Design", "SEO", "Web Development", "Professional Services"];
  const shoppingCartChatbotTech = ["Applied AI", "Python", "LLM", "LangGraph", "LangChain", "Conversational AI", "Chatbot", "NLP", "AI Integration", "Pydantic", "Pytest"];
  const iaBigDataTech = ["AI Engineering", "Machine Learning", "Deep Learning", "Exploratory Data Analysis (EDA)", "Python", "scikit-learn", "XGBoost", "Random Forest", "Gradient Boosting", "Keras", "TensorFlow", "PyTorch", "Neural Networks", "Computer Vision", "Hyperparameter Tuning", "K-Means", "KNN", "Clustering", "Regression", "Predictive Modeling", "Flask", "Pandas", "Polars", "PySpark", "MongoDB", "Big Data", "Data Processing", "Data Visualization", "Data Science", "Jupyter Notebooks"];
  const proStringTech = ["Applied AI", "Agentic AI", "Agentic Development", "Data Engineering", "Agent Harness", "MCP", "Claude Code", "Subagents", "Vue 3", "TypeScript", "Back-end", "Front-end", "Supabase", "PostgreSQL", "PL/pgSQL", "Edge Functions", "Deno", "Serverless", "RPC", "Row Level Security", "RBAC", "MFA", "Multi-tenant", "SaaS", "Stripe", "Invoicing", "pg_cron", "Realtime", "Pinia", "Vite", "Playwright", "Vitest", "GitHub Actions", "CI/CD", "Zod", "ECharts", "ESC/POS", "QZ Tray", "i18n", "UX", "UI", "CSS", "SQL", "Data Processing", "Git"];

  const projects: Project[] = [
    {
      id: "neutral-news",
      title: t("projects.neutralNews.title"),
      description: t("projects.neutralNews.description"),
      footer: t("projects.neutralNews.footer"),
      startDate: t("projects.neutralNews.startDate"),
      endDate: null,
      image: "/images/projects/neutral-news-homeview.webp",
      images: [
        "/images/projects/neutral-news-homeview.webp",
        "/images/projects/neutral-news-article.webp",
        "/images/projects/neutral-news-footer.webp",
        "/images/projects/neutral-news-source.webp",
      ],
      technologies: neutralNewsTech,
      repoLink: "https://github.com/EzequielGaribotto/neutral-news-android",
      websiteLink: t("projects.neutralNews.websiteLink"),
      appStoreLink: "https://apps.apple.com/us/app/facts-news-summary/id6748583935",
      weight: 3
    },
    {
      id: "prostring",
      title: t("projects.prostring.title"),
      description: t("projects.prostring.description"),
      footer: t("projects.prostring.footer"),
      startDate: t("projects.prostring.startDate"),
      endDate: null,
      image: "/images/projects/prostring.webp",
      technologies: proStringTech,
      repoLink: "https://github.com/EzequielGaribotto/prostring-releases",
      websiteLink: "https://prostringmanage.com/",
      weight: 1,
      experienceId: "prostring"
    },
    {
      id: "ia-bigdata",
      title: t("projects.iaBigData.title"),
      description: t("projects.iaBigData.description"),
      footer: t("projects.iaBigData.footer"),
      startDate: t("projects.iaBigData.startDate"),
      endDate: null,
      image: "/images/projects/ia-bigdata.webp",
      technologies: iaBigDataTech,
      repoLink: "https://github.com/EzequielGaribotto/IA-BigData",
      documents: [
        { id: "ames", label: t("projects.iaBigData.docs.ames"), file: "/docs/ia-bigdata/ames-housing-price-prediction.pdf", pages: 34, technologies: ["Python", "Machine Learning", "scikit-learn", "XGBoost", "Random Forest", "Gradient Boosting", "Hyperparameter Tuning", "Regression", "Predictive Modeling", "Flask", "Pandas", "Data Visualization"] },
        { id: "keras", label: t("projects.iaBigData.docs.keras"), file: "/docs/ia-bigdata/cnn-keras-tensorflow.pdf", pages: 23, technologies: ["Python", "Deep Learning", "Neural Networks", "Computer Vision", "Keras", "TensorFlow", "Data Visualization"] },
        { id: "pytorch", label: t("projects.iaBigData.docs.pytorch"), file: "/docs/ia-bigdata/cnn-pytorch.pdf", pages: 18, technologies: ["Python", "Deep Learning", "Neural Networks", "Computer Vision", "PyTorch", "Data Visualization"] },
        { id: "sklearn", label: t("projects.iaBigData.docs.sklearn"), file: "/docs/ia-bigdata/mlp-scikit-learn.pdf", pages: 5, technologies: ["Python", "Machine Learning", "Neural Networks", "scikit-learn"] },
      ],
      weight: 1
    },
    {
      id: "ctennisstudio",
      title: t("projects.ctennisstudio.title"),
      description: t("projects.ctennisstudio.description"),
      footer: t("projects.ctennisstudio.footer"),
      startDate: t("projects.ctennisstudio.startDate"),
      endDate: null,
      image: "/images/projects/ctennisstudio.webp",
      technologies: ctennisstudioTech,
      repoLink: "https://github.com/EzequielGaribotto/ctennisstudio",
      websiteLink: "https://ctenisstudio.com/",
      weight: 5
    },
    {
      id: "eulix",
      title: t("projects.eulix.title"),
      description: t("projects.eulix.description"),
      footer: t("projects.eulix.footer"),
      startDate: t("projects.eulix.startDate"),
      endDate: t("projects.eulix.endDate"),
      image: "/images/projects/eulix.webp",
      technologies: eulixTech,
      playStoreLink: "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US",
      weight: 5
    },
    {
      id: "competitive-programming",
      title: t("projects.competitiveProgramming.title"),
      description: t("projects.competitiveProgramming.description"),
      footer: t("projects.competitiveProgramming.footer"),
      startDate: t("projects.competitiveProgramming.startDate"),
      endDate: t("projects.competitiveProgramming.endDate"),
      image: "/images/projects/competitive.webp",
      technologies: compTech,
      repoLink: "https://github.com/EzequielGaribotto/CompetitiveProgramming",
      programameLink: "https://programame.com/2024/nac/",
      weight: 3
    },
    {
      id: "barcelona-inequality",
      title: t("projects.barcelonaInequality.title"),
      description: t("projects.barcelonaInequality.description"),
      footer: t("projects.barcelonaInequality.footer"),
      startDate: t("projects.barcelonaInequality.startDate"),
      endDate: t("projects.barcelonaInequality.endDate"),
      image: "/images/projects/desigualtat-als-barris-de-bcn.webp",
      technologies: barcelonaInequalityTech,
      repoLink: "https://colab.research.google.com/drive/17Ibyj89o9AToz5l6mjQa0O3dmmpx3JNx",
      presentationLink: "https://view.genially.com/67e0341f1bb26cf1dc8eba42/presentation-ezequiel-garibotto-anastasiia-levkina-desigualtat-als-barris-de-bcn",
      weight: 4
    },
    {
      id: "rick-and-morty-api-list",
      title: t("projects.rickAndMorty.title"),
      description: t("projects.rickAndMorty.description"),
      footer: t("projects.rickAndMorty.footer"),
      startDate: t("projects.rickAndMorty.startDate"),
      endDate: t("projects.rickAndMorty.endDate"),
      image: "/images/projects/api-list.webp",
      technologies: apiListTech,
      repoLink: "https://github.com/EzequielGaribotto/Ricky-and-Morty-API",
      weight: 9
    },
    {
      id: "hackernews-api",
      title: t("projects.hackerNewsAPI.title"),
      description: t("projects.hackerNewsAPI.description"),
      footer: t("projects.hackerNewsAPI.footer"),
      startDate: t("projects.hackerNewsAPI.startDate"),
      endDate: t("projects.hackerNewsAPI.endDate"),
      image: "/images/projects/hackernews.webp",
      technologies: hackerNewsAPITech,
      repoLink: "https://github.com/EzequielGaribotto/HackerNews-Scraper-API",
      weight: 10
    },
    {
      id: "zomb",
      title: t("projects.zomb.title"),
      description: t("projects.zomb.description"),
      footer: t("projects.zomb.footer"),
      startDate: t("projects.zomb.startDate"),
      endDate: t("projects.zomb.endDate"),
      image: "/images/projects/zomb.webp",
      technologies: zombTech,
      repoLink: "https://github.com/EzequielGaribotto/zomb",
      arcadeLink: "https://ezequielgaribotto.github.io/zomb/",
      weight: 8
    },
    {
      id: "cron-schedule-editor",
      title: t("projects.cronScheduleEditor.title"),
      description: t("projects.cronScheduleEditor.description"),
      footer: t("projects.cronScheduleEditor.footer"),
      startDate: t("projects.cronScheduleEditor.startDate"),
      endDate: t("projects.cronScheduleEditor.endDate"),
      image: "/images/projects/cron-schedule-editor.webp",
      technologies: cronTech,
      repoLink: "https://github.com/EzequielGaribotto/cron-schedule-editor",
      weight: 11
    },
    {
      id: "portfolio-website",
      title: t("projects.portfolioWebsite.title"),
      description: t("projects.portfolioWebsite.description"),
      footer: t("projects.portfolioWebsite.footer"),
      startDate: t("projects.portfolioWebsite.startDate"),
      endDate: t("projects.portfolioWebsite.endDate"),
      image: "/images/projects/portfolio.webp",
      technologies: portfolioTech,
      repoLink: "https://github.com/EzequielGaribotto/portfolio-ezequielgaribotto",
      websiteLink: "https://ezequielgaribotto.com",
      weight: 12
    },
    {
      id: "shoppingcart-chatbot",
      title: t("projects.shoppingCartChatbot.title"),
      description: t("projects.shoppingCartChatbot.description"),
      footer: t("projects.shoppingCartChatbot.footer"),
      startDate: t("projects.shoppingCartChatbot.startDate"),
      endDate: t("projects.shoppingCartChatbot.endDate"),
      image: "/images/projects/shoppingcart-chatbot.webp",
      technologies: shoppingCartChatbotTech,
      repoLink: "https://github.com/EzequielGaribotto/LangGraph-ShoppingCart-Chatbot",
      weight: 6
    },
    {
      id: "maps-app",
      title: t("projects.mapsApp.title"),
      description: t("projects.mapsApp.description"),
      footer: t("projects.mapsApp.footer"),
      startDate: t("projects.mapsApp.startDate"),
      endDate: t("projects.mapsApp.endDate"),
      technologies: mapsTech,
      repoLink: "https://github.com/EzequielGaribotto/M08-P4-MapsApp",
      weight: 7
    },
    {
      id: "pelea-de-gallos",
      title: t("projects.peleaDeGallos.title"),
      description: t("projects.peleaDeGallos.description"),
      footer: t("projects.peleaDeGallos.footer"),
      startDate: t("projects.peleaDeGallos.startDate"),
      endDate: t("projects.peleaDeGallos.endDate"),
      technologies: peleaDeGallosTech,
      repoLink: "https://github.com/EzequielGaribotto/PeleaDeGallos",
      weight: 6
    },

  ];

  // Every tag used by any project: lets the filter chips list the concrete technologies behind a generic one
  const allTags = Array.from(new Set(projects.flatMap((p) => p.technologies ?? [])));

  const {
    searchTerm,
    setSearchTerm,
    selectedKeywords,
    setSelectedKeywords,
    filteredProjects,
    hasActiveFilters,
    resultCount,
    totalCount,
    showAllProjects,
    setShowAllProjects,
    sortBy,
    setSortBy
  } = useProjectSearch(projects);

  // Changing the sort re-orders the cards: each one glides to its new place instead of jumping. The browser animates
  // elements that share a view-transition-name between the old and the new layout, so the names are only set for the moment.
  const handleSortChange = (next: SortBy) => {
    const grid = gridRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!grid || reduced || typeof document.startViewTransition !== "function") {
      setSortBy(next);
      return;
    }
    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-card-id]"));
    cards.forEach((card) => {
      card.style.viewTransitionName = `card-${card.dataset.cardId}`;
    });
    const transition = document.startViewTransition(() => {
      flushSync(() => setSortBy(next));
    });
    transition.finished.finally(() => {
      cards.forEach((card) => {
        card.style.viewTransitionName = "";
      });
    });
  };

  return (
    <div ref={sectionRef}>
      <Section
        id="projects"
        title={t("projects.title")}
      >
      <div style={{ width: '100%' }}>
        {/* Search Component */}
        <ProjectSearch
          onSearchChange={setSearchTerm}
          onKeywordsChange={setSelectedKeywords}
          selectedKeywords={selectedKeywords}
          projectTags={allTags}
          suggestionPool={[...allTags, ...projects.map((project) => project.title)]}
          onChipHover={setChipHover}
        />

        {/* Results Counter */}
        <SearchResults
          resultCount={resultCount}
          totalCount={totalCount}
          hasActiveFilters={hasActiveFilters}
          showAllProjects={showAllProjects}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />        {/* Projects Grid */}
        <div className={styles.masonryGrid} ref={gridRef}>
          {filteredProjects.map((project) => (
            <MasonryItem key={project.id} id={project.id}>
              <LazyProjectCard
                project={project}
                searchTerm={searchTerm}
                highlightTags={chipHover ? Array.from(descendants(chipHover)) : undefined}
              />
            </MasonryItem>
          ))}
        </div>
        
        {/* The same switch as the status line, at the end of the list where the next step is obvious */}
        {!hasActiveFilters && (
          <div className={styles.listFooter}>
            <button type="button" className={styles.listToggle} onClick={() => setShowAllProjects(!showAllProjects)}>
              {showAllProjects ? t("search.showLessLink") : t("search.showAllLink")}
            </button>
          </div>
        )}

        {/* No Results Message */}
        {filteredProjects.length === 0 && hasActiveFilters && (
          <div className={styles.noResultsMessage}>
            <p>{t("search.tryAdjusting")}</p>
          </div>
        )}
      </div>
      </Section>
    </div>
  );
}
