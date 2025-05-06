import styles from '../styles/Login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Logo</div>
        <nav className={styles.nav}>
          <a href="#">Job Listingss</a>
          <a href="#">My Profile</a>
          <a href="#">Resources</a>
        </nav>
        <button className={styles.signupBtn}>Sign Up</button>
      </header>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Log In</h1>
          <p className={styles.subtitle}>Lorem ipsum dolor sit amet adipiscing elit.</p>
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <button className={styles.loginBtn}>Log in</button>

          <div className={styles.socialLogins}>
            <button>Log in with Google</button>
            <button>Log in with Facebook</button>
            <button>Log in with Apple</button>
          </div>

          <div className={styles.footerLinks}>
            <a href="#">Forgot your password?</a>
            <p>Don’t have an account? <a href="#">Sign up</a></p>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.placeholder}>Image</div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div>
            <div className={styles.logo}>Logo</div>
            <p>Subscribe to our newsletter...</p>
            <div className={styles.newsletter}>
              <input type="email" placeholder="Your email here" />
              <button>Join</button>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Blog Posts</li>
              <li>Help Center</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li>User Guide</li>
              <li>FAQs</li>
              <li>Feedback</li>
              <li>Support</li>
              <li>Community</li>
            </ul>
          </div>
          <div>
            <h4>Connect With Us</h4>
            <ul>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>X</li>
              <li>LinkedIn</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2025 Relume. All rights reserved. | Privacy Policy | Terms of Service | Cookie Settings</p>
        </div>
      </footer>
    </div>
  );
}
