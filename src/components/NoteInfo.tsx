/**
 * Note Info Component - Display note metadata
 */

import type { Note } from "../db/notes";

interface NoteInfoProps {
  note?: Note | null;
  charCount: number;
  wordCount: number;
}

export function NoteInfo({ note, charCount, wordCount }: NoteInfoProps) {
  return (
    <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
        Note Information
      </h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        {note && (
          <div>
            <span className="text-gray-500 dark:text-gray-400">Created:</span>
            <span className="ml-2 text-gray-900 dark:text-white">
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
        {note && (
          <div>
            <span className="text-gray-500 dark:text-gray-400">
              Last modified:
            </span>
            <span className="ml-2 text-gray-900 dark:text-white">
              {new Date(note.updatedAt).toLocaleDateString()}
            </span>
          </div>
        )}
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
  );
}
