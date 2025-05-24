import dynamic from 'next/dynamic';
import { Project } from '../../../../models/Project';

// Dynamic import with a more detailed loading skeleton
const ProjectCardComponent = dynamic(() => import('./ProjectCard').then(mod => mod.default), {
  loading: () => (
    <div className="project-card bg-secondary text-foreground border border-secondary-hover rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 ease-in-out">
      {/* Title skeleton */}
      <div className="project-title text-lg font-bold mb-2">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto transition-colors duration-300"></div>
      </div>
      
      {/* Description skeleton */}
      <div className="project-description text-sm mt-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-1.5 transition-colors duration-300"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-1.5 transition-colors duration-300"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/5 transition-colors duration-300"></div>
      </div>
      
      {/* Date skeleton */}
      <div className="project-date text-xs font-semibold mb-2 text-right mt-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3 inline-block transition-colors duration-300"></div>
      </div>
      
      {/* Image container skeleton */}
      <div className="project-image-container mt-3">
        <div className="project-image-wrapper">
          {/* Image placeholder */}
          <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg w-full transition-colors duration-300"></div>
        </div>
        
        {/* Footer skeleton */}
        <div className="project-footer text-xs mt-2 italic">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 transition-colors duration-300"></div>
        </div>
      </div>
      
      {/* Links skeleton */}
      <div className="project-links flex mt-4 space-x-2">
        <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors duration-300"></div>
        <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors duration-300"></div>
      </div>
    </div>
  )
});

interface LazyProjectCardProps {
  project: Project;
}

export default function LazyProjectCard({ project }: LazyProjectCardProps) {
  return <ProjectCardComponent project={project} />;
}
