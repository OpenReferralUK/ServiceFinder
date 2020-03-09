import React, { Component } from 'react';

class ServiceFeedbackButtons extends Component {
    render() {
        return (
            <div id="feedbackButtons" className="buttons w-100 d-flex justify-content-around ">
                <button type="button" className="btn btn-secondary btn-sm mx-5" onClick={() => window.$('#feedbackModal').appendTo('body').modal('show')}>Give feedback</button>
                <div className="modal fade" id="feedbackModal" tabIndex="-1" role="dialog" aria-labelledby="feedbackModalLabel" aria-hidden="true" >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="feedbackModalLabel">Give Feedback</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Thank you for your feedback
                                                                    </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => window.$('#feedbackModal').appendTo('#feedbackButtons').modal('hide')} >Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" className="btn btn-secondary btn-sm mx-5" onClick={() => window.$('#reportErrorModal').appendTo('body').modal('show')}>Report Error</button>
                <div className="modal fade" id="reportErrorModal" tabIndex="-1" role="dialog" aria-labelledby="reportErrorModalLabel" aria-hidden="true" >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="reportErrorModalLabel">Report Error</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Your report will be tested. <br /> Thank you
                                                                    </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => window.$('#reportErrorModal').appendTo('#feedbackButtons').modal('hide')} >Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceFeedbackButtons;