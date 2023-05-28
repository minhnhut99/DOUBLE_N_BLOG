import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
const Editors = () => {
  return (
    <Editor
      apiKey="iyikkyl1ntr73cppsj58bpsiprysja2ru13iw2z4iqeml1iw"
      cloudChannel='5-stable'
      disabled={false}
      initialValue='test initialValue'
      inline={false}
      plugins=''
      tagName='div'
      textareaName=''
      toolbar=''
      value=''
      init={{
        height: 500,
        language: 'tr',
        //menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
    />
  )
}

export default Editors