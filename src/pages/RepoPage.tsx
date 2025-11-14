import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRepo, getRepoContents } from '@/lib/api';
import { Repository, DirectoryContent } from '@/lib/types';
import { MainLayout } from '@/components/layout/MainLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { GitBranch, Folder, FileText, Star, GitFork } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
export function RepoPage() {
  const { username, repo: repoName } = useParams<{ username: string; repo: string }>();
  const [repo, setRepo] = useState<Repository | null>(null);
  const [tree, setTree] = useState<DirectoryContent[]>([]);
  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!username || !repoName) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [repoData, contentsData] = await Promise.all([
          getRepo(username, repoName),
          getRepoContents(username, repoName, ''),
        ]);
        setRepo(repoData);
        if (Array.isArray(contentsData)) {
          setTree(contentsData);
          const readmeFile = contentsData.find(item => item.name.toLowerCase() === 'readme.md');
          if (readmeFile) {
            const readmeContent = await getRepoContents(username, repoName, readmeFile.path);
            if ('content' in readmeContent) {
              setReadme(readmeContent.content);
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username, repoName]);
  const renderLoading = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-6 w-1/4" />
      <Card><CardContent className="p-6"><Skeleton className="h-64 w-full" /></CardContent></Card>
      <Card><CardContent className="p-6"><Skeleton className="h-96 w-full" /></CardContent></Card>
    </div>
  );
  if (loading) {
    return <MainLayout>{renderLoading()}</MainLayout>;
  }
  if (error || !repo) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-destructive">Error</h2>
          <p className="text-muted-foreground mt-2">{error || 'Repository not found.'}</p>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/${username}`}>{username}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/${username}/${repoName}`}>{repoName}</Link></BreadcrumbLink></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <GitBranch className="h-7 w-7 text-muted-foreground" />
            {repo.name}
          </h1>
          <p className="text-muted-foreground mt-2">{repo.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1"><Star className="h-4 w-4" /> <b>{repo.stargazers_count}</b> stars</div>
            <div className="flex items-center gap-1"><GitFork className="h-4 w-4" /> <b>{repo.forks_count}</b> forks</div>
          </div>
        </div>
        <Card>
          <CardHeader className="bg-muted/50 border-b px-4 py-2">
            <p className="font-semibold">Files</p>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {tree.map(item => (
                <li key={item.path}>
                  <Link to={`/${username}/${repoName}/blob/main/${item.path}`} className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors">
                    {item.type === 'dir' ? <Folder className="h-5 w-5 text-blue-500" /> : <FileText className="h-5 w-5 text-muted-foreground" />}
                    <span className="font-mono text-sm">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {readme && (
          <Card>
            <CardHeader className="bg-muted/50 border-b px-4 py-2">
              <p className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5" /> README.md</p>
            </CardHeader>
            <CardContent className="p-6">
              <article className="prose dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
              </article>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}