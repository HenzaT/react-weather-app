import { useState } from 'react'
import Card from './Components/Card/Card.tsx'
import Header from './Components/Header/Header.tsx'
import Footer from './Components/Footer/Footer.tsx'
import { faCloud, faSun, faSnowflake } from '@fortawesome/free-regular-svg-icons'
import { faWind, faCloudBolt, faCloudRain } from '@fortawesome/free-solid-svg-icons'
import './App.css'

function App() {
  const [formData, setFormData] = useState({ city: "" })
  const [cities, setCities] = useState<{ temperature?: number; description?: string }>({})
  const [aiResponse, setAiResponse] = useState({ suggestion: "" })

  const specificCity: string = formData.city
  const firstLetter: string = specificCity.charAt(0).toUpperCase()
  const remainingLetters: string = specificCity.slice(1)
  const capitalizedCity: string = firstLetter + remainingLetters

  // form action
  function handleChange(event: React.FormEvent): void {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  // submit form and POST request to Flask
  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault()

    fetch(`http://localhost:5000/weather`, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city: specificCity })
    })
    .then(res => res.json())
    .then(data => setCities(data))
    .catch(error => console.error('Error fetching weather:', error))
  }

  // button event listener and POST request to Flask
  function requestClaude(event: React.FormEvent) {
    event.preventDefault()

    fetch(`http://localhost:5000/suggestion`, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ weather: cities.description, city: specificCity })
    })
    .then(res => res.json())
    .then(data => setAiResponse(data))
    .catch(error => console.error('Error fetching weather:', error))
  }

  // conditional weather icons depending on the description
  function conditionalWeatherIcon() {
    const weatherDescription = cities.description
    if (weatherDescription) {
      if (weatherDescription.includes('cloud')) {
        return faCloud
      } else if (weatherDescription.includes('sun') || weatherDescription.includes('clear')) {
        return faSun
      } else if (weatherDescription.includes('rain')) {
        return faCloudRain
      } else if (weatherDescription.includes('wind')) {
        return faWind
      } else if (weatherDescription.includes('snow') || weatherDescription.includes('ic')) {
        return faSnowflake
      } else {
        return faCloudBolt
      }
    }
  }

  // element variables
  const claudeButton = <button type="button" onClick={requestClaude} className="claude-button">Ask Claude</button>
  const beforeClaudeElement = <p>Search for a city first!</p>

  return (
    <section>
      <Header
        iconOne={faSun}
        iconTwo={faCloud}
      />
      <div className="main">
        <h1>Search for a city to find the current weather there</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="city"
              placeholder="type a city here..."
              value={formData.city}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="cards">
          <div className="top-cards">
            <Card
              city={capitalizedCity}
              temperature={cities.temperature}
              description={cities.description}
              icon={conditionalWeatherIcon()}
            />
            <div className="claude-card">
              <h2>Things to do in this weather:</h2>
              {cities.temperature && cities.description ? claudeButton : beforeClaudeElement}
            </div>
          </div>
          <div className="claude-response-card">{aiResponse.suggestion}</div>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default App
