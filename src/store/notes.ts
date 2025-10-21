/**
 * Notes Storage Module using localforage (IndexedDB)
 */

import localforage from "localforage";

export type Note = {
  id: number;
  title: string;
  content: string;
  preview: string;
  date: string;
  color: string;
  createdAt: number;
  updatedAt: number;
};

// Configure localforage
const notesStore = localforage.createInstance({
  name: "notes-app",
  storeName: "notes",
});

// Initialize with sample data if empty
export async function initializeSampleData() {
  const keys = await notesStore.keys();
  if (keys.length === 0) {
    const sampleNotes: Note[] = [
      {
        id: 1,
        title: "Welcome to Notes",
        preview: "Start capturing your thoughts and ideas...",
        content:
          "Welcome to this amazing note-taking app!\n\nThis app is built without React, using pure JSX that gets transpiled to vanilla JavaScript. It's a great example of how you can build modern web applications without heavyweight frameworks.\n\nKey features:\n- Custom JSX runtime\n- Client-side routing\n- Component-based architecture\n- Tailwind CSS for styling\n- Toast notifications\n- IndexedDB storage with localforage\n\nFeel free to explore and edit this note!",
        date: "Today",
        color: "bg-blue-50 dark:bg-blue-950/30",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: 2,
        title: "Meeting Notes",
        preview: "Discussed project timeline and key deliverables for Q1...",
        content:
          "Meeting Notes - Q1 Planning\n\nAttendees: Team leads, Product managers\n\nAgenda:\n1. Review Q4 accomplishments\n2. Set Q1 goals and objectives\n3. Discuss resource allocation\n4. Timeline for key deliverables\n\nAction Items:\n- Finalize project scope by end of week\n- Schedule follow-up meetings\n- Update project tracking board\n\nNext meeting: January 15th",
        date: "Yesterday",
        color: "bg-purple-50 dark:bg-purple-950/30",
        createdAt: Date.now() - 86400000,
        updatedAt: Date.now() - 86400000,
      },
      {
        id: 3,
        title: "Ideas",
        preview: "Build a note-taking app with JSX, no React needed!",
        content:
          "Ideas for the Note-Taking App\n\n1. Add markdown support\n   - Would make formatting easier\n   - Popular with developers\n\n2. Implement tags/categories\n   - Better organization\n   - Quick filtering\n\n3. Dark mode (already done! ✓)\n\n4. Export notes as PDF or markdown files\n\n5. Search functionality\n   - Full-text search\n   - Search by date or category\n\n6. Offline support with localStorage (using IndexedDB now! ✓)\n\n7. Keyboard shortcuts for power users",
        date: "2 days ago",
        color: "bg-green-50 dark:bg-green-950/30",
        createdAt: Date.now() - 172800000,
        updatedAt: Date.now() - 172800000,
      },
      {
        id: 4,
        title: "Shopping List",
        preview: "Milk, eggs, bread, coffee beans, fresh vegetables...",
        content:
          "Shopping List\n\n🥛 Dairy:\n- 2x Milk (whole)\n- Eggs (dozen)\n- Greek yogurt\n\n🥖 Bakery:\n- Whole wheat bread\n- Bagels\n\n☕ Beverages:\n- Coffee beans (dark roast)\n- Green tea\n\n🥗 Produce:\n- Spinach\n- Tomatoes\n- Carrots\n- Bell peppers\n- Onions\n\n📝 Other:\n- Paper towels\n- Dish soap",
        date: "Last week",
        color: "bg-amber-50 dark:bg-amber-950/30",
        createdAt: Date.now() - 604800000,
        updatedAt: Date.now() - 604800000,
      },
    ];

    for (const note of sampleNotes) {
      await notesStore.setItem(String(note.id), note);
    }
  }
}


/**
 * Get all notes
 */
export async function getAllNotes(): Promise<Note[]> {
  const notes: Note[] = [];
  await notesStore.iterate<Note, void>((note) => {
    notes.push(note);
  });
  // Sort by updatedAt descending
  return notes.sort((a, b) => b.updatedAt - a.updatedAt);
}

/**
 * Get a single note by ID
 */
export async function getNote(id: number): Promise<Note | null> {
  return await notesStore.getItem<Note>(String(id));
}

/**
 * Create a new note
 */
export async function createNote(noteData: {
  title: string;
  content: string;
  color?: string;
}): Promise<Note> {
  const id = Date.now(); // Use timestamp as ID
  const now = Date.now();
  const preview = noteData.content.slice(0, 100).replace(/\n/g, " ");

  const note: Note = {
    id,
    title: noteData.title || "Untitled Note",
    content: noteData.content || "",
    preview,
    date: formatDate(now),
    color: noteData.color || "bg-green-50 dark:bg-green-950/30",
    createdAt: now,
    updatedAt: now,
  };

  await notesStore.setItem(String(id), note);
  return note;
}

/**
 * Update an existing note
 */
export async function updateNote(
  id: number,
  updates: { title?: string; content?: string; color?: string }
): Promise<Note | null> {
  const note = await getNote(id);
  if (!note) return null;

  const updatedNote: Note = {
    ...note,
    ...updates,
    preview: (updates.content || note.content).slice(0, 100).replace(/\n/g, " "),
    updatedAt: Date.now(),
  };

  await notesStore.setItem(String(id), updatedNote);
  return updatedNote;
}

/**
 * Delete a note
 */
export async function deleteNote(id: number): Promise<boolean> {
  try {
    await notesStore.removeItem(String(id));
    return true;
  } catch (error) {
    console.error("Failed to delete note:", error);
    return false;
  }
}

/**
 * Format timestamp to relative date string
 */
function formatDate(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 1) return "Today";
  if (days < 2) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
  return new Date(timestamp).toLocaleDateString();
}
