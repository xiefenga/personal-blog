import { Input } from 'antd'
import PropTypes from 'prop-types'
import './index.css'


function EditBox(props) {
  const { placeholder, value, onKeyDown, onBlur, onChange, onPressEnter } = props;
  return (
    <div className="edit-container">
      <Input
        autoFocus
        placeholder={placeholder}
        value={value}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onChange={onChange}
        onPressEnter={onPressEnter}
      />
    </div>
  )
}

EditBox.propTypes = {
  placeholder: PropTypes.string,

}

EditBox.defaultProps = {
  placeholder: ''
}

export default EditBox

