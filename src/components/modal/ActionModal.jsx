export const MODAL_WARNING_AVAILABILITY_CHOOSE = {
    id: 'modalAvailabilityFields',
    type: "warning",
    title: 'Warning',
    message: 'You must to choose day and time.'
}

export const MODAL_SERVICE_LIST_COPIED = {
    id: "modalServiceListCopied",
    type: "success",
    title: 'List copied!',
    message: "Now you can share the list."
}

export const MODAL_SHARE_LINK_COPIED = {
    id: 'modalShareLinkCopied',
    type: 'success',
    title: 'Text copied!',
    message: "A share link has been copied to your clipboard.",
    buttons: [
        {
            title: 'View list', type: 'link', color: 'primary', onClick: (finalResult) => {
                this.props.history.push('/service-list/' + finalResult);
            }
        }
    ]
}