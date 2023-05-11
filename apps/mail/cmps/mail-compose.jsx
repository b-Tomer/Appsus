import { mailService } from '../services/mail.service.js'
const { useEffect, useState } = React

export function MailCompose({ onToggleCompose }) {
    const [inputs, setInputs] = useState({})

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs((values) => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        mailService.send(inputs)
        onToggleCompose()
    }

    return (
        <section className="mail-compose">
            <form onSubmit={handleSubmit}>
                <div className="mail-compose-header">
                    <span>New message</span>
                    <img src="./assets/icons/close.png" alt="" />
                </div>
                <div className="form-to">
                    <label htmlFor="to-user">To:</label>
                    <input
                        onChange={handleChange}
                        value={inputs.toUser || ''}
                        name="toUser"
                        type="text"
                        id="to-user"
                        autoComplete="off"
                    />
                </div>
                <div className="form-subject">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        onChange={handleChange}
                        value={inputs.subject || ''}
                        name="subject"
                        type="text"
                        id="subject"
                        autoComplete="off"
                    />
                </div>
                <textarea
                    name="body"
                    rows="18"
                    onChange={handleChange}
                    value={inputs.body || ''}
                />
                <div className="form-btns">
                    <button type="submit" className="form-send-btn">
                        Send
                    </button>
                    <button
                        onClick={onToggleCompose}
                        className="form-trash-btn"
                    >
                        <img src="./assets/icons/delete.png" alt="" />
                    </button>
                </div>
            </form>
        </section>
    )
}
