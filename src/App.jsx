import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './ui/Layout';
import ErrorBoundary from './ui/ErrorBoundary';
import { routes, PageFor } from './routes';

export function AppRoutes() {
  return (
    <Layout>
      <ErrorBoundary>
        <Routes>
          {routes.map((r) => <Route key={r.path} path={r.path} element={<PageFor path={r.path} />} />)}
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </ErrorBoundary>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
