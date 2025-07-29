import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface weatherProps {
  city: string
  temperature: number
  description: string
  icon: IconProp
}

function Card(props: weatherProps) {
  return (
    <div className="weather-card">
      <h2>Current Weather in: <br />{props.city}</h2>
      <div className="card-content">
        <div className="weather-info">
          <p>Temperature: <br />{props.temperature}</p>
          <p>Weather: <br />{props.description}</p>
        </div>
        {props.description && <FontAwesomeIcon icon={props.icon} className="weather-icon" />}
      </div>
    </div>
  )
}

export default Card
