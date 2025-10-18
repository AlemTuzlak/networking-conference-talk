/**
 * Note Card Component
 */

export type Note = {
  id: number;
  title: string;
  preview: string;
  date: string;
  color: string;
};

export function NoteCard({ note }: { note: Note }) {
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
