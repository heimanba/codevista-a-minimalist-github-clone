import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css';
import { HomePage } from '@/pages/HomePage';
import { UserProfilePage } from '@/pages/UserProfilePage';
import { RepoPage } from '@/pages/RepoPage';
import { FileViewerPage } from '@/pages/FileViewerPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/:username",
    element: <UserProfilePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/:username/:repo",
    element: <RepoPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/:username/:repo/blob/main/*",
    element: <FileViewerPage />,
    errorElement: <RouteErrorBoundary />,
  },
]);
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);