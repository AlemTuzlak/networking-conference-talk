/**
 * Note Detail Route - View and edit an existing note
 */

import { Header } from "../components/Header";
import { BackButton } from "../components/BackButton";
import { NoteEditor } from "../components/NoteEditor";
import { navigate } from "../router";
import { getNote, updateNote, deleteNote } from "../store/notes";
import { toast } from "../components/Toast";

export async function NoteDetailRoute(props?: { params: Record<string, string> }) {
  const noteId = props?.params?.noteId ? parseInt(props.params.noteId, 10) : 0;

  // Fetch the note
  const note = await getNote(noteId);

  // Not found state
  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Note not found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The note you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              Back to Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  let titleInput: HTMLInputElement;
  let contentTextarea: HTMLTextAreaElement;
  let charCount = note.content.length;
  let wordCount = note.content.split(/\s+/).filter(Boolean).length;
  let selectedColor = note.color || "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";

  const handleBack = () => {
    navigate("/");
  };

  const handleColorChange = (color: string) => {
    const oldColor = selectedColor;
    selectedColor = color;
    // Update the note badge color immediately
    const noteBadge = document.querySelector(".note-badge");
    if (noteBadge) {
      // Remove old color classes
      const oldClasses = oldColor.split(" ");
      noteBadge.classList.remove(...oldClasses);
      // Add new color classes
      const newClasses = color.split(" ");
      noteBadge.classList.add(...newClasses);
    }
    // Update radio button checked state and visual styling
    const radioInputs = document.querySelectorAll('input[name="note-color"]');
    radioInputs.forEach((input) => {
      const radioInput = input as HTMLInputElement;
      radioInput.checked = radioInput.value === color;

      // Update the visual div (next sibling of the radio input)
      const visualDiv = radioInput.nextElementSibling as HTMLDivElement;
      if (visualDiv) {
        if (radioInput.checked) {
          visualDiv.classList.remove("border-transparent", "hover:border-gray-400");
          visualDiv.classList.add("border-gray-900", "dark:border-white", "scale-110");
        } else {
          visualDiv.classList.remove("border-gray-900", "dark:border-white", "scale-110");
          visualDiv.classList.add("border-transparent", "hover:border-gray-400");
        }
      }
    });
  };

  const handleSave = async () => {
    const title = titleInput.value.trim();
    const content = contentTextarea.value.trim();

    if (!title && !content) {
      toast({ message: "Please add a title or content to your note", type: "warning" });
      return;
    }

    try {
      await updateNote(note.id, { title, content, color: selectedColor });
      toast({ message: "Note saved successfully!", type: "success" });
      navigate("/");
    } catch (error) {
      console.error("Failed to save note:", error);
      toast({ message: "Failed to save note. Please try again.", type: "error" });
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        const success = await deleteNote(note.id);
        if (success) {
          toast({ message: "Note deleted successfully!", type: "success" });
          navigate("/");
        } else {
          toast({ message: "Failed to delete note. Please try again.", type: "error" });
        }
      } catch (error) {
        console.error("Failed to delete note:", error);
        toast({ message: "Failed to delete note. Please try again.", type: "error" });
      }
    }
  };

  const updateStats = () => {
    const content = contentTextarea.value;
    charCount = content.length;
    wordCount = content.split(/\s+/).filter(Boolean).length;

    const charSpan = document.querySelector("#char-count");
    const wordSpan = document.querySelector("#word-count");

    if (charSpan) charSpan.textContent = String(charCount);
    if (wordSpan) wordSpan.textContent = String(wordCount);
  };

  // Get input references after render
  setTimeout(() => {
    titleInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    contentTextarea = document.querySelector("textarea") as HTMLTextAreaElement;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-4">
        <BackButton onClick={handleBack} />

        <NoteEditor
          note={note}
          onInput={updateStats}
          charCount={charCount}
          wordCount={wordCount}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
        />

        {/* Action Buttons */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete Note
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
