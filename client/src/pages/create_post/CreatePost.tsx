import { useGetAllCategoryQuery } from '@/api/category';
import { useCreatePostMutation } from '@/api/post';
import { ADD_ICON } from '@/assets/icons/Icons';
import Button from '@/components/button/Button';
import Icon from '@/components/icon/Icon';
import Input from '@/components/input/Input';
import Select from '@/components/select/Select';
import Title from '@/components/title/Title';
import { Editor } from '@tinymce/tinymce-react';
import { ChangeEvent, useLayoutEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import './CreatePost.scss';

interface IFormValues {
  title: string;
  content: string;
  desc: string;
  cateId: number;
  file: File | null | Blob;
}

const CreatePost = () => {
  const editorRef = useRef<any>(null);
  const editorContainerRef = useRef<any>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageThumbnail, setImageThumbnail] = useState<File | null>(null);
  const createPostMutation = useCreatePostMutation();
  const getAllCategory = useGetAllCategoryQuery();
  useLayoutEffect(() => {
    if (editorContainerRef.current) {
      editorContainerRef.current.style.height = '400px';
    }
    const ele = document.getElementById('editorId');
    if (ele) {
      ele.style.height = '100%';
      ele.style.width = '100%';
    }
  }, []);
  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const payload = new FormData();
    payload.append('title', data.title);
    payload.append('desc', data.desc);
    payload.append('content', data.content);
    payload.append('file', imageThumbnail!);
    payload.append('cateId', data.cateId.toString());
    createPostMutation.mutate(payload);
    resetPost();
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IFormValues>({
    defaultValues: {
      title: '',
      content: '',
      desc: '',
      cateId: 1,
      file: null,
    },
  });
  const createPostOptions = {
    title: {
      required: 'Title post is required',
      minLength: {
        value: 6,
        message: 'Title must have at least 6 characters',
      },
    },
    thumbnail: {
      required: 'Thumbnail post is required',
    },
    content: {
      required: 'Content post is required',
      minLength: {
        value: 15,
        message: 'Content must have at least 15 characters',
      },
    },
    desc: {
      required: 'Desc post is required',
      minLength: {
        value: 10,
        message: 'Desc must have at least 10 characters',
      },
    },
  };
  const filePickerCallback = (
    callback: (filename: string, data: { title: string }) => void,
    value: string,
    meta: any
  ) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = function () {
      const file = (this as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          const id = 'blobid' + new Date().getTime();
          const blobCache = (window as any).tinymce.activeEditor.editorUpload
            .blobCache;
          const base64 = (reader.result as string)?.split(',')[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);
          callback(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  const resetPost = () => {
    setImagePreview('');
    reset();
    if (editorRef.current) {
      editorRef.current.setContent('');
    }
  };
  const handleClickBtnCancel = () => {
    resetPost();
  };
  const handleSelectChange = (selectedValue: number) => {
    setValue('cateId', selectedValue);
  };
  return (
    <div className="create-post">
      <Title text="Create Post" />
      <form className="create-post-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="create-post-header">
          {/* choose thumbnail  */}
          <div className="create-post-header-left">
            <Controller
              rules={createPostOptions.thumbnail}
              name="file"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  id="create-thumbnail"
                  type="file"
                  value={value || ''}
                  accept="image/png, image/jpeg"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageObjUrl = URL.createObjectURL(file);
                      setImagePreview(imageObjUrl);
                      setImageThumbnail(file);
                    }
                    onChange(e);
                  }}
                  onBlur={onBlur}
                  name="file"
                />
              )}
            />
            <label className="create-thumbnail" htmlFor="create-thumbnail">
              <Icon icon={ADD_ICON} />
              <small>{imagePreview ? 'Change thumbnail' : 'Thumbnail'}</small>
            </label>
            <div className="preview-thumbnail">
              {imagePreview && (
                <img src={imagePreview} alt="Preview Thumbnail" />
              )}
            </div>
            <small className="error-alert">
              {errors?.file && errors.file.message}
            </small>
          </div>
          <div className="create-post-header-right">
            {/* post title */}
            <div className="create-post-category">
              <Controller
                control={control}
                render={() => (
                  <Select
                    setValue={handleSelectChange}
                    placeholder="Category"
                    options={getAllCategory?.data}
                  />
                )}
                name="cateId"
              />
            </div>
            <div className="create-post-title">
              <Controller
                control={control}
                rules={createPostOptions.title}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="Enter title"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    name="title"
                  />
                )}
                name="title"
              />
            </div>
            <small className="error-alert">
              {errors?.title && errors.title.message}
            </small>
            {/* post desc  */}
            <div>
              <Controller
                control={control}
                rules={createPostOptions.desc}
                name="desc"
                render={({ field: { value, onChange, onBlur } }) => (
                  <div className="create-post-desc">
                    <textarea
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="Enter desc"
                      name="desc"
                    ></textarea>
                  </div>
                )}
              />
            </div>
            <small className="error-alert">
              {errors?.desc && errors.desc.message}
            </small>
          </div>
        </div>
        {/* post content  */}
        <Controller
          name="content"
          control={control}
          rules={createPostOptions.content}
          render={({ field }) => (
            <div ref={editorContainerRef}>
              <Editor
                ref={editorRef}
                onInit={(evt, editor) => (editorRef.current = editor)}
                id="editorId"
                textareaName="content"
                plugins="image"
                apiKey={import.meta.env.VITE_APP_EDITOR}
                init={{
                  file_picker_type: 'file image media',
                  file_picker_callback: filePickerCallback,
                  height: 400,
                  content_style:
                    '.editor_container {height: 400px}',
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help',
                }}
                onEditorChange={(content) => field.onChange(content)}
              />
              <small className="error-alert">
                {errors?.content && errors.content.message}
              </small>
            </div>
          )}
        />
        <div className="btn-actions">
          <Button
            spac="mr10"
            text="Clear"
            size="medium"
            bgColor="white"
            onClick={handleClickBtnCancel}
          />
          <Button text="Create" size="medium" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
