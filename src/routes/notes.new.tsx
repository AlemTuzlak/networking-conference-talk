import { Header } from "../components/Header";
import { BackButton } from "../components/BackButton";
import { NoteEditor } from "../components/NoteEditor";
import { navigate } from "../router";
import { createNote } from "../db/notes";
import { toast } from "../components/Toast";
import { broadcastNoteChange } from "../utils/broadcast";

export async function NewNoteRoute() {
  let titleInput: HTMLInputElement;
  let contentTextarea: HTMLTextAreaElement;
  let charCount = 0;
  let wordCount = 0;
  let selectedColor =
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"; // Default green

  const handleBack = () => {
    navigate("/");
  };

  const handleColorChange = (color: string) => {
    const oldColor = selectedColor;
    selectedColor = color;
    // Update the new note badge color immediately
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
          visualDiv.classList.remove(
            "border-transparent",
            "hover:border-gray-400"
          );
          visualDiv.classList.add(
            "border-gray-900",
            "dark:border-white",
            "scale-110"
          );
        } else {
          visualDiv.classList.remove(
            "border-gray-900",
            "dark:border-white",
            "scale-110"
          );
          visualDiv.classList.add(
            "border-transparent",
            "hover:border-gray-400"
          );
        }
      }
    });
  };

  const handleSave = async () => {
    const title = titleInput.value.trim();
    const content = contentTextarea.value.trim();

    if (!title && !content) {
      toast({
        message: "Please add a title or content to your note",
        type: "warning",
      });
      return;
    }

    try {
      const newNote = await createNote({
        title,
        content,
        color: selectedColor,
      });
      toast({ message: "Note created successfully!", type: "success" });

      // Broadcast the note creation to other tabs/windows
      broadcastNoteChange({ type: "note-created", noteId: newNote.id });

      navigate(`/notes/${newNote.id}`);
    } catch (error) {
      console.error("Failed to create note:", error);
      toast({
        message: "Failed to create note. Please try again.",
        type: "error",
      });
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
    titleInput = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    contentTextarea = document.querySelector("textarea") as HTMLTextAreaElement;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-4">
        <BackButton onClick={handleBack} />

        <NoteEditor
          onInput={updateStats}
          charCount={charCount}
          wordCount={wordCount}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
        />

        {/* Action Buttons */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div></div>
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
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Create Note
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
