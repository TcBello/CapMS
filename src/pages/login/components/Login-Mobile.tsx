import { Component } from "react";
import MediaQuery from "react-responsive";

class LoginMobile extends Component{
    render(){
        return (
            <div>
                {/* <MediaQuery maxWidth={760}> */}
                    <h1>This is Mobile</h1>
                {/* </MediaQuery> */}
            </div>
        );
    }
}

export default LoginMobile;