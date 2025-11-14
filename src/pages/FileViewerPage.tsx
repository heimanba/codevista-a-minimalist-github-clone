import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRepoContents } from '@/lib/api';
import { FileContent } from '@/lib/types';
import { MainLayout } from '@/components/layout/MainLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
export function FileViewerPage() {
  const { username, repo, '*': path } = useParams<{ username: string; repo: string; '*': string }>();
  const [file, setFile] = useState<FileContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!username || !repo || !path) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRepoContents(username, repo, path);
        if ('content' in data) {
          setFile(data);
        } else {
          throw new Error('Path is a directory, not a file.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username, repo, path]);
  const pathSegments = path?.split('/').filter(Boolean) || [];
  const renderLoading = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      <Skeleton className="h-8 w-3/4" />
      <Card><CardContent className="p-0"><Skeleton className="h-[600px] w-full" /></CardContent></Card>
    </div>
  );
  if (loading) {
    return <MainLayout>{renderLoading()}</MainLayout>;
  }
  if (error || !file) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-destructive">Error</h2>
          <p className="text-muted-foreground mt-2">{error || 'File not found.'}</p>
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
            <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/${username}/${repo}`}>{repo}</Link></BreadcrumbLink></BreadcrumbItem>
            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1;
              const href = `/${username}/${repo}/blob/main/${pathSegments.slice(0, index + 1).join('/')}`;
              return (
                <React.Fragment key={segment}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <span className="font-medium text-foreground">{segment}</span>
                    ) : (
                      <BreadcrumbLink asChild><Link to={href}>{segment}</Link></BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <SyntaxHighlighter language="auto" style={vscDarkPlus} showLineNumbers customStyle={{ margin: 0, borderRadius: 0 }}>
              {file.content}
            </SyntaxHighlighter>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}