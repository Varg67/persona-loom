import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createInitialCharacterData } from '../data/initialState';

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characterData, setCharacterData] = useState(createInitialCharacterData);

  // Load from local storage on mount (optional but good for persistence)
  useEffect(() => {
    const savedData = localStorage.getItem('personaLoomData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Merge with initial structure to ensure new fields are present
        const merged = { ...createInitialCharacterData(), ...parsed };
        setCharacterData(merged);
      } catch (e) {
        console.error("Failed to load saved character data", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    // Debounce saving could be better, but for now simple effect
    localStorage.setItem('personaLoomData', JSON.stringify(characterData));
  }, [characterData]);

  const updateData = useCallback((section, data) => {
    setCharacterData(prev => ({
      ...prev,
      [section]: data
    }));
  }, []);

  // Helper to update deeply nested fields
  const updateField = useCallback((section, subsection, field, value) => {
    setCharacterData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  }, []);

  return (
    <CharacterContext.Provider value={{ characterData, setCharacterData, updateData, updateField }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};
