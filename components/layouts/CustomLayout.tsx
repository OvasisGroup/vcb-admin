// components/CustomLayout.tsx
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function CustomLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl">My Custom Layout</h1>
      </header>
      <main className="p-4">
        {children}
      </main>
      <footer className="bg-blue-500 text-white p-4 mt-auto">
        <p>&copy; 2024 My Website</p>
      </footer>
    </div>
  );
}
