import { Button } from 'antd'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { useMarkdown } from '@/hooks/store'


function ClearButton(props) {
  const { showText } = props;
  const [, setMarkdown] = useMarkdown();
  const onClick = useCallback(
    () => setMarkdown(''),
    [setMarkdown]
  )
  return (
    <Button type="dashed" onClick={onClick}> {showText} </Button>
  )
}


ClearButton.propTypes = {
  showText: PropTypes.string
}

ClearButton.defaultProps = {
  showText: '清空内容'
}

export default ClearButton


