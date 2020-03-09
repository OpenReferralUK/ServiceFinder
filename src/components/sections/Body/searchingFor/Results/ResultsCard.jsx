import React, { Component } from 'react';

class ResultsCard extends Component {
    render() {
        return (
            <>
                {this.props.results.content.map((item, i) => {
                    let favItem = this.props.favourites.filter(favItem => favItem.id === item.id)[0];
                    return (
                        <div className="card" key={i}>
                            <div className="card-header py-0 collapsed d-flex ml-0 row w-100 justify-content-between" id={item.id}>
                                <button className="d-flex border-0 bg-transparent p-0 results-title col-xl p-2 w-100 align-items-center cursor-pointer" data-toggle="collapse" data-target={`#Tab${i}`} aria-expanded="false" aria-controls={`Tab${i}`}>
                                    <span className="btn_content" tabIndex="-1">
                                        <p className="mb-0 ml-1 text-left">
                                            {item.name}
                                        </p>
                                    </span>
                                </button>
                                <div className="d-flex justify-content-end col p-2 w-100 align-items-center">
                                    <button className="btn btn-secondary btn-sm mr-1 d-flex justify-content-center" type="button" onClick={() => this.props.updateFavourite(item)}>
                                        <i className="mb-0 material-icons" style={{
                                            color: favItem && '#FFC900'
                                        }}>star</i>
                                    </button>
                                    <button className=" btn btn-info btn-sm d-flex ml-1 justify-content-center" type="button" onClick={() => this.props.showModal(item)}>
                                        <p className="mb-0 text-nowrap">View Details</p>
                                    </button>
                                </div>
                            </div>

                            <div id={`Tab${i}`} className="collapse" aria-labelledby={item.id} data-parent="#accordionResults">
                                <div className="card-body">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        );
    }
}

export default ResultsCard;