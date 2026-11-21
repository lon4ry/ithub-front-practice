import instagramIcon from '../../assets/instagram.svg';
import whatsappIcon from '../../assets/whatsapp.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <h2 className={styles.title}>Contact</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.label}>Phone</span>
            <a className={styles.value} href="tel:+74993506604">
              +7 (499) 350-66-04
            </a>
          </div>
          <div className={styles.card}>
            <span className={styles.label}>Socials</span>
            <div className={styles.socials}>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <img src={instagramIcon} alt="" />
              </a>
              <a href="https://wa.me/74993506604" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <img src={whatsappIcon} alt="" />
              </a>
            </div>
          </div>
          <div className={styles.card}>
            <span className={styles.label}>Address</span>
            <p className={styles.value}>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</p>
          </div>
          <div className={styles.card}>
            <span className={styles.label}>Working Hours</span>
            <p className={styles.value}>24 hours a day</p>
          </div>
        </div>
        <div className={styles.map}>
          <iframe
            title="Garden shop location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=37.6600%2C55.7020%2C37.7060%2C55.7210&layer=mapnik&marker=55.7115%2C37.6820"
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
