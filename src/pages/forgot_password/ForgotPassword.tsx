import Input from '@/components/input/Input'
import Button from '@/components/button/Button'
import GOOGLE_LOGO from "@/assets/images/googleLogo.png"
import FACEBOOK_LOGO from "@/assets/images/facebookLogo.png"
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import "./ForgotPassword.scss";
import { Link, useNavigate } from 'react-router-dom';
interface FormValues {
  username: string;
  password: string;
  email: string;
}
const ForgotPassword = () => {
  const registerOptions = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address"
      }
    },
    username: {
      required: "Username is required",
      minLength: {
        value: 6,
        message: "Username must have at least 6 characters",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must have at least 6 characters",
      },
    },
  };
  const { control, handleSubmit
    , formState: { errors } } = useForm<FormValues>(
      {
        defaultValues: {
          username: "",
          password: ""
        }
      }
    )
  const handleClickBtnregister: SubmitHandler<FormValues> = (data) => {
    console.log('dataregister', data)
  }
  return (
    <div className='register'>
      <div className="register-container">
        <h1 className='register-heading'>register</h1>
        <div className="register-form">
          <form onSubmit={handleSubmit(handleClickBtnregister)}>
            <div className='register-form-item'>
              <Controller
                control={control}
                rules={registerOptions.email}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input placeholder='email'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    name="email"
                  />
                )}
                name="email"
              />
            </div>
            <small className='error-alert'>
              {errors?.email && errors.email.message}
            </small>
            <div className='register-form-item'>
              <Controller
                control={control}
                rules={registerOptions.username}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input placeholder='username'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    name="username"
                  />
                )}
                name="username"
              />
            </div>
            <small className='error-alert'>
              {errors?.username && errors.username.message}
            </small>
            <div className='register-form-item'>
              <Controller
                control={control}
                rules={registerOptions.password}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input placeholder='password'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    name='password'
                  />
                )}
                name="password"
              />
            </div>
            <small className='error-alert'>
              {errors?.password && errors.password.message}
            </small>
            <Link to='/login'>
              <small className="have-account">You have account?</small>
            </Link>
            <div className='btn-submit'>
              <Button fullWidth type='submit' text="register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword