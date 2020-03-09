import React, { Component } from 'react';
import SmallPersonaProfile from './personaProfile/SmallPersonaProfile';
import SmallSearchMethod from './searchMethod/SmallSearchMethod';
import SearchingForContent from './searchingFor/SearchingForContent';
import FavouriteContent from './Favourites/FavouriteContent';
import store from '../../../Store/store';
import { getSavePreviousPageAction } from '../../../Store/Actions/actions';

export default class SmallBody extends Component {

    componentDidMount() {
        let previousPage = store.getState().tempSearches.previousPage;
        if (previousPage !== '') {
            let menuTablet = window.$('#MenuTablet');
            let mobileMenu = window.$('#MenuMobile');

            switch (previousPage) {
                case 'Search':
                    if (menuTablet) {
                        window.$('#MenuTablet a[href="#searchingFor"]').tab('show');
                    }
                    if (mobileMenu) {
                        window.$('#MenuMobile a[href="#searchingFor"]').tab('show');
                    }
                    break;
                case 'Favourites':
                    if (menuTablet) {
                        window.$('#MenuTablet a[href="#previousSearches"]').tab('show');
                        window.$('#favouriteService').collapse('show');
                    }
                    if (mobileMenu) {
                        window.$('#MenuMobile a[href="#previousSearches"]').tab('show');
                        window.$('#favouriteService').collapse('show');
                    }
                    break;
            }
        }
    }

    changePreviousPage = async page => {
        await store.dispatch(getSavePreviousPageAction(page));
    }

