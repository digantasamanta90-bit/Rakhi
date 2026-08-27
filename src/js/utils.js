/**
 * UTILITIES MODULE
 * Pacing helpers, element creation, text typing animation.
 */

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function createElement(tag, className = '', innerHTML = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}

/**
 * Letter-by-letter or sentence typing utility with promise resolution
 */
export async function typeText(element, text, speed = 35) {
  element.textContent = '';
  for (let i = 0; i < text.length; i++) {
    element.textContent += text[i];
    await delay(speed);
  }
}

/**
 * Simple debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
