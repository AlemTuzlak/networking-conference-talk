/**
 * Home Route - Main notes listing page
 */

import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { StatsCards } from "../components/StatsCards";
import { NoteCard } from "../components/NoteCard";
import type { Note } from "../components/NoteCard";

// Sample notes data
const sampleNotes: Note[] = [
  {
    id: 1,
    title: "Welcome to Notes",
    preview: "Start capturing your thoughts and ideas...",
    date: "Today",
    color: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    id: 2,
    title: "Meeting Notes",
    preview: "Discussed project timeline and key deliverables for Q1...",
    date: "Yesterday",
    color: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    id: 3,
    title: "Ideas",
    preview: "Build a note-taking app with JSX, no React needed!",
    date: "2 days ago",
    color: "bg-green-50 dark:bg-green-950/30",
  },
  {
    id: 4,
    title: "Shopping List",
    preview: "Milk, eggs, bread, coffee beans, fresh vegetables...",
    date: "Last week",
    color: "bg-amber-50 dark:bg-amber-950/30",
  },
];

export function Home() {
  const handleNewNote = () => {
    alert("Creating a new note...");
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // TODO: Implement search functionality
  };

  const stats = {
    total: sampleNotes.length,
    recent: 2,
    categories: 3,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header onNewNote={handleNewNote} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-3">
        <SearchBar onSearch={handleSearch} />
        <StatsCards stats={stats} />

        {/* Notes Grid */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Recent Notes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{sampleNotes.map((note) => NoteCard({ note }))}</div>
        </div>

        {/* Empty state (hidden when there are notes) */}
        {sampleNotes.length === 0 && (
          <div className="mt-8 text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No notes yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start capturing your thoughts by creating your first note
            </p>
            <button
              onClick={handleNewNote}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Note
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
