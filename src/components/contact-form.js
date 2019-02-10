import React from 'react';
import classNames from 'classnames';
import { Alert } from 'react-bootstrap';
import ReCAPTCHA  from 'react-google-recaptcha';

class ContactForm extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.siteKey = process.env.RECAPTCHA_KEY;

        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.subjectRef = React.createRef();
        this.msgRef = React.createRef();

        this.state = {
            wasValidated: false,
            verifiedCaptcha: false,
            showSuccess: false,
            recaptcha: ''
        };
    }

    onSubmit = ev => {
        ev.preventDefault();

        if (!this.state.wasValidated) {
            this.setState({ wasValidated: true });
        }

        const data = {
            name: this.nameRef.current.value,
            email: this.emailRef.current.value,
            subject: this.subjectRef.current.value,
            message: this.msgRef.current.value,
            recaptcha: this.state.recaptcha
        };

        fetch('/.netlify/functions/sendmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            this.setState({ showSuccess: true });
        })
        .catch(err => {
            console.log(err);
        });
    }

    onVerifyCaptchaSuccess = response => {
        this.setState({ verifiedCaptcha: true, recaptcha: response });
    };

    render() {
        return (
            <form className={classNames({ 'was-validated': this.state.wasValidated }, 'needs-validation contact-form col-lg-6 mx-auto')} style={{ marginTop: '3rem', marginBottom: '3rem' }} onSubmit={this.onSubmit}>
                {this.state.showSuccess ? (
                    <Alert dismissible variant="success">
                        Your message has been sent to us. Thank you!
                    </Alert>
                ) : null}
                <div className="form-group">
                    <label for="name" className="form-control-label">Your Name</label>
                    <input type="text" id="name" name="name" className="form-control" required ref={this.nameRef} />
                    <div className="invalid-feedback">Your name is required.</div>
                </div>
                <div className="form-group">
                    <label for="email" className="form-control-label">Your Email</label>
                    <input type="email" id="email" name="email" className="form-control" required ref={this.emailRef} />
                    <div className="invalid-feedback">Your email is required.</div>
                </div>
                <div className="form-group">
                    <label for="subject" className="form-control-label">Subject</label>
                    <input type="text" id="subject" name="subject" className="form-control" required ref={this.subjectRef} />
                    <div className="invalid-feedback">Subject is required.</div>
                </div>
                <div className="form-group">
                    <label for="message" className="form-control-label">Message</label>
                    <textarea id="message" name="message" rows="8" className="form-control" required ref={this.msgRef}></textarea>
                    <div className="invalid-feedback">Your message is required.</div>
                </div>
                <div className="form-group">
                    <ReCAPTCHA sitekey={this.siteKey} onChange={this.onVerifyCaptchaSuccess} />
                </div>
                <div className="form-actions">
                    <input type="submit" id="submit" name="submit" className="btn btn-primary" value="Submit" onClick={this.onSubmit} disabled={!this.state.verifiedCaptcha} />
                    <input type="reset" id="reset" name="reset" className="btn btn-default" value="Reset" />
                </div>
            </form>
        );
    }
}


export default ContactForm;