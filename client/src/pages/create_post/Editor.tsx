import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const Editors = () => {
  const editorRef = useRef<any>(null);
  return (
    <Editor
      ref={editorRef}
      onInit={(evt: any, editor: any) => (editorRef.current = editor)}
      id="editorId"
      textareaName="content"
      plugins="image"
      apiKey={import.meta.env.VITE_APP_EDITOR}
      init={{
        file_picker_type: 'file image media',
        file_picker_callback: () => {},
        height: 400,
        content_style: '.editor_container {height: 400px}',
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',
      }}
      // onEditorChange={(content) => field.onChange(content)}
    />
  );
};

export default Editors;
