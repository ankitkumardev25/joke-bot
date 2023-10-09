import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const jokeAPI =
    'https://official-joke-api.appspot.com/jokes/programming/random'
  const [joke, setJoke] = useState(false)

  useEffect(async () => {
    const response = await fetch(jokeAPI)
    const newJoke = await response.json()
    console.log(newJoke)
  }, [joke])

  return (
    <>
      <div className="card">
        <button onClick={() => setJoke((joke) => true)}>Tell me a JOKE</button>
      </div>
    </>
  )
}

export default App
