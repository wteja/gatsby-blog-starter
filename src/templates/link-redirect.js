import React, { Component } from 'react';

export class LinkRedirectTemplate extends Component {
    componentDidMount() {
        window.location.href = this.props.pageContext.url
    }

    render() {
        return (
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>Loading...</div>
        )
    }
}

export default LinkRedirectTemplate;