/**
 * Search Bar Component with debounced search
 */

interface SearchBarProps {
  defaultValue?: string;
}

export function SearchBar({ defaultValue }: SearchBarProps) {
  let debounceTimeout: number;
  let formElement: HTMLFormElement;

  const handleInput = () => {
    // Clear existing timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set new timeout for debounced form submission
    debounceTimeout = window.setTimeout(() => {
      if (formElement) {
        formElement.submit();
      }
    }, 300); // 300ms debounce
  };

  // Get form reference after render
  setTimeout(() => {
    formElement = document.querySelector("form[data-search-form]") as HTMLFormElement;
  }, 0);

  return (
    <div className="mb-3">
      <form method="GET" action="/" data-search-form>
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
            name="search"
            autofocus
            placeholder="Search notes..."
            defaultValue={defaultValue || ""}
            onInput={handleInput}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </form>
    </div>
  );
}
