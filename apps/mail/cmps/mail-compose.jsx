export function MailCompose() {
    return (
        <section className="mail-compose">
            <form>
                <div className="mail-compose-header">
                    <span>New message</span>
                    <img src="../../../assets/icons/close.png" alt="" />
                </div>
                <div className="form-to">
                    <label htmlFor="to-user">To:</label>
                    <input
                        name="toUser"
                        type="text"
                        id="to-user"
                        autoComplete="off"
                    />
                </div>
                <div className="form-subject">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        name="subject"
                        type="text"
                        id="subject"
                        autoComplete="off"
                    />
                </div>
                <textarea name="body" rows="18" />
                <div className="form-btns">
                    <button type="submit" className="form-send-btn">
                        Send
                    </button>
                    <button className="form-trash-btn">
                        <img src="./assets/icons/delete.png" alt="" />
                    </button>
                </div>
            </form>
        </section>
    )
}
