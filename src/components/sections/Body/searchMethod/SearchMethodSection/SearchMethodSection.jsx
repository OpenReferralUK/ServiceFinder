import React, { Component } from 'react';

import SectionTitle from '../../../../shared/Elements/SectionTitle';

export default class SearchMethodSection extends Component {
    render() {
        return (
            <div className="container mt-2 searchMethodSection">
                <hr className="mx-0 my-0 mb-2" />
                <SectionTitle title={this.props.title} description={this.props.description} />
                <div className="mx-3">
                    {this.props.children}
                </div>
            </div>
        )
    }
}