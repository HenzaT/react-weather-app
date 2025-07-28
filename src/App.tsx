import { useState, useEffect } from 'react'
import Card from './Components/Card/Card.tsx'
import Header from './Components/Header/Header.tsx'
import Footer from './Components/Footer/Footer.tsx'
import './App.css'

function App() {
  const [formData, setFormData] = useState({ city: "" })
  const [cities, setCities] = useState<{ temperature?: number; description?: string }>({})

  const specificCity = formData.city
  const weatherDescription = cities.description

  function handleChange(event: React.FormEvent): void {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

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

  function requestClaude(event: React.FormEvent) {
    event.preventDefault()

  }

  return (
    <section>
      <Header />
      <div className="main">
        <h1>Search for a city to find the current weather there</h1>
        <form onSubmit={handleSubmit}>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="cards">
          <Card
            city={formData.city}
            temperature={cities.temperature}
            description={weatherDescription}
          />
          <div className="claude-card">
            <h2>Things to do in this weather:</h2>
            <button onClick={requestClaude} className="claude-button">Ask Claude</button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default App
