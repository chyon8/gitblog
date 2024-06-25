// components/MarkdownEditor.js
import dynamic from 'next/dynamic';
//import 'react-md-editor/dist/style.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

const MarkdownEditor = ({ value, onChange }) => {
  return (
    <div>
      <MDEditor value={value} onChange={onChange} />
    </div>
  );
};

export default MarkdownEditor;
