import React from 'react'
import { useVoices } from './useVoices'

const VoiceSelector = ({ selected = 0, setSelected }) => {
  const voices = useVoices()

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(parseInt(e.target.value))}
    >
      {voices.map((voice, index) => (
        <option key={index} value={index}>
          {voice.name} ({voice.lang}) {voice.default && ' [Default]'}
        </option>
      ))}
    </select>
  )
}

export default VoiceSelector
