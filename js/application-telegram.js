'use strict'

const TELEGRAM_BOT_TOKEN = '6371301802:AAHJQ_VrLdbgYHwmTz0rtvi9n3MXAuZaK98';
const TELEGRAM_CHAT_ID = '@TestAtMebelshik';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

async function sendEmailTelegram(event) {
	event.preventDefault();

	const form = event.target;
	const formBtn = document.querySelector('.form-calculation__btn');
	const formSendResult = document.querySelector('.form-calculation__send-result');
	formSendResult.textContent = '';

	const { name, phone } = Object.fromEntries(new FormData(form).entries())

	const text = `Заявка от клиента ${name}\nНомер телефона: ${phone}`


	try {
		formBtn.textContent = 'Loading...';
		const response = await fetch(API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				chat_id: TELEGRAM_CHAT_ID,
				text,
			})
		});

		if (response.ok) {
			// formSendResult.textContent = 'Спасибо за обращение! Мы свяжемся с вами в ближайшее время.';
			form.reset();
		} else {
			throw new Error(response.statusText);
		}

	} catch (error) {
		console.error(error);
		formSendResult.textContent = 'Заявка не отправлена! Попробуйте позже.';
		formSendResult.computedStyleMap.color = 'red';
	} finally {
		formBtn.textContent = 'Отправить';
	}


}