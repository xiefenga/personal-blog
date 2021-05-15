import { debounce } from '@/utils/helper'

const useDebounce = (cb, delay) => debounce(cb, delay);

export default useDebounce