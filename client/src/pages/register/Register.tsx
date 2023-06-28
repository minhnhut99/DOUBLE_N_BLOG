import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/api/auth';
import Input from '@/components/input/Input';
import Button from '@/components/button/Button';
import Icon from '@/components/icon/Icon';
import { EYE_HIDDEN_ICON, EYE_SHOW_ICON } from '@/assets/icons/Icons';
import './Register.scss';
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
}
const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const registerOptions = {
    name: {
      required: 'Full name is required',
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
    gender: {},
    address: {
      required: 'Address is required',
      minLength: {
        value: 10,
        message: 'Address must have at least 10 characters',
      },
    },
    username: {
      required: 'Username is required',
      minLength: {
        value: 6,
        message: 'Username must have at least 6 characters',
      },
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Password must have at least 6 characters',
      },
    },
    confirmpassword: {
      required: 'Confirm password is required',
      validate: (val: string) => {
        if (watch('password') !== val) {
          return 'Your passwords do no match';
        }
      },
    },
    phone: {
      required: 'Phone is required',
      minLength: {
        value: 10,
        message: 'Password must have at least 10 characters',
      },
      maxLength: {
        value: 11,
        message: 'MaxLength is  11 characters',
      },
    },
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      username: '',
      password: '',
      name: '',
      gender: '',
      email: '',
      phone: '',
      birthday: '',
      address: '',
    },
  });
  const handleClickBtnRegister: SubmitHandler<IFormValues> = async ({
    name,
    username,
    password,
    gender,
    email,
    birthday,
    phone,
    address,
  }) => {
    registerMutation.mutateAsync({
      name,
      username,
      password,
      gender,
      email,
      birthday,
      phone,
      address,
    });
    navigate('/login');
  };
  const handleClickRedirectLogin = () => {
    navigate('/login');
  };
  const handleClickToggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleClickToggleShowConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };
  return (
    <div className="register">
      <div className="register-container">
        <h1 className="register-heading">register</h1>
        <div className="register-form">
          <form onSubmit={handleSubmit(handleClickBtnRegister)}>
            <div className="register-form-full">
              <div className="register-form-item">
                <Controller
                  control={control}
                  rules={registerOptions.name}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      placeholder="full name"
                      defaultValue={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      name="name"
                    />
                  )}
                  name="name"
                />
              </div>
              <small className="error-alert">
                {errors?.name && errors.name.message}
              </small>
            </div>
            <div className="register-form-wrap">
              <div>
                <div className="register-form-item">
                  <Controller
                    control={control}
                    rules={registerOptions.username}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        placeholder="username"
                        defaultValue={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name="username"
                      />
                    )}
                    name="username"
                  />
                </div>
                <small className="error-alert">
                  {errors?.username && errors.username.message}
                </small>
              </div>
              <div>
                <div className="register-form-item">
                  <Controller
                    control={control}
                    rules={registerOptions.email}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        placeholder="email"
                        defaultValue={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name="email"
                      />
                    )}
                    name="email"
                  />
                </div>
                <small className="error-alert">
                  {errors?.email && errors.email.message}
                </small>
              </div>
            </div>
            <div className="register-form-wrap">
              <div>
                <div className="register-form-item">
                  <Controller
                    control={control}
                    rules={registerOptions.password}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        placeholder="password"
                        type={isShowPassword ? 'text' : 'password'}
                        defaultValue={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name="password"
                      />
                    )}
                    name="password"
                  />
                  <Icon
                    onClick={handleClickToggleShowPassword}
                    icon={isShowPassword ? EYE_SHOW_ICON : EYE_HIDDEN_ICON}
                    classNameAdditional="eye-show-hidden"
                  />
                </div>
                <small className="error-alert">
                  {errors?.password && errors.password.message}
                </small>
              </div>
              <div>
                <div className="register-form-item">
                  <Controller
                    control={control}
                    rules={registerOptions.confirmpassword}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        placeholder="confirm password"
                        defaultValue={value}
                        type={isShowConfirmPassword ? 'text' : 'password'}
                        onChange={onChange}
                        onBlur={onBlur}
                        name="confirmpassword"
                      />
                    )}
                    name="confirmpassword"
                  />
                  <Icon
                    onClick={handleClickToggleShowConfirmPassword}
                    icon={
                      isShowConfirmPassword ? EYE_SHOW_ICON : EYE_HIDDEN_ICON
                    }
                    classNameAdditional="eye-show-hidden"
                  />
                </div>
                <small className="error-alert">
                  {errors?.confirmpassword && errors.confirmpassword.message}
                </small>
              </div>
            </div>

            <div className="register-form-wrap">
              <div>
                <div className="register-form-item">
                  <Controller
                    control={control}
                    rules={registerOptions.phone}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        placeholder="phone"
                        defaultValue={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name="phone"
                      />
                    )}
                    name="phone"
                  />
                </div>
                <small className="error-alert">
                  {errors?.phone && errors.phone.message}
                </small>
              </div>
              <div className="res-wrap-birthday">
                <div className="register-birthday">
                  <Controller
                    control={control}
                    rules={registerOptions.address}
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
                  rules={registerOptions.gender}
                  render={({ field: { onChange, onBlur } }) => (
                    <Input
                      type="radio"
                      defaultValue="men"
                      id="men"
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
                  rules={registerOptions.gender}
                  render={({ field: { onChange, onBlur } }) => (
                    <Input
                      type="radio"
                      defaultValue="women"
                      id="women"
                      onChange={onChange}
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
                  rules={registerOptions.gender}
                  render={({ field: { onChange, onBlur } }) => (
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
            <div className="register-form-full">
              <div className="register-form-item">
                <Controller
                  control={control}
                  rules={registerOptions.address}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      placeholder="address"
                      defaultValue={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      name="address"
                    />
                  )}
                  name="address"
                />
              </div>
              <small className="error-alert">
                {errors?.address && errors.address.message}
              </small>
            </div>
            <small onClick={handleClickRedirectLogin} className="have-account">
              You have account?
            </small>
            <div className="btn-submit">
              <Button fullWidth type="submit" text="register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
