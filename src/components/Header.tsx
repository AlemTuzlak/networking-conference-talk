/**
 * Header Component
 */

import { navigate } from "../router";

export function Header({ onNewNote }: { onNewNote?: () => void }) {
  const handleNewNote = () => {
    if (onNewNote) {
      onNewNote();
    } else {
      navigate("/notes/new", { viewTransition: true });
    }
  };

  const handleLogoClick = (e: Event) => {
    e.preventDefault();
    navigate("/", { viewTransition: true });
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <a href="/" data-link onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Notes</h1>
        </a>

        <button
          onClick={handleNewNote}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New
        </button>
      </div>
    </header>
  );
}
