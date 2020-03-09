import React from 'react';

import SearchMethodContent from './SearchMethodContent';

export default class BigSearchMethod extends React.Component {

    render() {
        return (
            <div className="rounded m-2" data-parent="#accordion">
                <div className="card searchMethod" id="searchMethod">
                    <button className="border-0 rounded-top p-0 card-header panel-title cursor-pointer" id="searchMethodHeading" data-toggle="collapse" data-target="#searchMethodCollapse" aria-expanded="false" aria-controls="searchMethodCollapse">
                        <span className="btn_content" tabIndex="-1">
                            <div className="d-flex flex-column align-items-start">
                                <h5 className="mb-0">Add to Search</h5>
                                <p className="mb-0">This will describe additional elements of the client search</p>
                            </div>
                        </span>
                    </button>

                    <div id="searchMethodCollapse" className="collapse" aria-labelledby="personaProfilleHeading" data-parent="#mainAccordion">
                        <div className="card-body">
                            <SearchMethodContent />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}