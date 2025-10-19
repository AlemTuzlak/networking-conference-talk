/**
 * Home Route - Main notes listing page
 */

import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { StatsCards } from "../components/StatsCards";
import { NoteCard } from "../components/NoteCard";
import { getAllNotes } from "../store/notes";
import { navigate } from "../router";
import { subscribeToBroadcast } from "../utils/broadcast";

export async function Home() {
  // Get search query from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search") || "";

  // Fetch all notes data
  const allNotes = await getAllNotes();

  // Filter notes based on search query
  const notes = searchQuery
    ? allNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allNotes;

  const handleNewNote = () => {
    navigate("/notes/new", { viewTransition: true });
  };

  const stats = {
    total: allNotes.length,
    recent: allNotes.filter((n) => Date.now() - n.updatedAt < 172800000).length,
  };

  subscribeToBroadcast((message) => {
    if (message.type === "note-created" || message.type === "note-updated" || message.type === "note-deleted") {
      // Refresh the page by triggering a page refresh
      function refresh() {
        window.location.reload();
      }
      refresh();
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header onNewNote={handleNewNote} />
      <main className="max-w-7xl mx-auto px-4 py-3">
        <SearchBar defaultValue={searchQuery} />
        <StatsCards stats={stats} />

        {/* Notes Grid */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            {searchQuery ? `Search Results (${notes.length})` : "Recent Notes"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {notes.map((note) => (
              <NoteCard note={note} />
            ))}
          </div>
        </div>

        {/* Empty state */}
        {notes.length === 0 && !searchQuery && (
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

        {/* No search results state */}
        {notes.length === 0 && searchQuery && (
          <div className="mt-8 text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No notes found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">No notes match your search for "{searchQuery}"</p>
            <button
              onClick={() => navigate("/", { viewTransition: true })}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
