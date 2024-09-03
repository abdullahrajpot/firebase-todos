import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Contexts/AuthContext';


const { Title } = Typography
const { toastify,isEmail } = window
const initialState = { email: '', password: '' };
export default function Login() {

  const Navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false)
  const { dispatch } = useAuthContext();


  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { email, password, } = state;


    if (!isEmail(email)) { return toastify("Enter your correct Email address", "error") }
    if (password.length < 6) { return toastify("Password must be atleast 6 chars", "error") }

    setIsProcessing(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("users =>", user)
        dispatch({ type: "SET_LOGGED_IN", payload: { user: user } })
        Navigate('/dashbord')
        toastify("User Logged In", "success")
        // ...
      }).catch((error) => {
        console.error("error=>", error)
        switch (error.code) {
          case "auth/email-already-in-use":
            toastify("Email address already in use", "error")

            break;

          default:
            toastify("SomeThing went wrong while login", "error")
            Navigate('/auth/register')
            break;
        }
        // ..
      }).finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <main className='auth d-flex justify-content-center align-items-center'>

      <div className="card p-3 p-md-4 w-100 " style={{ maxWidth: '450px' }}>
        <Title level={2} className="text-center">Login</Title>
        <Form onSubmitCapture={handleSubmit}>
          <Row gutter={[16, 16]}>

            <Col span={24}>
              <Input size='large' type="email" placeholder="Enter your Email" name='email' value={state.email} onChange={handleChange} />
            </Col>
            <Col span={24} >
              <Input.Password size='large' placeholder="Enter your password" name='password' value={state.password} onChange={handleChange} />
              <Link to='forgotpassword' style={{
                textDecoration: "none", display: 'flex', float: 'right',
                color: 'black'
              }} > Forgot Password</Link>
            </Col>
            <Col span={24}>
              <Button type='primary' size='large' htmlType='submit' onClick={handleSubmit} block loading={isProcessing} >Login  </Button>
            <p className=' d-flex justify-content-center mt-2'>Don't have an account?  <Link to='/Auth/register' style={{ textDecoration: 'none', color: 'black' }}>  Sign up</Link></p>
            </Col>

          </Row>
        </Form>
      </div>
    </main >
  )
}
