import React, { Component } from 'react';

class ResultsContentPagination extends Component {
    render() {
        return (
            <>
                {this.props.results.content.length > 0 &&
                    <div className="col-xl-auto my-2">
                        <div className="d-flex justify-content-center align-items-center">
                            <p className='mb-0 mr-2'>Show </p>
                            <select id="perPage" className="form-control col-6" value={this.props.perPage} onChange={this.props.changePagination}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <p className='mb-0 ml-2'>results </p>
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default ResultsContentPagination;