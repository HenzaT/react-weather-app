import { useState, useEffect, useRef } from 'react'
import Card from './Components/Card/Card.tsx'
import Form from './Components/Form/Form.tsx'
import Footer from './Components/Footer/Footer.tsx'
import Header from './Components/Header/Header.tsx'
import { faCloud, faSun, faSnowflake } from '@fortawesome/free-regular-svg-icons'
import { faWind, faCloudBolt, faCloudRain, faSmog } from '@fortawesome/free-solid-svg-icons'
import parse from 'html-react-parser';
import { CSSTransition } from 'react-transition-group';
import './App.css'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;

  const [formData, setFormData] = useState<{ city: string, description: string }>({ city: "", description: "" })
  const [errors, setErrors] = useState<{ city?: string }>({})

  const [cities, setCities] = useState<{ temperature?: number; description?: string }>({})
  const [aiResponse, setAiResponse] = useState<{ suggestion?: string }>({ suggestion: "" })

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)

  const specificCity = formData.city
  const firstLetter: string = specificCity ? specificCity.charAt(0).toUpperCase() : ""
  const remainingLetters: string = specificCity ? specificCity.slice(1) : ""
  const capitalizedCity: string = firstLetter + remainingLetters

  const headerSection = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const weatherSection = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const askClaudeSection = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const aiSection = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  // const nodeRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const spinnerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  // scroll to claude suggestion box after it loads
  useEffect(() => {
    if (aiResponse?.suggestion) {
      setShowSpinner(prevSpinner => !prevSpinner)
      setTimeout(() => {
        scrollToSection(aiSection)
      }, 100)
    }
  }, [aiResponse])

  // scroll to weatherSection after it loads
  useEffect(() => {
    if (cities.description) {
      setTimeout(() => {
        scrollToSection(weatherSection)
      }, 100)
    }
  }, [cities])

  // clear weather card data and reset button so it is enabled again
  useEffect(() => {
    if (formData.city === "") {
      setCities({})
      setAiResponse({})
      setButtonDisabled(false)
    }
  }, [formData.city])


  // form action
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  interface WeatherData {
    temperature: number
    description: string
  }


  // submit form and POST request to Flask
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const newErrors = validateForm(formData)
    setErrors(newErrors)
    setHasSubmitted(true)

    if (Object.keys(newErrors).length === 0) {
        console.log("Calling API at:", `${apiUrl}/api/weather`);
        if (!apiUrl) {
          console.error("VITE_API_URL is not defined");
          return;
        }
        fetch(`${apiUrl}/api/weather`, {
          'method': 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ city: specificCity })
        })
        .then(res => res.json())
        .then((data: WeatherData) => {
          setCities(data)
          setFormData(prev => ({ ...prev, description: data.description }))
        })
        .catch(error => console.error('Error fetching weather:', error))
        console.log('Form submitted successfully!');
    } else {
        console.log('Form submission failed due to validation errors.');
    }
  }

  // clear input box
  function handleClear() {
    setFormData({city: '', description: ''})
    setHasSubmitted(false)
  }

  // validate form input
  function validateForm(data: { city: string }): { city?: string } {
    const errors: { city?: string } = {}

    if (!data.city.trim()) {
      errors.city = 'a city is required'
    } else if (data.city.length < 2) {
      errors.city = 'city must be more than 1 character long'
    }

    return errors
  }

  interface ClaudeData {
    suggestion: string
  }

  // button event listener and POST request to Flask
  function requestClaude(event: React.FormEvent) {
    event.preventDefault()
    setButtonDisabled(true)
    setTimeout(() => {
      scrollToSection(askClaudeSection)
    }, 100)

    setShowSpinner(prevSpinner => !prevSpinner)

    fetch(`${apiUrl}/api/suggestion`, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ temperature: cities.temperature, weather: cities.description, city: specificCity })
    })
    .then(res => res.json())
    .then((data: ClaudeData) => {
      setAiResponse(data)
    })
    .catch(error => {
      console.error('Error fetching weather:', error)
      setButtonDisabled(false);
    })
  }

  // scroll to section function
  function scrollToSection(section: React.RefObject<HTMLDivElement>) {
    section.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // conditional weather icons depending on the description
  function conditionalWeatherIcon() {
    const weatherDescription = cities.description
    if (weatherDescription) {
      if (weatherDescription.includes('cloud')) {
        return faCloud
      } else if (weatherDescription.includes('sun') || weatherDescription.includes('clear')) {
        return faSun
      } else if (weatherDescription.includes('rain') || weatherDescription.includes('drizz')) {
        return faCloudRain
      } else if (weatherDescription.includes('wind') || weatherDescription.includes('dust')) {
        return faWind
      } else if (weatherDescription.includes('snow') || weatherDescription.includes('ic')) {
        return faSnowflake
      } else if (weatherDescription.includes('fog')) {
        return faSmog
      } else {
        return faCloudBolt
      }
    }
  }

  function conditionalClaudeButton() {
    if (aiResponse.suggestion) {
      return "...Voila!"
    } else if (buttonDisabled) {
      return "Loading..."
    } else {
      return "Ask Claude"
    }
  }

  return (
    <section>
      <Header
        ref={headerSection}
        iconOne={faSun}
        iconTwo={faCloud}
      />
      <div className="main">
        <Form
          handleSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          handleClear={handleClear}
          hasSubmitted={hasSubmitted}
        />
        <div className="cards">
          <div className="top-cards">
            <Card
              ref={weatherSection}
              city={specificCity ? capitalizedCity : "________"}
              temperature={cities.temperature ?? 0}
              description={cities.description ?? "_____"}
              icon={conditionalWeatherIcon() ?? faCloud}
            />
            <div className="claude-card" ref={askClaudeSection}>
              <h2>Things to do in this weather:</h2>
              {cities.temperature && cities.description ? (
              <button
                type="button"
                onClick={requestClaude}
                className="claude-button"
                disabled={buttonDisabled}
              >
                {conditionalClaudeButton()}
              </button>
              ) : (
              <p>Search for a city first!</p>
              )}
            </div>
          </div>
          <CSSTransition
            in={!!aiResponse.suggestion}
            nodeRef={aiSection}
            timeout={300}
            classNames="fade"
            unmountOnExit>
            <div ref={aiSection} className="claude-response-card">
              {aiResponse.suggestion && parse(aiResponse.suggestion)}
              <button type="button" onClick={() => scrollToSection(headerSection)}>back to top</button>
            </div>
          </CSSTransition>

          <CSSTransition
            in={showSpinner}
            nodeRef={spinnerRef}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div className="loading-spinner" ref={spinnerRef}>
              <div className="inside-circle"></div>
            </div>
          </CSSTransition>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default App
