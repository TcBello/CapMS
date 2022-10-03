import { Component } from "react";
import '../Login.css';

class BackgroundLogin extends Component{
    render(){
        return (
            <div>
                <div className="background-login-blur"/>
                <div className="background-login"/>
                {/* <div className="background-login-blur"/> */}
            </div>
        );
    }
}

export default BackgroundLogin;