import { Button } from 'antd'
import PropTypes from 'prop-types'
import { useClearArticle } from '@/hooks/store'


function ClearButton(props) {
  const { showText } = props;
  const clear = useClearArticle();
  return (
    <Button type="dashed" onClick={clear}> {showText} </Button>
  )
}


ClearButton.propTypes = {
  showText: PropTypes.string
}

ClearButton.defaultProps = {
  showText: '清空内容'
}

export default ClearButton


