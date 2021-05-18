import { Button } from 'antd'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import './404.css'

function NotFound() {

  const history = useHistory();

  const onClick = useCallback(
    () => history.replace('/'),
    [history]
  );

  return (
    <div className="not-found">
      <div className="error-info">
        <h1>404</h1>
        <div className="error_subtitle">页面没有找到</div>
        <div className="btn">
          <Button type="primary" onClick={onClick}>
            回到主页
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound