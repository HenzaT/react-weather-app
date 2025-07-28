import { useState, useEffect } from 'react'
import Header from './Header.tsx'
import Card from './Card.tsx'
import Footer from './Footer.tsx'
import './App.css'

function App() {
  const [cities, setCities] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/weather?city=Paris')
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching weather:', error))
  }, [])

  const elements = cities.map(city =>
    <Card>
      <p>{city.temperature}</p>
      <p>{city.description}</p>
    </Card>
  )

  return (
    <>
      <Header />
      <div className="main">
        <h1>Weather App</h1>
        <p>{elements}</p>
      </div>
      <Footer />
    </>
  )
}

export default App
