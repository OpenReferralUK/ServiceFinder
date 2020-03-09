import React from 'react';
import store from '../../../Store/store';
import { getSavePreviousPageAction } from '../../../Store/Actions/actions';

export default class SearchButton extends React.Component {
    showSearches = () => {
        store.dispatch(getSavePreviousPageAction('Search'));
        window.$('#MenuMobile li:last-child a').tab('show')
        window.$('#MenuTablet li:last-child a').tab('show')
    }
    render() {
        return (
            <>
                <div className="search-button-div mobile-only tablet-only cursor-pointer" onClick={this.showSearches}>
                    <p className="search-button material-icons">search</p>
                </div>
            </>
        )
    }
}