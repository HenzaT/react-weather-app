import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface HeaderProps {
  iconOne: IconProp
  iconTwo: IconProp
}

function Header(props: HeaderProps) {
  return (
    <header>
      <div className="header-top">
        <FontAwesomeIcon icon={props.iconOne} id="header-icon" />
        <h1>What's The Weather?</h1>
        <FontAwesomeIcon icon={props.iconTwo} id="header-icon" />
      </div>
      {/* <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label> */}
    </header>
  )
}

export default Header
