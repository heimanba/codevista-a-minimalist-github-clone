import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
export function MainLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    if (username.trim()) {
      navigate(`/${username.trim()}`);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <Github className="h-7 w-7 text-foreground" />
              <span className="font-bold text-lg font-display">CodeVista</span>
            </Link>
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  name="username"
                  placeholder="Search users..."
                  className="pl-10 w-48 md:w-64"
                />
              </form>
              <Button variant="outline" size="sm" onClick={() => window.open('https://github.com/octocat', '_blank')}>
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Built with ❤️ at Cloudflare. The source code is available on GitHub.
          </p>
        </div>
      </footer>
    </div>
  );
}