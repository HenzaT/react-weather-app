export interface weatherProps {
  temperature: number
  description: string
}

function Card(props: weatherProps) {
  return (
    <>
      <p>{props.temperature}</p>
      <p>{props.description}</p>
    </>
  )
}

export default Card
