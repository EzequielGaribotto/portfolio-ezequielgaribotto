import dynamic from 'next/dynamic';
import { Project } from '../../models/Project';

const ProjectCardComponent = dynamic(() => import('./ProjectCard').then(mod => mod.default), {
  loading: () => (
    <div className="project-card-skeleton bg-secondary rounded-lg shadow-md p-4 animate-pulse">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      <div className="flex justify-start mt-4">
        <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full ml-2"></div>
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
