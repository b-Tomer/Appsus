import { mailService } from '../services/mail.service.js'
const { useState, useEffect } = React

export function MailFilter() {
    return (
        <section className="mail-filter">
            <form>
                <input type="text" list="mailFilters" id="mailFilterInput" />
                <datalist id="mailFilters">
                    <option value="All mails" />
                    <option value="Read" />
                    <option value="Unread" />
                </datalist>
            </form>
        </section>
    )
}