    render() {
        return (
            <div className="position-sticky">
                {window.innerWidth < 768 ?
                    <ul id="MenuMobile" className="bg-light align-items-center flex d-flex nav nav-pills nav-justified justify-content-center" role="tablist">
                        <li className="nav-item" onClick={() => this.changePreviousPage('setSearch')}>
                            <a style={{ height: '70px' }} className="nav-link rounded-0 p-1 m-0 d-flex justify-content-center align-items-center flex-column" id="personaProfileTab" data-toggle="tab" href="#personaProfile" role="tab" aria-controls="personaProfile" aria-selected="false">
                                <i className="material-icons" style={{ fontSize: '1.5em', width: '24px', height: '24px' }}>persona</i>
                                <small className="mb-0 text-nowrap">Set Search</small>
                            </a>
                        </li>
                        <li className="nav-item" onClick={() => this.changePreviousPage('AddToSearch')}>
                            <a style={{ height: '70px' }} className="nav-link rounded-0 p-1 m-0 d-flex justify-content-center  align-items-center flex-column" id="searchMethodTab" data-toggle="tab" href="#searchMethod" role="tab" aria-controls="searchMethod" aria-selected="false">
                                <i className="material-icons" style={{ fontSize: '1.5em', width: '24px', height: '24px' }}>find_replace</i>
                                <small className="mb-0 text-nowrap">Add to Search</small>
                            </a>
                        </li>
                        <li className="nav-item" onClick={() => this.changePreviousPage('Favourites')}>
                            <a style={{ height: '70px' }} className="nav-link rounded-0 p-1 m-0 d-flex justify-content-center  align-items-center flex-column" id="previousSearchesTab" data-toggle="tab" href="#previousSearches" role="tab" aria-controls="previousSearches" aria-selected="false">
                                <i className="material-icons" style={{ fontSize: '1.5em', width: '24px', height: '24px' }}>history</i>
                                <small className="mb-0 text-nowrap">Favourites</small>
                            </a>
                        </li>
                        <li className="nav-item" onClick={() => this.changePreviousPage('Search')}>
                            <a style={{ height: '70px' }} className="nav-link rounded-0 p-1 m-0 d-flex justify-content-center  align-items-center flex-column" id="searchingForTab" data-toggle="tab" href="#searchingFor" role="tab" aria-controls="searchingFor" aria-selected="false">
                                <i className="material-icons" style={{ fontSize: '1.5em', width: '24px', height: '24px' }}>search</i>
                                <small className="mb-0 text-nowrap">Searching</small>
                            </a>
                        </li>
                    </ul>
                    :
                    <ul id="MenuTablet" className="bg-light flex align-items-center nav nav-pills nav-justified d-flex justify-content-center" role="tablist">
                        <li className="nav-item" onClick={() => this.changePreviousPage('setSearch')}>
                            <a className="nav-link rounded-0 text-nowrap" id="personaProfileTab" data-toggle="tab" href="#personaProfile" role="tab" aria-controls="personaProfile" aria-selected="false" onClick={() => this.changePreviousPage('')}>Set search</a>
                        </li>
                        <li className="nav-item" onClick={() => this.changePreviousPage('AddToSearch')}>
                            <a className="nav-link rounded-0 text-nowrap" id="searchMethodTab" data-toggle="tab" href="#searchMethod" role="tab" aria-controls="searchMethod" aria-selected="false" onClick={() => this.changePreviousPage()}>Add to Search</a>
                        </li>
                        <li className="nav-item" onClick={() => this.changePreviousPage('Favourites')}>
                            <a className="nav-link rounded-0 text-nowrap" id="previousSearchesTab" data-toggle="tab" href="#previousSearches" role="tab" aria-controls="previousSearches" aria-selected="false" onClick={() => this.changePreviousPage()}>Favourites</a>
                        </li>
                        <li className="nav-item" onClick={() => this.changePreviousPage('Search')}>
                            <a className="nav-link rounded-0 text-nowrap" id="searchingForTab" data-toggle="tab" href="#searchingFor" role="tab" aria-controls="searchingFor" aria-selected="false" onClick={() => this.changePreviousPage()}>Searching</a>
                        </li>
                    </ul>
                }
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="homeWords">
                        <p className="h6 m-5 text-justify">
                            Service Finder is targeted at any public or third sector frontline worker looking to find services that might support the needs and circumstances of a citizen.It accesses open data collected to meet the data standard of the <a href="https://openreferral.org" target="_blank" rel="noopener noreferrer">OpenReferral community.</a>
                        </p>
                        <p className="h6 m-5 text-justify">
                            Developed by <a href="https://www.vidavia.com/" target="_blank" rel="noopener noreferrer">VidaVia</a> and made available under the <a href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" target="_blank" rel="noopener noreferrer">Open Government Licence</a> subject to acknowledging the source as <a href="https://github.com/esd-org-uk/human-services" target="_blank" rel="noopener noreferrer">OpenCommunity</a> in co-operation with the <a href="https://www.local.gov.uk/" target="_blank" rel="noopener noreferrer">Local Government Association</a>.
                        </p>
                    </div>
                    <div className="tab-pane fade" id="personaProfile" role="tabpanel" aria-labelledby="personaProfileTab">
                        <SmallPersonaProfile />
                    </div>
                    <div className="tab-pane fade" id="searchMethod" role="tabpanel" aria-labelledby="searchMethodTab">
                        <SmallSearchMethod />
                    </div>
                    <div className="tab-pane fade" id="previousSearches" role="tabpanel" aria-labelledby="previousSearchesTab">
                        <FavouriteContent />
                    </div>
                    <div className="tab-pane fade" id="searchingFor" role="tabpanel" aria-labelledby="searchingForTab">
                        <div className="container">
                            <SearchingForContent />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

document.addEventListener('scroll', function () {
    let navbar = window.$('nav')[0];
    let navbarHeight = window.$(navbar).outerHeight();

    let scroll = window.$(document).scrollTop();

    let tabletMenuView = window.$('#MenuTablet');
    let tabletMenuHeight = window.$(tabletMenuView).outerHeight();

    let mobileMenuView = window.$('#MenuMobile');
    let mobileMenuHeight = window.$(mobileMenuView).outerHeight();

    let personaContent = window.$('#personaProfile');
    let searchContent = window.$('#searchMethod');
    let previousContent = window.$('#previousSearches');
    let searchingContent = window.$('#searchingFor');

    if (scroll > navbarHeight) {
        // Improve the tablet menu
        if (tabletMenuView !== undefined) {
            tabletMenuView.addClass('fixed').removeClass('flex');

            personaContent.css('margin-top', tabletMenuHeight + 15);
            searchContent.css('margin-top', tabletMenuHeight + 15);
            previousContent.css('margin-top', tabletMenuHeight + 15);
            searchingContent.css('margin-top', tabletMenuHeight + 15);
        }

        // Improve the mobile menu
        if (mobileMenuView !== undefined) {
            mobileMenuView.addClass('fixed').removeClass('flex');

            personaContent.css('margin-top', mobileMenuHeight + 15);
            searchContent.css('margin-top', mobileMenuHeight + 15);
            previousContent.css('margin-top', mobileMenuHeight + 15);
            searchingContent.css('margin-top', mobileMenuHeight + 15);
        }
    } else {
        // Improve the tablet menu
        if (tabletMenuView !== undefined) {
            tabletMenuView.addClass('flex').removeClass('fixed');
        }

        // Improve the mobile menu
        if (mobileMenuView !== undefined) {
            mobileMenuView.addClass('flex').removeClass('fixed');
        }

        personaContent.css('margin-top', '0');
        searchContent.css('margin-top', '0');
        previousContent.css('margin-top', '0');
        searchingContent.css('margin-top', '0');
    }
})