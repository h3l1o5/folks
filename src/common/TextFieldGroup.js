import React from 'react'
import classnames from 'classnames'

const TextFieldGroup = ({ field, value, label, error, type, onChange }) => {
  return (
    <div className={classnames("form-group", { 'has-error': error })}>
      <label className="control-label">{label}</label>
      <input 
        className="form-control" 
        type={type} 
        name={field} 
        value={value} 
        onChange={onChange}
      />
      {error && <span className="help-block">{error}</span>}
    </div>
  )
}

TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,  
}

TextFieldGroup.defultProps = {
  type: 'text'
}

export default TextFieldGroup