import { useState, useEffect } from 'react'
import Card from './Components/Card/Card.tsx'
import Claude from './Components/Claude/Claude.tsx'
import Header from './Components/Header/Header.tsx'
import Footer from './Components/Footer/Footer.tsx'
import './App.css'

function App() {
  const [formData, setFormData] = useState({ city: "" })
  const [cities, setCities] = useState({})

  function handleChange(event: React.FormEvent) {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const specificCity = formData.city

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
            description={cities.description}
          />
          <Claude />
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default App
