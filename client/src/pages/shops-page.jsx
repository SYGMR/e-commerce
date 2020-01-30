import React from 'react';
import SolarSystem from '../components/solar-system';

export default class ShopsPage extends React.Component {

    render() {
        return <SolarSystem category_id={this.props.match.params.id} />
    }
}