import { NavLink } from "react-router-dom";
import pokehouse from "../img/Poke-home.png"

export default function Navbar({onResetPage}) {
  return (
    <div className="Navbar">
            <NavLink to="/">
              <img src={pokehouse} alt="Home" onClick={onResetPage}></img>
            </NavLink>
    </div>
  )
}
