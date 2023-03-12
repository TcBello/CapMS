import { Component } from "react";
import "./ContentHeader.css";

class ContentHeader extends Component<{title: string},{}>{
    constructor(props: any){
        super(props);
    }

    render(){
        return (
            <div className="content-header-container">
                <p>{this.props.title}</p>
            </div>
        );
    }
}

export default ContentHeader;