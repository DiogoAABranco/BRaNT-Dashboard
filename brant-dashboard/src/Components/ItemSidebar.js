import React, {Component} from 'react'

class ItemSidebar extends Component {
    
    render(){
        return <li class={this.props.state}>
                    <a href={this.props.href}>{this.props.item}</a>
                </li>
    }
}
export default ItemSidebar