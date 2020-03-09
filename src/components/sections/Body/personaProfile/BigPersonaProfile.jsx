import React, { Component } from 'react';
import PersonaProfileContent from './PersonaProfileContent';

export default class BigPersonaProfile extends Component {

    render() {
        return (
            <div className="rounded mt-2 ml-2 mr-2" data-parent="#accordion">
                <div className="card personaProfile">
                    <button className="border-0 rounded-top card-header p-0 panel-title cursor-pointer" id="personaProfileHeading" data-toggle="collapse" data-target="#personaProfileCollapse" aria-expanded="false" aria-controls="personaProfileCollapse">
                        <span className="btn_content" tabIndex="-1">
                            <div className="d-flex flex-column align-items-start">
                                <h5 className="mb-0">Set search</h5>
                                <p className="mb-0">This will describe key elements of the client search</p>
                            </div>
                        </span>
                    </button>

                    <div id="personaProfileCollapse" role="button" className="collapse" aria-labelledby="personaProfilleHeading" data-parent="#mainAccordion">
                        <div className="card-body">
                            <PersonaProfileContent />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}