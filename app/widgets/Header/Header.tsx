import { AuthSectionForHeader } from './AuthSectionForHeader';

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-lg font-bold">
          <a href="/">Task Manager</a>
        </div>
        <AuthSectionForHeader />
      </nav>
    </header>
  );
};
