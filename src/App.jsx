import { useState } from 'react'
import axios from 'axios'
import { useKeyDown } from './useKeyDown'
import './App.css'
import VoiceSelector from './VoiceSelector'

function App() {
  const [selectedVoice, setSelectedVoice] = useState(147)
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getJoke() {
    const { data } = await axios.get(
      'https://official-joke-api.appspot.com/jokes/programming/random'
    )
    return data[0]
  }
  const synth = window.speechSynthesis

  const speak = (text, voice) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = synth.getVoices()[voice]
    utterance.pitch = 2
    utterance.rate = 1
    synth.speak(utterance)
  }

  const tellMeAJoke = async () => {
    setLoading(true)
    const joke = await getJoke()
    setJoke(joke)
    speak(`${joke.setup} ${joke.punchline} HA HA HA`, selectedVoice)
    setLoading(false)
  }

  useKeyDown(() => tellMeAJoke(), ['j'])

  return (
    <div className="center">
      <img className="logo" src="src\assets\robot.gif" alt="robot" />
      <VoiceSelector selected={selectedVoice} setSelected={setSelectedVoice} />
      {!!joke && (
        <div>
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={tellMeAJoke}>Tell me a joke!</button>
      )}
    </div>
  )
}

export default App
