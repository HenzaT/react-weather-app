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
          <p><span className="sub-title">Temperature:</span> <br />{props.city ? props.temperature : "__"}°C</p>
          <p><span className="sub-title">Weather:</span> <br />{props.description}</p>
        </div>
        {props.description && <FontAwesomeIcon icon={props.icon} className="weather-icon" />}
      </div>
    </div>
  )
}

export default Card
