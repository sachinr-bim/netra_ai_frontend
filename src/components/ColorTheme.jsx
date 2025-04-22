import React from 'react';
import { useTheme } from '../Context/ThemeContext';

export default function ColorTheme() {
  const { themeColor, setThemeColor } = useTheme();
  const defaultColor = '#117686'

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setThemeColor(newColor);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-[var(--theme-color)]">Change Theme</h2>

      {/* Theme Color Picker */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Choose Your Theme Color:
        </label>
        <input
          type="color"
          value={themeColor}
          onChange={handleColorChange}
          className="w-16 h-10 border border-gray-300 rounded-md cursor-pointer"
        />
        <p className="mt-2 text-sm text-gray-500">This will update the primary color used in the app UI.</p>
      </div>

      <div>
        {themeColor!== defaultColor &&  <button className='bg-[var(--theme-color)] text-white p-2 rounded-md hover:bg-[#117686] hover:text-white' onClick={() => setThemeColor(defaultColor)} >Set to Default</button>}
      </div>

      {/* Optional: Add Dark Mode Toggle Later */}
      {/* <div className="mb-4">
        <label className="flex items-center gap-3">
          <input type="checkbox" className="toggle toggle-md" />
          <span className="text-lg font-medium">Enable Dark Mode (Coming soon)</span>
        </label>
      </div> */}
    </div>
  );
}
