import MarkdownEditor from '@/components/MarkdownEditor'
import { useRef } from 'react';
import './App.css'

function App() {
  const ref = useRef();
  console.log(ref);
  return (
    <MarkdownEditor ref={ref} />
  );
}

export default App