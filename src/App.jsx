import { useState } from 'react'
import axios from 'axios'
import { useKeyDown } from './useKeyDown'
import './App.css'
import VoiceSelector from './VoiceSelector'

function App() {
  const [selectedVoice, setSelectedVoice] = useState(147)
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)

  useKeyDown(() => tellMeAJoke(), ['j'])

  async function getJoke() {
    const { data } = await axios.get(
      'https://official-joke-api.appspot.com/jokes/programming/random'
    )
    return data[0]
  }

  const tellMeAJoke = async () => {
    setLoading(true)
    const joke = await getJoke()
    setJoke(joke)
    speak(`${joke.setup} ${joke.punchline} HA HA HA`, selectedVoice)
    setLoading(false)
  }

  const speak = (text, voice) => {
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = synth.getVoices()[voice]
    utterance.pitch = 2
    utterance.rate = 1
    synth.speak(utterance)
  }

  return (
    <div className="center">
      <div className="header">
        <img className="logo" src="src\assets\robot.gif" alt="robot" />
        <h1>Joke Bot</h1>
      </div>
      <div className="content">
        <VoiceSelector
          selected={selectedVoice}
          setSelected={setSelectedVoice}
        />
        {!!joke ? (
          <div className="joke">
            <p>{joke.setup}</p>
            <p>{joke.punchline}</p>
          </div>
        ) : (
          <div className="joke-placeholder">
            <p>Click the button to hear a joke!</p>
          </div>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button className="joke-button" onClick={tellMeAJoke}>
            Tell me a joke!
          </button>
        )}
      </div>
    </div>
  )
}

export default App
