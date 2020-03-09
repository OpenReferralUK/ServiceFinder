import React from 'react';
import InfoServiceSection from '../../shared/Elements/InfoServiceSection';
import ServiceContact from '../../shared/Elements/ResultModal/ServiceContact';
import ServiceEmail from '../../shared/Elements/ResultModal/ServiceEmail';
import ServicePhysicalAddresses from '../../shared/Elements/ResultModal/ServicePhysicalAddresses';

export default class ContactInfoComponent extends React.Component {
    render() {
        return (
            <>
                <InfoServiceSection title="Contact">
                    <div>
                        {/* Phone number */}
                        <ServiceContact item={this.props.data} />

                        {/* Email info */}
                        <ServiceEmail item={this.props.data} />

                        {/* Physical Addresses */}
                        <ServicePhysicalAddresses item={this.props.data} />
                    </div>
                </InfoServiceSection>
            </>
        )
    }
}