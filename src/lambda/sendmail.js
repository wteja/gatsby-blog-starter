exports.handler = (event, context, callback) => {
    try {
        const mailgunBaseUrl = "https://api.mailgun.net/v3";

        const apiKey = process.env.MAILGUIN_API_KEY;
        const domain = process.env.MAILGUIN_DOMAIN;
        const from = process.env.MAILGUIN_FROM;
        const to = process.env.MAILGUIN_TO;
        const reCaptchaSecret = process.env.RECAPTCHA_SECRET;

        if (!domain)
            throw new Error("MAILGUN_DOMAIN is empty.");

        if (!to)
            throw new Error("MAILGUIN_TO is empty.");

        if (!reCaptchaSecret)
            throw new Error("RECAPTCHA_SECRET is empty.");

        const { body } = event;
        const obj = JSON.parse(body);
        const { name, email, subject, message, recaptch } = obj;

        verifyReCAPTCHA(reCaptchaSecret, recaptch)
            .then(() => {
                const fromContact = `${name} <${email}>`;
                const mailSubject = `${subject} (from ${fromContact})`;
                sendmail(apiKey, mailgunBaseUrl, domain, from, to, mailSubject, message)
                    .then(() => {
                        callback(null, {
                            statusCode: 200,
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify({
                                message: "Your message has been sent."
                            })
                        });
                    })
                    .catch(err => callback(err));
            })
            .catch(err => callback(err));
    } catch (err) {
        callback(err);
    }
};

function sendmail(apiKey, baseUrl, domain, from, to, subject, text) {
    return new Promise((resolve, reject) => {
        fetch(baseUrl + `/${domain}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`api:${apiKey}`)}`
            },
            body: JSON.stringify({
                from,
                to,
                subject,
                text
            })
        })
            .then(() => resolve())
            .catch(err => reject(err));
    });
}

function verifyReCAPTCHA(secret, response) {
    return new Promise((resolve, reject) => {
        fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                secret,
                response
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    resolve();
                } else {
                    reject(new Error("Invalid ReCAPTCHA."));
                }
            })
            .catch(err => reject(err));
    });
}