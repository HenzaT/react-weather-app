import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-regular-svg-icons'


function Header() {
  return (
    <header>
      <h1>What's The Weather?</h1>
      <FontAwesomeIcon icon={faCloud} />
    </header>
  )
}

export default Header
