import React, { useState, useEffect, useRef } from 'react'
import { FiSave } from 'react-icons/fi'
import { loadInitialState, areSameTimeSettings, saveCurrentSettings } from './utils/settingsSaver';
import { TimerSettings } from './types/TimerTypes';

type Props = {
  currentSettings: TimerSettings
}

function SaveSettingsButton({ currentSettings }: Props) {
  const [savedSettings, setSavedSettings] = useState(loadInitialState);
  const [settingsMatch, setSettingsMatch] = useState(() => areSameTimeSettings(savedSettings, currentSettings));
  const [message, setMessage] = useState(() => settingsMatch ? 'Settings Saved' : 'Save Settings');

  const messageTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const newSettingsMatch = areSameTimeSettings(savedSettings, currentSettings);
    setMessage(newSettingsMatch ? 'Settings Saved' : 'Save Settings')
    setSettingsMatch(newSettingsMatch);
  }, [currentSettings])

  // Clears the active timeout if the component is destoryed
  useEffect(() => () => { if (messageTimeout.current) clearTimeout(messageTimeout.current) }, []);

  function saveSettings(): void {
    if (messageTimeout.current) {
      clearTimeout(messageTimeout.current)
    }

    try {
      saveCurrentSettings(currentSettings);
      setSavedSettings(currentSettings);
      setMessage('Settings Saved')
    } catch {
      setMessage('Unable to Save')
      messageTimeout.current = setTimeout(
        () => setMessage('Save Settings'),
        2000
      )
    }
  }

  return (
    <div className="absolute right-4 top-4">
      <button
        className="btn btn-primary flex items-center gap-2 !text-sm md:!text-base disabled:opacity-75 disabled:pointer-events-none"
        onClick={saveSettings}
        disabled={settingsMatch}
      >
        <span className="hidden md:block">
          <FiSave />
        </span>
        {message}
      </button>
    </div>
  )
}


export default SaveSettingsButton
