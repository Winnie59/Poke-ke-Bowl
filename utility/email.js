import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = class Email {
    constructor(userEmail, userName, order) {
        this.to = userEmail
        this.user = userName
        this.orderId = order._id
        this.createdAt = order.createdAt
        this.orderTotal = order.total
        this.fromEmail = process.env.NEXT_PUBLIC_EMAIL
        this.fromName = 'Poke-ke Bowl'
    }

    async sendMagicLink() {
        const mailOptions = {
            to: this.to,
            from: {
                email: this.fromEmail,
                name: this.fromName
            },
            templatedId: process.env.NEXT_PUBLIC_TEMPLATE_ID,
            dynamic_template_data: {
                user: this.user,
                orderId: this.orderId,
                createdAt: this.createdAt,
                orderTotal: this.orderTotal
            }
        }

        await sgMail.send(mailOptions).then(()=> {}, console.error)
    }
}