import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import Title from '@/components/title/Title';
import './ProfileSettings.scss';
import { useRecoilValue } from 'recoil';
import { auth } from '@/recoil/atoms/auth';
import { formatDate } from '@/utils/utils';
interface IFormValues {
  name: string;
  username: string;
  password: string;
  confirmpassword: string;
  email: string;
  gender: string;
  address: string;
  birthday: string;
  phone: string;
  file: File | Blob | null;
}
const ProfileSettings = () => {
  const [imagePreview, setImagePreview] = useState<string>('');
  const handleChangeAvatar = () => {};
  const onSubmit = (data: any) => {
    console.log('daa', data);
  };
  const { user } = useRecoilValue(auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IFormValues>({
    defaultValues: {
      name: user?.u_name,
      email: user?.u_email,
      phone: user?.u_phone,
      gender: user?.u_gender,
      birthday: formatDate(user?.u_birthday, 2),
      address: user?.u_address,
      file: null,
    },
  });
  return (
    <div className="profile-settings">
      <Title text="User Information" />
      <div className="container">
        <div className="container-content">
          <div className="container-left">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="user-form-full">
                <div className="user-form-item">
                  <Controller
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        placeholder="Full name"
                        defaultValue={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name="name"
                      />
                    )}
                    name="name"
                  />
                </div>
              </div>
              <div className="user-form-full">
                <div>
                  <div className="user-form-item">
                    <Controller
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          placeholder="Username"
                          defaultValue={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          name="username"
                        />
                      )}
                      name="username"
                    />
                  </div>
                </div>
                <div>
                  <div className="user-form-item">
                    <Controller
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          placeholder="Email"
                          defaultValue={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          name="email"
                        />
                      )}
                      name="email"
                    />
                  </div>
                </div>
              </div>

              <div className="user-form-full">
                <div>
                  <div className="user-form-item">
                    <Controller
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          placeholder="Phone"
                          defaultValue={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          name="phone"
                        />
                      )}
                      name="phone"
                    />
                  </div>
                </div>
                <div className="user-wrap-birthday">
                  <div className="user-birthday">
                    <Controller
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          type="text"
                          placeholder="Birthday"
                          defaultValue={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          name="birthday"
                          onFocus={() =>
                            ((
                              document.getElementsByName(
                                'birthday'
                              )[0] as HTMLInputElement
                            ).type = 'date')
                          }
                        />
                      )}
                      name="birthday"
                    />
                  </div>
                </div>
              </div>
              <div className="group-gender">
                {/* men  */}
                <div className="register-gender-item">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        type="radio"
                        defaultValue="men"
                        id="men"
                        checked={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name="gender"
                      />
                    )}
                    name="gender"
                  />
                  <label htmlFor="men">Men</label>
                </div>

                {/* women  */}
                <div className="register-gender-item">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        type="radio"
                        defaultValue="women"
                        id="women"
                        onChange={onChange}
                        checked={value}
                        onBlur={onBlur}
                        name="gender"
                      />
                    )}
                    name="gender"
                  />
                  <label htmlFor="women">Women</label>
                </div>
                {/* other  */}
                <div className="register-gender-item">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        type="radio"
                        defaultValue="other"
                        id="other"
                        onChange={onChange}
                        onBlur={onBlur}
                        name="gender"
                      />
                    )}
                    name="gender"
                  />
                  <label htmlFor="other">Other</label>
                </div>
              </div>
              <div className="user-form-full">
                <div className="user-form-item">
                  <Controller
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        placeholder="Address"
                        defaultValue={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name="address"
                      />
                    )}
                    name="address"
                  />
                </div>
              </div>
              <div className="btn-submit">
                <Button fullWidth type="submit" text="Edit profile" />
              </div>
            </form>
          </div>
          <div className="container-right">
            <div>
              <img
                src="https://images.unsplash.com/photo-1687628511060-d59e84a47006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
                alt="avatar"
              />
              <div>
                <Controller
                  name="file"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      id="update-avatar"
                      type="file"
                      defaultValue=""
                      accept="image/png, image/jpeg"
                      onChange={handleChangeAvatar}
                      onBlur={onBlur}
                      name="file"
                    />
                  )}
                />
                <label className="update-avatar" htmlFor="update-avatar">
                  {/* <Icon icon={ADD_ICON} /> */}
                  <div>
                    {imagePreview ? 'update avatar' : 'Avatar'}
                  </div>
                </label>
                <div className="preview-thumbnail">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview Avatar" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
