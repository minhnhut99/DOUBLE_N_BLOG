import Input from '@/components/input/Input'
import Button from '@/components/button/Button'
import GOOGLE_LOGO from "@/assets/images/googleLogo.png"
import FACEBOOK_LOGO from "@/assets/images/facebookLogo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import './Login.scss'
import React, { useState } from 'react'
import LoadingSpinner from '@/components/loading_spinner/LoadingSpinner'
interface FormValues {
  username: string;
  password: string;
  remember: string;
}
const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const loginOptions = {
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
          password: "",
          remember: ''
        }
      }
    )
  const handleClickBtnLogin: SubmitHandler<FormValues> = (data) => {
    console.log('dataLogin', data)
  }
  const handleClickBtnLoginGoogle = () => {
    console.log('login google')
  }
  const handleClickBtnLoginFacebook = () => {
    console.log('login facebook')
  }
  const handleClickRedirectRegister = () => {
    navigate("/register")
  }
  return (
    <React.Fragment>
      <div className='login'>
        <div className="login-container">
          <h1 className='login-heading'>Login</h1>
          <div className="login-form">
            <form onSubmit={handleSubmit(handleClickBtnLogin)}>
              <div className='login-form-item'>
                <Controller
                  control={control}
                  rules={loginOptions.username}
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
              <div className='login-form-item'>
                <Controller
                  control={control}
                  rules={loginOptions.password}
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
              <div className="forgot-password-register">
                <div className='remember-me'>
                  <Controller
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input placeholder='remember'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name='remember'
                        type='checkbox'
                        id="check-remember"
                      />
                    )}
                    name="remember"
                  />
                  <label htmlFor="check-remember">Remember me?</label>
                </div>
                <Link to='/forgot-password'>
                  <small>Forgot password?</small>
                </Link>
              </div>
              <div className='btn-submit'>
                <Button fullWidth type='submit' text="Login" />
              </div>
            </form>
            <div className='btn-login-google' onClick={handleClickBtnLoginGoogle}>
              <img className='icon-google' width={20} height={20} src={GOOGLE_LOGO} alt="google logo" />
              <Button icon={GOOGLE_LOGO} bgColor='white' fullWidth text="Login with Google" />
            </div>
            <div className='btn-login-facebook' onClick={handleClickBtnLoginFacebook}>
              <img className="icon-facebook" width={20} height={20} src={FACEBOOK_LOGO} alt="facebook logo" />
              <Button bgColor='white' fullWidth text="Login with Facebook" />
            </div>
            <Link to='/register'>
              <small className='have-account'>You don't have an account?</small>
            </Link>
          </div>
        </div>
      </div>
      {isLoading ? <LoadingSpinner /> : null}
    </React.Fragment>
  )
}

export default Login