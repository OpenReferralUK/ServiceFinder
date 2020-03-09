import React from 'react';
import SearchButton from '../../../shared/Elements/SearchButton';
import AnswersQuestionComponent from './subcomponents/AnswersQuestion-component';
import AreaComponent from './subcomponents/Area-component';
import CircumstancesComponent from './subcomponents/Circumstances-component';
import NeedsComponent from './subcomponents/Needs-component';
import PersonasComponent from './subcomponents/Personas-component';
import TypeComponent from './subcomponents/Type-component';


export default class SearchMethodContent extends React.Component {

    options = [
        { value: "collapse_type", label: "Type of Service", actv: false },
        { value: "collapse_need", label: "Needs", actv: false },
        { value: "collapse_circumstances", label: "Circumstances", actv: false },
        { value: "collapse_area", label: "Area", actv: false },
        { value: "collapse_personas", label: "Typical client grouping", actv: false },
        { value: "collapse_aq", label: "Questions & Answers", actv: false },
    ]

    handleSelect = async (item) => {
        window.$(`#${item.value}`).collapse('show');
        window.$('html, body').animate({
            scrollTop: window.$(`#${item.value}`).offset().top
        }, 200);
    }

    render() {
        return (
            <>
                <SearchButton />
                <div className="w-100 d-flex justify-content-center flex-column px-2">
                    {window.innerHeight > 767 ?
                        <>
                            <div className="row my-2">
                                <div className="col-sm-4 my-1">
                                    <button
                                        className="border-0 px-2 w-100 rounded card-header"
                                        style={{ height: '75px' }}
                                        onClick={() => this.handleSelect(this.options[0])}>
                                        {this.options[0].label}
                                    </button>
                                </div>
                                <div className="col-sm-4 my-1">
                                    <button
                                        className="border-0 px-2 w-100 rounded card-header"
                                        style={{ height: '75px' }}
                                        onClick={() => this.handleSelect(this.options[1])}>
                                        {this.options[1].label}
                                    </button>
                                </div>
                                <div className="col-sm-4 my-1">
                                    <button
                                        className="border-0 px-2 w-100 rounded card-header"
                                        style={{ height: '75px' }}
                                        onClick={() => this.handleSelect(this.options[2])}>
                                        {this.options[2].label}
                                    </button>
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-sm-4 my-1">
                                    <button
                                        className="border-0 px-2 w-100 rounded card-header"
                                        style={{ height: '75px' }}
                                        onClick={() => this.handleSelect(this.options[3])}>
                                        {this.options[3].label}
                                    </button>
                                </div>
                                <div className="col-sm-4 my-1">
                                    <button
                                        className="border-0 px-2 w-100 rounded card-header"
                                        style={{ height: '75px' }}
                                        onClick={() => this.handleSelect(this.options[4])}>
                                        {this.options[4].label}
                                    </button>
                                </div>
                                <div className="col-sm-4 my-1">
                                    <button
                                        className="border-0 px-2 w-100 rounded card-header"
                                        style={{ height: '75px' }}
                                        onClick={() => this.handleSelect(this.options[5])}>
                                        {this.options[5].label}
                                    </button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="row my-2">
                                <div className="col-sm-4 my-1">
                                    <button
                                        className="border-0 px-2 w-100 rounded card-header"
                                        style={{ height: '75px' }}
                                        onClick={() => this.handleSelect(this.options[0])}>
                                        {this.options[0].label}
                                    </button>
                                </div>
                                <div className="col-sm-4 my-1">
                                    <button
                                        className="border-0 px-2 w-100 rounded card-header"
                                        style={{ height: '75px' }}
                                        onClick={() => this.handleSelect(this.options[1])}>
                                        {this.options[1].label}
                                    </button>
                                </div>
                                <div className="col-sm-4 my-1">
                                    <button
                                        className="border-0 px-2 w-100 rounded card-header"
                                        style={{ height: '75px' }}
                                        onClick={() => this.handleSelect(this.options[2])}>
                                        {this.options[2].label}
                                    </button>
                                </div>
                                <div className="col-sm-4 my-1">
                                    <button
                                        className="border-0 px-2 w-100 rounded card-header"
                                        style={{ height: '75px' }}
                                        onClick={() => this.handleSelect(this.options[3])}>
                                        {this.options[3].label}
                                    </button>
                                </div>
                                <div className="col-sm-4 my-1">
                                    <button
                                        className="border-0 px-2 w-100 rounded card-header"
                                        style={{ height: '75px' }}
                                        onClick={() => this.handleSelect(this.options[4])}>
                                        {this.options[4].label}
                                    </button>
                                </div>
                                <div className="col-sm-4 my-1">
                                    <button
                                        className="border-0 px-2 w-100 rounded card-header"
                                        style={{ height: '75px' }}
                                        onClick={() => this.handleSelect(this.options[5])}>
                                        {this.options[5].label}
                                    </button>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div id="collapsables">
                    <div id="collapse_type" className="collapse" aria-labelledby="type" data-parent="#searchMethod">
                        <div>
                            <TypeComponent />
                        </div>
                    </div>

                    <div id="collapse_need" className="collapse" aria-labelledby="need" data-parent="#searchMethod">
                        <div>
                            <NeedsComponent />
                        </div>
                    </div>

                    <div id="collapse_circumstances" className="collapse" aria-labelledby="circumstances" data-parent="#searchMethod">
                        <div>
                            <CircumstancesComponent />
                        </div>
                    </div>

                    <div id="collapse_area" className="collapse" aria-labelledby="area" data-parent="#searchMethod">
                        <div>
                            <AreaComponent />
                        </div>
                    </div>

                    <div id="collapse_personas" className="collapse" aria-labelledby="personas" data-parent="#searchMethod">
                        <div>
                            <PersonasComponent />
                        </div>
                    </div>

                    <div id="collapse_aq" className="collapse" aria-labelledby="aq" data-parent="#searchMethod">
                        <div>
                            <AnswersQuestionComponent />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
