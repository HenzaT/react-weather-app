import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface HeaderProps {
  iconOne: IconProp
  iconTwo: IconProp
  ref: React.RefObject<HTMLDivElement>
}

function Header(props: HeaderProps) {
  return (
    <header>
      <div ref={props.ref} className="header-top">
        <FontAwesomeIcon icon={props.iconOne} id="header-icon" />
        <h1>What's The Weather?</h1>
        <FontAwesomeIcon icon={props.iconTwo} id="header-icon" />
      </div>
      <p>Search for a city to find the current weather there / Ask Claude for activity suggestions.</p>
      {/* <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label> */}
    </header>
  )
}

export default Header
