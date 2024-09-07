// api/sendVerificationCode.js
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
MAILGUN_API_KEY = "pubkey-c4038e9fa0b6bb61cace4af789c3e387"
const mg = mailgun.client({ username: 'api', key: MAILGUN_API_KEY });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;
        const code = Math.floor(100000 + Math.random() * 900000);

        const data = {
            from: 'sandboxaddfa9ababff48a5aae6cfa66897eadc.mailgun.org',
            to: email,
            subject: 'Your Verification Code',
            text: `Your verification code is ${code}`,
            html: `<h1>Your verification code is ${code}</h1>`
        };

        try {
            const response = await mg.messages.create('sandboxaddfa9ababff48a5aae6cfa66897eadc.mailgun.org', data);
            // Vous pouvez stocker le code dans une base de données ici
            // await database.saveVerificationCode(email, code);

            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
