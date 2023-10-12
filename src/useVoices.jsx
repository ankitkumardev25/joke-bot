import { useCallback, useEffect, useState } from 'react'

const synth = window.speechSynthesis

export const useVoices = () => {
  const [voices, setVoices] = useState([])

  const populateVoiceList = useCallback(() => {
    const newVoices = synth.getVoices()
    setVoices(newVoices)
  }, [])

  useEffect(() => {
    populateVoiceList()
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList
    }
  }, [populateVoiceList])

  return voices
}
