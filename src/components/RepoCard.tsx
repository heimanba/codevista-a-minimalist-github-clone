import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Repository } from '@/lib/types';
import { Star, GitFork, Code } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
interface RepoCardProps {
  repo: Repository;
}
export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="flex flex-col h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1">
      <CardHeader>
        <CardTitle>
          <Link to={`/${repo.owner.login}/${repo.name}`} className="text-primary hover:underline">
            {repo.name}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm pt-1 line-clamp-2 h-[40px]">{repo.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          {repo.language && (
            <div className="flex items-center">
              <Code className="mr-1 h-4 w-4" />
              <span>{repo.language}</span>
            </div>
          )}
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center">
            <GitFork className="mr-1 h-4 w-4" />
            <span>{repo.forks_count}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Updated {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
        </p>
      </CardContent>
    </Card>
  );
}