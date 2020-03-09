import React, { Component } from 'react';
import FavouritePanel from './Favourites/FavouritePanel';
import BigPersonaProfile from './personaProfile/BigPersonaProfile';
import SearchingFor from './searchingFor/SearchingFor';
import BigSearchMethod from './searchMethod/BigSearchMethod';

export default class BigBody extends Component {

    render() {
        return (
            <div className="d-flex">
                <div className="container">
                    <div id="mainAccordion" className="accordion">
                        <BigPersonaProfile />
                        <BigSearchMethod />
                    </div>
                </div>
                <div className="container mb-3">
                    <div id="searches">
                        <FavouritePanel />
                    </div>
                    <div id="searching" className="accordion sticky position-sticky">
                        <SearchingFor />
                    </div>
                </div>
            </div >
        )
    }
}