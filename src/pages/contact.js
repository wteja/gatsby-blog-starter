import React from 'react';

import Layout from '../components/layout';
import ContactForm from '../components/contact-form';
import SEO from '../components/seo';

const ContactPage = () => {
    return (
        <Layout>
            <SEO title="Home" />
            <div className="container">
                <div style={{ margin: '2rem auto' }}>
                    <div className="text-center">
                        <h1>Contact Us</h1>
                        <p>Your feedbacks, ideas, opinions, questions or whatever always welcome!<br />We would like to hear from you!</p>
                    </div>
                    <ContactForm />
                </div>
            </div>
        </Layout>
    );
}

export default ContactPage;