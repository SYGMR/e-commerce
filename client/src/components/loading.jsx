import React from 'react';
import {connect} from 'react-redux';
import loading from '../loading.css';

export default class Loading extends React.Component {
    render() {
        return (
            <>
            <div class="about">
                <a class="bg_links social portfolio" href="https://www.rafaelalucas.com" target="_blank">
                    <span class="icon"></span>
                </a>
                <a class="bg_links social dribbble" href="https://dribbble.com/rafaelalucas" target="_blank">
                    <span class="icon"></span>
                </a>
                <a class="bg_links social linkedin" href="https://www.linkedin.com/in/rafaelalucas/" target="_blank">
                    <span class="icon"></span>
                </a>
                <a class="bg_links logo"></a>
            </div>

            <div class="content">
                <div class="planet">
                    <div class="ring"></div>
                        <div class="cover-ring"></div>
                    <div class="spots">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>

                    </div>
                </div>
                <p>loading</p>
            </div>
            </>
        );
    }
}
