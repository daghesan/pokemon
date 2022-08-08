import pokeball from '../img/rotating_poke_2.gif'

export default function Title() {
  return (
    <div className="Title">
      <img src={pokeball} alt=""></img>
      <h1>Welcome to Pokemon Discovery!</h1>
      <img src={pokeball} alt=""></img>
    </div>
  )
}
