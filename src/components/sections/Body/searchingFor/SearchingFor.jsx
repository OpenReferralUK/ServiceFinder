import React from 'react';
import SearchingForContent from './SearchingForContent';


export default class PreviousSearches extends React.Component {

    render() {
        return (
            <div className="rounded my-1 mx-2" data-parent="#accordion">
                <div className="card searchingFor" id="searchMethod">
                    <button className="card-header border-0 rounded-top p-0 panel-title cursor-pointer" id="searchingForHeading" data-toggle="collapse" data-target="#searchingForCollapse" aria-expanded="true" aria-controls="searchingForCollapse">
                        <span className="btn_content" tabIndex="-1">
                            <div className="d-flex flex-column align-items-start">
                                <h5 className="mb-0">Search</h5>
                                <p className="mb-0">Below are the items currently selected</p>
                            </div>
                        </span>
                    </button>

                    <div id="searchingForCollapse" className="collapse show" aria-labelledby="personaProfilleHeading" data-parent="#searches">
                        <div className="card-body">
                            <SearchingForContent />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}