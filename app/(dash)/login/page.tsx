'use client';

import {Input} from "@nextui-org/input";
import { useState } from 'react';
import { signUp, logIn } from '../../../libs/auth';


export default function HomePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          if (isLogin) {
            await logIn(email, password);
            alert('Login successful!');
          } else {
            await signUp(email, password);
            alert('Sign up successful!');
          }
        } catch (error: any) {
          alert(error.message);
        }
      };


    return (
        <div className="wrapper flex justify-center content-center items-center		">
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">   
                <Input type="email" label="Email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />

            <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">   
            <Input type="password" label="Password"  value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
            <i className='bx bxs-lock'></i>
            </div>

            <div className="remember-forgot">
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot</a>
            
            </div>

            <button type="submit" className="btn" onClick={() => setIsLogin(isLogin)}>Login</button>
            <button type="submit" className="btn" onClick={() => setIsLogin(!isLogin)}>Sign Up</button>
            <div className="register-link">
                <p>Dont have an account? <a href="#">Register Here</a></p>
            </div>
        </form>

    </div>
    )
}
