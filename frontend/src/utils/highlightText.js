export function highlightText(text, matched, missing) {
  if (!text) return "";
  
  let highlighted = text;

  // Safely handle matched keywords
  if (Array.isArray(matched) && matched.length > 0) {
    matched.forEach((word) => {
      if (word) {
        const regex = new RegExp(`\\b(${word})\\b`, "gi");
        highlighted = highlighted.replace(
          regex,
          `<span class="bg-green-100 text-green-800 px-1 rounded font-medium">$1</span>`
        );
      }
    });
  }

  // Safely handle missing skills
  if (Array.isArray(missing) && missing.length > 0) {
    missing.forEach((word) => {
      if (word) {
        const regex = new RegExp(`\\b(${word})\\b`, "gi");
        highlighted = highlighted.replace(
          regex,
          `<span class="bg-red-100 text-red-800 px-1 rounded font-medium">$1</span>`
        );
      }
    });
  }

  return highlighted;
}
