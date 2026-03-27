import '../styles/hireme.css';

const HireMe = () => {
    return (
        <div className="hireme-page">
            <div className="hireme-container">
                <h1>Hire Me</h1>

                <p className="tagline">
                    Not just building websites — I build experiences that speak.<br />
                    Every design has a purpose, every line of code has intent.<br />
                    <span>Curious mind. Clean code. Constant growth.</span>
                </p>

                {/* Hire Form */}
                <form action="mailto:lalithirve838@gmail.com" method="post" encType="text/plain">
                    <input type="text" name="Name" placeholder="Your Name" required />
                    <input type="email" name="Email" placeholder="Your Email" required />
                    <input type="text" name="Project" placeholder="Project / Hiring For" required />
                    <textarea name="Message" rows="5" placeholder="Tell me about your project" required></textarea>
                    <button type="submit">Hire Me</button>
                </form>

                {/* Contact Info */}
                <div className="contact-info">
                    Or reach me directly at{' '}
                    <a href="mailto:lalithirve838@gmail.com">lalithirve838@gmail.com</a>
                </div>

                {/* Social Icons */}
                <div className="icons">
                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                    <a href="mailto:lalithirve838@gmail.com"><i className="fa-solid fa-envelope"></i></a>
                </div>

                <footer className="hireme-footer">
                    &copy; 2026 Lalit Hirvey. Open to work & collaborations.
                </footer>
            </div>
        </div>
    );
};

export default HireMe;
