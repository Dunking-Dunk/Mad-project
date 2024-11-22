import "./login.scss"
import React, {useState} from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signIn } from "../../store/actions/action" 

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signIn({ email, password })).then(() => {
        navigate('/')
    }).catch((error) => {
        setErrors(error.response?.data.errors)
      })
    setEmail('')
    setPassword('')
  }

  return (
    <div className="login__container">
      <img src='adminLogin.jpeg' className="login__image"/>
      <form className="login__form__container" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {errors && errors.map((error, index) => {
          return (
            <p key={index} className='error'>{error.message}</p>
          )
        })}
        <input type='email' placeholder="email" onChange={(e) => {
          setEmail(e.target.value)
        }} value={email} />
        <input type='password' placeholder="password"  onChange={(e) => {
          setPassword(e.target.value)
        }} value={password} />
        <button >Submit</button>
      </form>
    </div>
  )
}

export default Login