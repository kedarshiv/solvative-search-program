import { useEffect } from "react";

/**
 * Custom hook to handle keyboard shortcuts.
 *
 * @param {Function} callback - Function to be called when the shortcut is triggered.
 * @param {string} key - The key that triggers the shortcut.
 * @param {boolean} isCtrlCmdRequired - If true, requires CTRL or CMD key to be pressed along with the shortcut key.
 */
const useKeyboardShortcut = (callback, key, isCtrlCmdRequired = false) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (isCtrlCmdRequired ? event.ctrlKey || event.metaKey : true) &&
        event.key === key
      ) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, key, isCtrlCmdRequired]);
};

export default useKeyboardShortcut;
