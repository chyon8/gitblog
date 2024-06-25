// pages/index.js
import { useState,useEffect } from 'react';
import MarkdownEditor from '../components/MarkdownEditor';

export default function MarkdownArea({response}) {
  const [value, setValue] = useState("");

  useEffect(() => {
 setValue(response)
  }, [response]);

  return (
    <div>
  
      <MarkdownEditor value={value} onChange={setValue} />
    
    {/*  <div dangerouslySetInnerHTML={{ __html: value }} /> */}
    </div>
  );
}
