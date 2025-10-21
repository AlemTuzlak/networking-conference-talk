/**
 * Color Picker Component - Select note color
 */

interface ColorPickerProps {
  selectedColor?: string;
  onChange?: (color: string) => void;
}

const colors = [
  { name: "Green", value: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  { name: "Blue", value: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  { name: "Purple", value: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
  { name: "Pink", value: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300" },
  { name: "Yellow", value: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  { name: "Orange", value: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
  { name: "Red", value: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  { name: "Gray", value: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
];

export function ColorPicker({ selectedColor, onChange }: ColorPickerProps) {
  const handleColorChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (onChange) {
      onChange(target.value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">Color:</span>
      <div className="flex gap-2">
        {colors.map((color) => (
          <label className="cursor-pointer" title={color.name}>
            <input
              type="radio"
              name="note-color"
              id={`color-${color.name}`}
              value={color.value}
              checked={selectedColor === color.value}
              onChange={handleColorChange}
              className="sr-only"
            />
            <div
              className={[
                "w-6 h-6 rounded-full border-2 transition-all",
                color.value,
                selectedColor === color.value
                  ? "border-gray-900 dark:border-white scale-110"
                  : "border-transparent hover:border-gray-400",
              ].join(" ")}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
