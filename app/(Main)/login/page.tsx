import {Input} from "@nextui-org/input";

export default function HomePage() {
    return (
        <div className="wrapper flex justify-center content-center items-center		">
        <form>
            <h1>Login</h1>
            <div className="input-box">   
                <Input type="email" label="Email" />
            <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">   
            <Input type="email" label="Email" />
            <i className='bx bxs-lock'></i>
            </div>

            <div className="remember-forgot">
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot</a>
            
            </div>

            <button type="submit" className="btn">Login</button>

            <div className="register-link">
                <p>Dont have an account? <a href="#">Register Here</a></p>
            </div>
        </form>

    </div>
    )
}
