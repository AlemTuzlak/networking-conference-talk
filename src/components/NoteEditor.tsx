/**
 * Note Editor Component - Reusable note editing interface
 */

import type { Note } from "../store/notes";
import { ColorPicker } from "./ColorPicker";
import { checkAIAvailability, improveNoteWithAI } from "../hooks/useChromeAI";
import { toast } from "./Toast";

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
  const aiButtonId = `ai-button-${Date.now()}`;
  let isImproving = false;

  // Check AI availability and show button if available
  setTimeout(async () => {
    const available = await checkAIAvailability();
    if (available) {
      const btn = document.getElementById(aiButtonId) as HTMLButtonElement;
      if (btn) {
        btn.style.display = "flex";
      }
    }
  }, 0);

  const handleAIImprove = async (e: Event) => {
    e.preventDefault();
    if (isImproving) return;

    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const content = textarea.value.trim();
    if (!content) {
      toast({ message: "Please add some content to improve", type: "warning" });
      return;
    }

    isImproving = true;
    const btn = e.currentTarget as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = "Improving...";

    try {
      const improvedContent = await improveNoteWithAI(content);
      textarea.value = improvedContent;

      // Trigger onInput to update stats
      if (onInput) {
        onInput();
      }

      toast({ message: "Note improved with AI!", type: "success" });
    } catch (error) {
      console.error("AI improvement error:", error);
      toast({ message: "Failed to improve note with AI", type: "error" });
    } finally {
      isImproving = false;
      btn.disabled = false;
      btn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Improve with AI
      `;
    }
  };

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
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1"></div>
          <button
            id={aiButtonId}
            onclick={handleAIImprove}
            className="hidden items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style="display: none;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Improve with AI
          </button>
        </div>
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
