const { sendEmail } = require('./sendBlogEmails')
const path = require('path')
const fs = require('fs')
const { convert } = require('html-to-text');

exports.sendEmailBlocked = user => {
	const filePath = path.join(__dirname, '/../views/email/alert.html')
	let mailTemplate = fs.readFileSync(filePath, { encoding: 'utf-8' })
		.replace('[user_name]', user.nome)
		.replace('[link_getcode]', 'http://127.0.0.1:3000/blog/admin/get_code')
	const text = convert(mailTemplate, { wordwrap: 130 }).replace(/(\[.*?\])/g, '');

	const mailBody = {
		to: user.email,
		from: process.env.MAIL,
		replyTo: 'Não responder',
		subject: 'Sua conta foi bloqueada!',
		text: text,
		html: mailTemplate
	}
	
	sendEmail(mailBody)
}

exports.sendEmailToken = (user, token) => {
	const filePath = path.join(__dirname, '/../views/email/token.html')
	let mailTemplate = fs.readFileSync(filePath, { encoding: 'utf-8' })
		.replace('[user_name]', user.nome)
		.replace('[new_code]', token)
		.replace('[link_newpass]', `http://127.0.0.1:3000/blog/admin/change_pass?uid=${user._id}`)
		.replace('[link_getcode]', 'http://127.0.0.1:3000/blog/admin/get_code')
	const text = convert(mailTemplate, { wordwrap: 130 }).replace(/(\[.*?\])/g, '');

	const mailBody = {
		to: user.email,
		from: process.env.MAIL,
		replyTo: 'Não responder',
		subject: 'Seu código para mudança de senha',
		text: text,
		html: mailTemplate
	}
	
	sendEmail(mailBody)
}

exports.sendEmailPassChanged = user => {
	const filePath = path.join(__dirname, '/../views/email/passchanged.html')
	let mailTemplate = fs.readFileSync(filePath, { encoding: 'utf-8' })
		.replace('[user_name]', user.nome)
		.replace('[link_login]', 'http://127.0.0.1:3000/blog/admin/login')
	const text = convert(mailTemplate, { wordwrap: 130 }).replace(/(\[.*?\])/g, '');

	const mailBody = {
		to: user.email,
		from: process.env.MAIL,
		replyTo: 'Não responder',
		subject: 'Sua senha foi alterada.',
		text: text,
		html: mailTemplate
	}
	
	sendEmail(mailBody)
}
