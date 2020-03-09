import React, { Component } from 'react';

class ServiceDescription extends Component {
    state = {
        descriptionOpen: false
    }

    render() {
        return (
            <div>
                {this.props.item.description &&
                    <div id="description">
                        <div id="descriptionOne" className=" w-100 panel-title mt-2" data-toggle="collapse" data-target="#descriptionOneTab" aria-expanded="false" aria-controls="descriptionOneTab"
                            onClick={() => {
                                window.$('#descriptionOneTab').on('shown.bs.collapse', () => {
                                    this.setState({ descriptionOpen: true })
                                });

                                window.$('#descriptionOneTab').on('hide.bs.collapse', () => {
                                    this.setState({ descriptionOpen: false })
                                });
                            }}>
                            <button className="border-0 p-0 bg-transparent w-100 d-flex justify-content-start">
                                <h4 className="mb-0">Description</h4>
                            </button>
                        </div>
                        <hr className="my-1" />
                        {!this.state.descriptionOpen &&
                            <div className="card-body">
                                {this.props.item.description.length > 150 ?
                                    this.props.item.description.substr(0, 150) + '...'
                                    :
                                    this.props.item.description.substr(0, this.props.item.description.length)}
                            </div>
                        }
                        <div id="descriptionOneTab" className="collapse" aria-labelledby="descriptionOne" data-parent="#description">
                            {this.state.descriptionOpen &&
                                <div className="card-body">
                                    {this.props.item.description}
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default ServiceDescription;