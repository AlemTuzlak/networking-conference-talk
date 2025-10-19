/**
 * Note Editor Component - Reusable note editing interface
 */

import type { Note } from "../store/notes";
import { ColorPicker } from "./ColorPicker";

interface NoteEditorProps {
  note?: Note | null;
  onInput?: () => void;
  charCount?: number;
  wordCount?: number;
  selectedColor?: string;
  onColorChange?: (color: string) => void;
}

export function NoteEditor({
  note,
  onInput,
  charCount = 0,
  wordCount = 0,
  selectedColor = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  onColorChange,
}: NoteEditorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Note Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          defaultValue={note?.title || ""}
          placeholder="Note title..."
          className="w-full text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-none outline-none focus:ring-0 p-0"
        />
        <div className="flex items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-4">
            {note && <span className="text-sm text-gray-500 dark:text-gray-400">{note.date}</span>}
            {note && <span className={`note-badge text-xs px-2 py-1 rounded ${selectedColor}`}>Note</span>}
            {!note && <span className={`note-badge text-xs px-2 py-1 rounded ${selectedColor}`}>New Note</span>}
          </div>
          <ColorPicker selectedColor={selectedColor} onChange={onColorChange} />
        </div>
      </div>

      {/* Note Info - Only show when note exists */}
      {note && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Created:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Modified:</span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {new Date(note.updatedAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Characters:</span>
              <span id="char-count" className="ml-2 text-gray-900 dark:text-white">
                {charCount}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Words:</span>
              <span id="word-count" className="ml-2 text-gray-900 dark:text-white">
                {wordCount}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Note Content Editor */}
      <div className="p-6">
        <textarea
          name="content"
          defaultValue={note?.content || ""}
          placeholder="Start writing your note..."
          onInput={onInput}
          className="w-full min-h-[400px] text-gray-900 dark:text-gray-100 bg-transparent border-none outline-none focus:ring-0 resize-none font-mono text-sm leading-relaxed"
        />
      </div>
    </div>
  );
}
