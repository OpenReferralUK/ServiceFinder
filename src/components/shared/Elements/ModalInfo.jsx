import React, { Component } from 'react';

class ModalInfo extends Component {
    render() {
        return (
            <>
                <div className="modal fade" id={this.props.payload.id} tabIndex="-1" role="dialog" aria-labelledby={this.props.payload.id} aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className={`modal-content border-${this.props.payload.type}`}>
                            <div className="card-header">
                                <h3 className="mb-0">{this.props.payload.title}</h3>
                            </div>
                            <div className="modal-body">
                                <p className="mb-0">{this.props.payload.message}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ModalInfo;