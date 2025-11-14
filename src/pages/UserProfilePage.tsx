import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, getUserRepos } from '@/lib/api';
import { User, Repository } from '@/lib/types';
import { MainLayout } from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { RepoCard } from '@/components/RepoCard';
import { Users, GitBranch } from 'lucide-react';
export function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!username) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [userData, reposData] = await Promise.all([
          getUser(username),
          getUserRepos(username),
        ]);
        setUser(userData);
        setRepos(reposData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);
  const renderLoading = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="flex-shrink-0 w-full md:w-64 flex flex-col items-center md:items-start">
          <Skeleton className="h-48 w-48 rounded-full" />
          <Skeleton className="h-8 w-40 mt-4" />
          <Skeleton className="h-5 w-32 mt-2" />
          <Skeleton className="h-12 w-full mt-4" />
        </div>
        <div className="flex-1 w-full">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  if (loading) {
    return <MainLayout>{renderLoading()}</MainLayout>;
  }
  if (error) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-destructive">Error</h2>
          <p className="text-muted-foreground mt-2">{error}</p>
        </div>
      </MainLayout>
    );
  }
  if (!user) {
    return <MainLayout><div className="text-center py-20">User not found.</div></MainLayout>;
  }
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <aside className="flex-shrink-0 w-full md:w-64 flex flex-col items-center md:items-start">
            <Avatar className="h-48 w-48 border-4 border-background shadow-lg">
              <AvatarImage src={user.avatar_url} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
            <p className="text-xl text-muted-foreground">{user.login}</p>
            <p className="mt-4 text-center md:text-left">{user.bio}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <b>{user.followers}</b> followers
              </div>
              <span>·</span>
              <div><b>{user.following}</b> following</div>
            </div>
          </aside>
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-6 flex items-center gap-2">
              <GitBranch className="h-6 w-6" />
              Repositories
            </h2>
            {repos.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border rounded-lg bg-muted/50">
                <p className="text-muted-foreground">This user has no public repositories.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}