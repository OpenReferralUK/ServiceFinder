import React, { Component } from 'react';
import FavouriteSearchContent from './Searches/FavouriteSearchContent';
import FavouriteServicesContent from './Services/FavouriteServicesContent';

class FavouriteContent extends Component {
    render() {
        return (
            <>
                <div className="accordion container mt-2" id="favouritesAccordion">
                    <div className="card rounded border m-0 mb-1 favouritesSearches">
                        <button className="border-0 rounded-top p-0 card-header panel-title" data-toggle="collapse" data-target="#favouriteSearches" aria-expanded="false" aria-controls="favouriteSearches">
                            <span className="btn_content py-2" tabIndex="-1">
                                Favourite Searches
                            </span>
                        </button>
                        <div id="favouriteSearches" className="collapse" aria-labelledby="favouriteAccordion" data-parent="#favouritesAccordion">
                            <div className="card-body">
                                <FavouriteSearchContent />
                            </div>
                        </div>
                    </div>

                    <div className="card rounded m-0 favouritesServices">
                        <button className="border-0 rounded-top p-0 card-header panel-title" data-toggle="collapse" data-target="#favouriteService" aria-expanded="true" aria-controls="favouriteService">
                            <span className="btn_content py-2" tabIndex="-1">
                                Favourite Services
                            </span>
                        </button>
                        <div id="favouriteService" className="collapse show" aria-labelledby="favouriteAccordion" data-parent="#favouritesAccordion">
                            <div className="card-body">
                                <FavouriteServicesContent />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default FavouriteContent;