import React from "react";

export interface FormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  formData: { city: string, description: string },
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  errors: { city?: string },
  handleClear: (event: React.MouseEvent<HTMLButtonElement>) => void,
  hasSubmitted: boolean
}

function Form(props: FormProps) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        <input
          type="text"
          name="city"
          placeholder="type a city here"
          value={props.formData.city}
          onChange={props.handleChange}
        />
      </label>
      {props.errors.city && (
          <span className="error-message">
              {props.errors.city}
          </span>
      )}
      {props.hasSubmitted && props.formData.description && props.formData.city ? (
        <button
          className="clear-button"
          type="button"
          onClick={props.handleClear}
        >
          Clear
        </button>
      ) : (
        <input type="submit" value="Submit" />
      )}
    </form>
  )
}

export default Form
