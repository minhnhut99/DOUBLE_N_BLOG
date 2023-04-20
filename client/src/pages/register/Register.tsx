import Input from '@/components/input/Input'
import Button from '@/components/button/Button'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import './Register.scss'
import { useNavigate } from 'react-router-dom';
interface FormValues {
  username: string;
  password: string;
  confirmpassword: string;
  email: string;
  gender: string;
  address: string;
  birthday: string
}
const Register = () => {
  const navigate = useNavigate();
  const registerOptions = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address"
      }
    },
    gender: {

    },
    address: {
      required: "Address is required",
      minLength: {
        value: 10,
        message: "Address must have at least 10 characters"
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
    confirmpassword: {
      required: "Confirm password is required",
      validate: (val: string) => {
        if (watch("password") !== val) {
          return "Your passwords do no match";
        }
      }
    }
  };
  const { control, handleSubmit, watch
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
  const handleClickRedirectLogin = () => {
    navigate("/login")
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
                    type='password'
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
            <div className='register-form-item'>
              <Controller
                control={control}
                rules={registerOptions.confirmpassword}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input placeholder='confirm password'
                    value={value}
                    type='password'
                    onChange={onChange}
                    onBlur={onBlur}
                    name='confirmpassword'
                  />
                )}
                name="confirmpassword"
              />
            </div>
            <small className='error-alert'>
              {errors?.confirmpassword && errors.confirmpassword.message}
            </small>
            <div className='register-form-item'>
              <Controller
                control={control}
                rules={registerOptions.address}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input placeholder='address'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    name="address"
                  />
                )}
                name="address"
              />
            </div>
            <small className='error-alert'>
              {errors?.address && errors.address.message}
            </small>

            <div className='register-birthday'>
              <Controller
                control={control}
                rules={registerOptions.address}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    type='date'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    name="birthday"
                  />
                )}
                name="birthday"
              />
            </div>

            <div className='group-gender'>
              {/* men  */}
              <div className='register-gender-item'>
                <Controller
                  control={control}
                  rules={registerOptions.gender}
                  render={({ field: { onChange, onBlur } }) => (
                    <Input
                      type='radio'
                      value='men'
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
              <div className='register-gender-item'>
                <Controller
                  control={control}
                  rules={registerOptions.gender}
                  render={({ field: { onChange, onBlur } }) => (
                    <Input
                      type='radio'
                      value='women'
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
              <div className='register-gender-item'>
                <Controller
                  control={control}
                  rules={registerOptions.gender}
                  render={({ field: { onChange, onBlur } }) => (
                    <Input
                      type='radio'
                      value='other'
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
            <small onClick={handleClickRedirectLogin} className="have-account">You have account?</small>
            <div className='btn-submit'>
              <Button fullWidth type='submit' text="register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register