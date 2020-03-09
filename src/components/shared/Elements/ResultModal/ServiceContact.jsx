import React, { Component } from 'react';

class ServiceContact extends Component {
    render() {
        return (
            <div>
                <h5>Contact tel: </h5>
                {this.props.item.contacts.length > 0 ?
                    <ul>
                        {this.props.item.contacts.map((item, i) => (
                            item.phones.map(itemPhone => (
                                <li className="mb-0" key={i}>{itemPhone.number}</li>
                            ))

                        ))}
                    </ul>
                    :
                    <p className="text-muted">No contact info</p>
                }
            </div>
        );
    }
}

export default ServiceContact;