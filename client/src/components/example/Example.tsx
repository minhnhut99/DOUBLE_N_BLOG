import React, { useState, useRef, useLayoutEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Button from '@/components/button/Button';
import Title from '@/components/title/Title';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/input/Input';
interface IFormValues {
  title: string,
  content: string,
  desc: string,
  cateId: number
}
const Example = () => {
  const API_KEY = "iyikkyl1ntr73cppsj58bpsiprysja2ru13iw2z4iqeml1iw";
  const [content, setContent] = useState<string>("")
  const handleEditorChange = async (content: string, editor: any) => {
    await setContent(content)
  };
  const onSubmit = (data: IFormValues) => {
    data.content = content
    console.log('dataMAser', data)
  }
  const { control, handleSubmit
    , formState: { errors } } = useForm<IFormValues>(
      {
        defaultValues: {
          title: "",
          content: content,
          desc: '',
          cateId: 1
        }
      }
    )
  return (
    < Editor
      value={content}
      textareaName='content'
      apiKey={API_KEY}
      plugins="image"
      init={{
        height: 240,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        // toolbar: 'undo redo | formatselect | image ' +
        // 'bold italic backcolor | alignleft aligncenter ' +
        // 'alignright alignjustify | bullist numlist outdent indent | ' +
        // 'removeformat | help',
      }}
      onEditorChange={handleEditorChange}
    />
  )
}
export default Example;
