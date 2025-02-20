import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function TextEditor(){
    const [blogText , setBlogText] = useState("");
    console.log("the texteditor text is! " , blogText);
    return(
        <ReactQuill theme="snow" value={blogText} onChange={(content)=>setBlogText(content)}/>
    )
}

// import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'

// define your extension array
// const extensions = [StarterKit]

// const content = '<p>Hello World!</p>'

// const Tiptap = () => {
//   return (
//     <EditorProvider extensions={extensions} content={content}>
//       <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
//       <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
//     </EditorProvider>
//   )
// }

// export default Tiptap