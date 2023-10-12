import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

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

  const tellMeAJoke = async () => {
    setLoading(true)
    const joke = await getJoke()
    setJoke(joke)
    speak(`${joke.setup} ${joke.punchline} ja ja ja`, selectedVoice)
    setLoading(false)
  }

  useKeyDown(() => tellMeAJoke(), ['j'])

  return (
    <div className="center">
      <img src={require('./robot.gif')} alt="robot" />
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
