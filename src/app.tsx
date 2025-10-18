// Sample notes data
const sampleNotes = [
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

// Create note card component
function NoteCard({ note }: { note: (typeof sampleNotes)[0] }) {
  return (
    <div
      className={`${note.color} rounded-lg p-3 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer group`}
    >
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {note.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-xs mb-2 line-clamp-1">{note.preview}</p>
      <span className="text-xs text-gray-500 dark:text-gray-500">{note.date}</span>
    </div>
  );
}

// Main App component
function App() {
  const handleNewNote = () => {
    alert("Creating a new note...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          </div>

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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-3">
        {/* Search Bar */}
        <div className="mb-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-0.5">Total</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{sampleNotes.length}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-0.5">Recent</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">2</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-0.5">Categories</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">3</p>
          </div>
        </div>

        {/* Notes Grid */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Recent Notes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{sampleNotes.map((note) => NoteCard({ note }))}</div>
        </div>

        {/* Empty state (hidden when there are notes) */}
        <div className="hidden mt-8 text-center">
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
      </main>
    </div>
  );
}

// Mount the app
const root = document.querySelector("#app");
if (root) {
  const appElement = App();
  root.appendChild(appElement);
}
