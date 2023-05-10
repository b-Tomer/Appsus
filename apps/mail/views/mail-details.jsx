import { mailService } from '../services/mail.service.js'

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService
            .get(params.mailId)
            .then(setMail)
            .catch((err) => {
                console.log(err)
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/book')
    }

    if (!mail) return <div>Loading...</div>
    return (
        <section className="email-deatils">
            <div className="email-details-tools"></div>
            <div className="email-details-content">
                <p>Subject: {mail.subject}</p>
                <p>From: {mail.from}</p>
                <p>{mail.body}</p>
            </div>
        </section>
    )
}
