exports.handler = (event, context, callback) => {
    try {
        const apiKey = process.env.MAILGUIN_API_KEY;
        const domain = process.env.MAILGUIN_DOMAIN;
        const to = process.env.MAILGUIN_TO;

        if(!domain)
            throw new Error("MAILGUN_DOMAIN is empty.");

        if(!to)
            throw new Error("MAILGUIN_TO is empty.");

        const baseUrl = "https://api.mailgun.net/v3";
        const { body }  = event;
        const obj = JSON.parse(body);
        const { name, email, subject, message } = obj;
        const from = `${name} <${email}>`;

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
                text: message
            })
        })
        .then(response => response.json())
        .then(data => console.log(data));

        callback(null, {
            statusCode: 200,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                message: "Your message has been sent."
            })
        });
    } catch(err) {
        callback(err);
    }
};