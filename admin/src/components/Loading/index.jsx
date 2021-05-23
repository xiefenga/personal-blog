import { Spin } from 'antd'
import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons'
import './index.css'

function Loading(props) {
  const { loading, tip, delay, size } = props;
  return (
    <div className="loading">
      <Spin
        delay={delay}
        tip={tip}
        spinning={loading}
        ndicator={<LoadingOutlined spin />}
        size={size}
      />
    </div>
  )
}

Loading.propTypes = {
  loading: PropTypes.bool,
  tip: PropTypes.string,
  delay: PropTypes.number,
  size: PropTypes.oneOf(['small', 'default', 'large'])
}

Loading.defaultProps = {
  loading: true,
  tip: 'loading',
  delay: 0,
  size: 'default'
}

export default Loading

