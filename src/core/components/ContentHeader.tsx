import { Component } from "react";
import "./ContentHeader.css";

class ContentHeader extends Component<{title: string},{}>{
    constructor(props: any){
        super(props);
    }

    render(){
        return (
            <div className="content-header-container">
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}

export default ContentHeader;