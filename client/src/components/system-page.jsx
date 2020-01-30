import React from 'react';
import System from './system-fiber';

export default class SystemPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: null,
            shops: [],
            categorie: null,
        }
    }

    componentDidMount(){
        this.setState({
            loading: true
         })            
        fetch(`${process.env.REACT_APP_API_BASE_URL}/shops?category=${this.props.match.params.id}`)
        .then(res => res.json())
        .then(res => {
             this.setState({
                shops: res["hydra:member"],
                loading:false,
                categorie: this.props.match.params.id
             })            
        })

        
    }

    render() {

if(this.state.loading === false) {
        return(
      
        <System shops = {this.state.shops}
                categorie = {this.state.categorie}/>
        )
    }

    else{
        return(null);
    }
}
}