import React from 'react';
import FavouriteContent from './FavouriteContent';

export default class FavouritePanel extends React.Component {

    render() {
        return (
            <div className="rounded m-2" data-parent="#services">
                <div className="card favouritePanel" id="FavouritePanel">
                    <button className="card-header border-0 rounded-top p-0 panel-title cursor-pointer" id="FavouritesSearchesHeading" data-toggle="collapse" data-target="#FavouritePanelCollapse" aria-expanded="true" aria-controls="FavouritePanelCollapse">
                        <span className="btn_content" tabIndex="-1">
                            <div className="d-flex flex-column align-items-start">
                                <h5 className="mb-0">Favourites</h5>
                                <p className="mb-0">Click to retrieve a favourite service</p>
                            </div>
                        </span>
                    </button>

                    <div id="FavouritePanelCollapse" className="collapse show" aria-labelledby="FavouritesSearchesHeading" data-parent="#searches">
                        <div className="card-body">
                            <FavouriteContent />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}