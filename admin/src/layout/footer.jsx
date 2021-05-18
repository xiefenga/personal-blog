import { Layout } from 'antd'
import { getYear } from '@/utils/helper'

const styles = { textAlign: 'center', userSelect: 'none' };

function Footer(props) {
  const { className } = props;
  const startYear = 2020;
  const year = getYear();
  const yearString = year === startYear
    ? `${year}`
    : `${startYear} - ${year}`;

  return (
    <Layout.Footer className={className} style={styles}>
      Copyright © {yearString} Xie Feng All Rights Reserved.
    </Layout.Footer>
  )
}

export default Footer