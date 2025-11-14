import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Github } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
export function HomePage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/${username.trim()}`);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="inline-block p-4 bg-secondary rounded-full mb-6">
          <Github className="h-10 w-10 text-foreground" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight">
          Welcome to CodeVista
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A visually stunning, minimalist clone of GitHub focused on a clean and focused code browsing experience.
        </p>
        <form onSubmit={handleSearch} className="mt-10 max-w-md mx-auto flex items-center gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a GitHub username..."
              className="w-full pl-10 h-12 text-lg"
              aria-label="GitHub username"
            />
          </div>
          <Button type="submit" size="lg" className="h-12">
            Search
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Try searching for <code className="bg-muted px-1.5 py-0.5 rounded-sm">octocat</code> to see it in action.
        </p>
      </motion.div>
    </div>
  );
}