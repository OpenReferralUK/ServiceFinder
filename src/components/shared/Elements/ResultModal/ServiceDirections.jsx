import React, { Component } from 'react';

class ServiceDirections extends Component {
    render() {
        return (
            <div>
                {this.props.item.service_at_locations.length > 0 &&
                    <ul className="list-group">
                        {this.props.item.service_at_locations.map(item =>
                            item.location.physical_addresses.map((item, i) => (
                                <li className="list-group-item " key={i}>
                                    <div className="row d-flex align-items-center justify-content-between">
                                        <p className="mb-0 col-sm-auto">{item.address_1}</p>
                                        <div className="col-sm-auto">
                                            <a href={`http://www.google.com/maps/place/${item.postal_code}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} className="btn btn-sm btn-secondary text-nowrap">
                                                View on Map
                                                                        </a>
                                            {this.props.user_postcode &&
                                                <a href={`http://www.google.com/maps/dir/${this.props.user_postcode}/${item.postal_code}`} target='_blank' rel="noopener noreferrer" style={{ textDecoration: 'none' }} className="mx-2 btn btn-sm btn-secondary text-nowrap">
                                                    View Directions
                                                                            </a>
                                            }
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export default ServiceDirections;