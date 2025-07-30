export interface FormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  formData: { city: string },
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  errors: { city?: string }
}

function Form(props: FormProps) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        <input
          type="text"
          name="city"
          placeholder="type a city here..."
          value={props.formData.city}
          onChange={props.handleChange}
        />
      </label>
      {props.errors.city && (
          <span className="error-message">
              {props.errors.city}
          </span>
      )}
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Form
