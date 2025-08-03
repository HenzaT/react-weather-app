# React Weather App - Connected to Flask backend
This is a self-directed project. This is a project intended to consolidate my ongoing learning of React.js and TypeScript.

## Goals
This project is being developed in tandem with my python weather app. I wanted to practise building a separate back and front end, and then connecting the two together (so far I have built full-stack applications using Ruby on Rails). 

## Tech Stack
- React.js
- TypeScript
- Vite

# APIs used (in Flask, requests made to the server)
- Open Weather
- Anthropic Claude AI
  

## Process
I first set up my React project using Vite: 
```
`npm create vite@latest`
Selected framework: `React`
Selected variant: `TypeScript`
`cd react-weather-app`
`npm install`
`npm run dev`
```
After setting up, I quickly made a Header, Card and Footer components. As I knew I would need to make requests to my Flask backend, I guessed that useEffect would need to be used - some research confirmed this. Setting this up was simple as I'd had practice doing this with my JLPTrainer react app. As I coded this however, I remembered my learning from the React Scrimba course, which emphasised the need to think about when to use useEffect - is it necessary? Looking back at my notes, I saw that useEffect is used when:
- a fetch request needs to made automatically (for example when the component renders)
- when dependencies change

However for my weather app, the fetch request would only be made when a user submitted a form. It was the same for when the user wanted an AI activity suggestion. Therefore, I moved the fetch request into a simple function:
```
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
```

I added form validations as well, especially as the Open Weather API is quite forgiving when it comes to user input (see 'Future Additions' at bottom):
```
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
```
The form, which originally was in the App component, quickly became quite unwieldy with multiple functions and conditional rendering going on. I moved the form into its own component, which made debugging easier and the App component more readable.

As I had multiple elements with scrollIntoView animations, I created a quick reusable function to handle this:
```
// scroll to section function
  function scrollToSection(section: React.RefObject<HTMLDivElement>) {
    section.current?.scrollIntoView({ behavior: 'smooth' })
  }
```
```
// scroll to weatherSection after it loads
  useEffect(() => {
    if (cities.description) {
      setTimeout(() => {
        scrollToSection(weatherSection)
      }, 100)
    }
  }, [cities])
```

To improve UX, I added some animations to the claude response card and to the spinner when they both appear. Although I had a lot of practice with CSS and JS-based animations when building my portfolio, I wanted to see if there was a 'react way' of styling animations: I came across the 'react transition group', which allows the use of CSSTransitions.
```
npm install react-transition-group --save
```
I initially had some trouble with this library, as the element (in this case, the spinner) would animate on entry but then the app would crash as it exited. I discovered that conditional rendering does not work with CSSTransition, as the 'conditional' logic goes in:
```
in={showSpinner}
```
Having two conditions would break the app, as the boolean would flip values twice. 


```
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
```

## Reflections
This was my third react project. It helped me to understand better how data is transferred from a parent component to a child component, and how to use props. I also put into practice my learning about conditional rendering and forms in react.  

## Future Additions
- I would like to add stricter validations for misspellings when inputting a city.
- move the other cards (the claude response card and the claude card) into their own components


