import { Button } from 'antd'
import { useClearArticle } from '@/hooks/store'


function ClearButton() {
  const clear = useClearArticle();
  return (
    <Button type="dashed" onClick={clear}> 清空 </Button>
  )
}

export default ClearButton


