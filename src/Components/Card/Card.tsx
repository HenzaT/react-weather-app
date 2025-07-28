export interface weatherProps {
  city: string
  temperature: number
  description: string
}

function Card(props: weatherProps) {
  return (
    <div className="weather-card">
      <h2>Current Weather for {props.city}</h2>
      <div className="card-content">
        <div className="weather-info">
          <p>Current temperature: {props.temperature}</p>
          <p>What's it like?: {props.description}</p>
        </div>
        <div className="weather-icon"></div>
      </div>
    </div>
  )
}

export default Card
