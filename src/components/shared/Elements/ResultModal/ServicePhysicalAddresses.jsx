import React, { Component } from 'react';

class ServicePhysicalAddresses extends Component {
    render() {
        return (
            <div>
                <h5>Physical Addresses</h5>
                {this.props.item.service_at_locations.length > 0 ?
                    this.props.item.service_at_locations.map((item, i) =>
                        <div key={i}>
                            {item.location.physical_addresses.length > 0 &&
                                <ul>
                                    {item.location.physical_addresses.map((itemAddress, i) =>
                                        <div key={i}>
                                            <li className="mb-0">{itemAddress.address_1}{itemAddress.city}({itemAddress.postal_code})</li>
                                        </div>)}
                                </ul>
                            }
                        </div>
                    )
                    :
                    <p className="text-muted">No Physical Addresses</p>
                }
            </div>
        );
    }
}

export default ServicePhysicalAddresses;