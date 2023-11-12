const Contact = () => (
  <div className="content">
    <section className="form">
      <h2>About the project</h2>
      <p>
        If you’d like to get in touch with us, feel free to send us an email via
        this form:
      </p>
      <form action="https://formspree.io/f/mleopndw" method="post">
        <label htmlFor="name">Your Name:</label>
        <input type="text" id="name" name="name" placeholder="First Last" />
        <label htmlFor="email">Your Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
        />
        <label htmlFor="message">Your Message:</label>
        <textarea
          id="message"
          name="message"
          placeholder="My mom loved it!"
        ></textarea>
        <input type="submit" value="Send" />
      </form>
    </section>
    <section>
      <h2>People working on the project</h2>
      <ul>
        <li>Grant Johnson</li>
        <li>Kylan Siwinski</li>
        <li>Meghshanth Sara</li>
        <li>Nolan Fallin</li>
        <li>Vladimir Ceban</li>
        <li>William Wang</li>
      </ul>
    </section>
  </div>
);

export default Contact;
