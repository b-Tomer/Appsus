import { mailService } from '../services/mail.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
const { useEffect, useState } = React

export function MailCompose({
    onToggleCompose,
    onSaveDraft,
    replyTo,
    replySubject,
    replyBody,
}) {
    const [data, setData] = useState({ toUser: replyTo || '' })

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            toUser: replyTo || '',
            subject: replySubject || '',
            body: replyBody || '',
        }))
    }, [replyTo, replySubject, replyBody])

    const handleChange = (event) => {
        event.stopPropagation()
        const name = event.target.name
        const value = event.target.value
        setData((values) => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        mailService
            .send(data)
            .then(onToggleCompose())
            .then(() => {
                showSuccessMsg('Mail sent successfully')
            })
    }

    function discardMsg() {
        onToggleCompose()
        showSuccessMsg('Mail discarded successfully')
    }

    return (
        <section className="mail-compose">
            <form onSubmit={handleSubmit}>
                <div className="mail-compose-header">
                    <span>New message</span>
                    <img
                        onClick={() => {
                            onSaveDraft(data.toUser, data.subject, data.body)
                            onToggleCompose()
                        }}
                        src="./assets/icons/close.png"
                        alt=""
                    />
                </div>
                <div className="form-to">
                    <label htmlFor="to-user">To:</label>
                    <input
                        onChange={handleChange}
                        value={data.toUser || ''}
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
                        value={data.subject || ''}
                        name="subject"
                        type="text"
                        id="subject"
                        autoComplete="off"
                    />
                </div>
                <textarea
                    type="text"
                    name="body"
                    rows="18"
                    onChange={handleChange}
                    value={data.body || ''}
                />

                <div className="form-btns">
                    <button type="submit" className="form-send-btn">
                        Send
                    </button>
                    <button onClick={discardMsg} className="form-trash-btn">
                        <img src="./assets/icons/delete.png" alt="" />
                    </button>
                </div>
            </form>
        </section>
    )
}
