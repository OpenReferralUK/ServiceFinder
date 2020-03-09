import React, { Component } from 'react';

class ServiceEmail extends Component {
    render() {
        return (
            <div>
                <h5>Contact email:</h5>
                {this.props.item.email ?
                    <ul>
                        <li>
                            <div className="d-flex align-items-center justify-content-between row">
                                <div className="col-md">
                                    {this.props.item.email}
                                </div>
                                <div className="col-md-auto">
                                    <a className="d-flex align-items-center btn btn-sm btn-secondary" href={`mailto:${this.props.item.email}`} style={{ textDecoration: 'none' }}>
                                        <i className="material-icons md-14 mr-2">email</i>
                                        Send email
                                                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    :
                    <p className="text-muted">No email info</p>
                }
            </div>
        );
    }
}

export default ServiceEmail;