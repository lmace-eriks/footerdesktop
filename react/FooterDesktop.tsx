import React, { ReactChildren, useEffect, useRef, useState } from "react";
import { Link, canUseDOM } from "vtex.render-runtime";
import { createPortal } from "react-dom";

const phoneIcon = require("./icons/phone.svg") as string;
const textIcon = require("./icons/text.svg") as string;
const emailIcon = require("./icons/email.svg") as string;
const chatIcon = require("./icons/chat.svg") as string;
const brainTrustIcon = require("./icons/brain-trust.svg") as string;
const locationIcon = require("./icons/location.svg") as string;
const facebookIcon = require("./icons/facebook.svg") as string;
const instagramIcon = require("./icons/instagram.svg") as string;
const linkedinIcon = require("./icons/linkedin.svg") as string;
const youtubeIcon = require("./icons/youtube.svg") as string;

// Styles
import styles from "./styles.css";

interface FooterDesktopProps {
  children: ReactChildren | any
}

const FooterDesktop: StorefrontFunctionComponent<FooterDesktopProps> = ({ children }) => {
  const openGate = useRef(true);
  const modalRef = useRef<any>();
  const [currentYear, setCurrentYear] = useState<number>();

  useEffect(() => {
    if (!openGate.current) return;
    openGate.current = false;

    copyrightYear();
  });

  const copyrightYear = () => {
    const rightNow = new Date(Date.now());
    const thisYear = rightNow.getFullYear();

    setCurrentYear(thisYear);
  }

  // This is hacky, but the "Chat" component is third party
  // and this is a best case for the moment solution - LM
  const handleLiveChatClick = () => {
    if (!canUseDOM) return;

    const chatBubble: any = document.querySelector("#cloudlink-chat-overlay-contact-us-button");
    chatBubble?.classList.add(styles.wave);

    // setTimeout(() => { modalRef.current.showModal() }, 250);
    modalRef.current.showModal();
    setTimeout(() => { chatBubble?.classList.remove(styles.wave) }, 500);
  }

  const handleCloseModal = () => {
    modalRef.current.close();
  }

  const handleClickBackground = (e: any) => {
    const clickX = e.clientX;
    const clickY = e.clientY;
    const modalBounds = modalRef.current.getBoundingClientRect();

    if (clickX < modalBounds.left || clickX > modalBounds.right || clickY < modalBounds.top || clickY > modalBounds.bottom) {
      modalRef.current.close();
    }
  }

  const Modal = () => (
    <dialog ref={modalRef} className={styles.modalContainer} onClick={handleClickBackground} >
      <div className={styles.modalText}>
        Please use the Chat Bubble in the lower right corner of your screen.
      </div>
      <button aria-label="Close Dialog." onClick={handleCloseModal} className={styles.modalCloseButton} >Close</button>
    </dialog>
  );

  const NewsletterSignup = () => (
    <>{children[0]}</>
  );

  const ShoppingToolsMenu = () => (
    <>{children[1]}</>
  );

  const ServiceMenu = () => (
    <>{children[2]}</>
  );

  const EriksMenu = () => (
    <>{children[3]}</>
  );

  const HelpMenu = () => (
    <>{children[4]}</>
  );

  return (
    <footer className={styles.container}>
      <div className={`${styles.contactRow} ${styles.footerRow}`}>
        <div className={styles.contactItem}>
          <img src={phoneIcon} width={75} height={50} className={styles.icon} />
          <div className={styles.contactText}>Call Us<br></br>952-351-9148</div>
        </div>
        <div className={styles.contactItem}>
          <img src={textIcon} width={75} height={50} className={styles.icon} />
          <div className={styles.contactText}>Text Us<br></br>952-243-5476</div>
        </div>
        <div className={styles.contactItem}>
          <a href="mailto:help@eriksbikeshop.com" className={styles.contactLink}>
            <img src={emailIcon} width={75} height={50} className={styles.icon} />
            <div className={styles.contactText}>Email Us<br></br>help@eriksbikeshop.com</div>
          </a>
        </div>
        <div className={styles.contactItem}>
          <button onClick={handleLiveChatClick} className={styles.chatButton}>
            <img src={chatIcon} width={75} height={50} className={styles.icon} />
            <div className={styles.contactText}>Live Chat</div>
          </button>
        </div>
      </div>
      <div className={`${styles.connectRow} ${styles.footerRow}`}>
        <div className={styles.connectItem}>
          <div className={styles.itemTitle}>Help Center</div>
          <div className={styles.itemDescription}>Let our Experts answer all your questions.</div>
          <div className={styles.itemRow}>
            <img src={brainTrustIcon} width={75} height={50} className={styles.icon} />
            <div className={styles.iconLabel}>Brain Trust</div>
          </div>
        </div>
        <div className={styles.connectItem}>
          <div className={styles.itemTitle}>Store Locator</div>
          <div className={styles.itemDescription}>Grab your gear today.</div>
          <Link href="/stores" className={styles.storeLink}>
            <img src={locationIcon} width={50} height={50} className={styles.icon} />
            <div className={styles.buttonLabel}>Find a Store</div>
          </Link>
        </div>
        <div className={styles.connectItem}>
          <div className={styles.itemTitle}>Connect Socially</div>
          <div className={styles.itemDescription}>See what we're up to.</div>
          <div className={styles.itemRow}>
            <Link href="https://www.facebook.com/eriksbikeshop/" rel="noreferrer" target="_blank" alt="Facebook Icon." className={styles.socialLink}>
              <img src={facebookIcon} width={50} height={50} className={styles.icon} />
            </Link>
            <Link href="https://www.instagram.com/eriksbikeboardski/" rel="noreferrer" target="_blank" alt="Instagram Icon." className={styles.socialLink}>
              <img src={instagramIcon} width={50} height={50} className={styles.icon} />
            </Link>
            <Link href="https://www.linkedin.com/company/erik's-bike-shops/" rel="noreferrer" target="_blank" alt="LinkedIn Icon." className={styles.socialLink}>
              <img src={linkedinIcon} width={50} height={50} className={styles.icon} />
            </Link>
            <Link href="https://www.youtube.com/@EriksBikeandBoardShop" rel="noreferrer" target="_blank" alt="Youtube Icon." className={styles.socialLink}>
              <img src={youtubeIcon} width={50} height={50} className={styles.icon} />
            </Link>
          </div>
        </div>
        <div className={styles.connectItem}>
          <div className={styles.itemTitle}>Email Sign Up</div>
          <NewsletterSignup />
        </div>
      </div>
      <div className={`${styles.linksRow} ${styles.footerRow}`}>
        <div className={styles.linkGroupItem}>
          <div className={styles.itemTitle}>Shopping Tools</div>
          <ShoppingToolsMenu />
        </div>
        <div className={styles.linkGroupItem}>
          <div className={styles.itemTitle}>Service</div>
          <ServiceMenu />
        </div>
        <div className={styles.linkGroupItem}>
          <div className={styles.itemTitle}>ERIK'S</div>
          <EriksMenu />
        </div>
        <div className={styles.linkGroupItem}>
          <div className={styles.itemTitle}>Help</div>
          <HelpMenu />
        </div>
      </div>
      <div className={`${styles.copyrightRow} ${styles.footerRow}`}>
        <div className={styles.copyrightText}>© {currentYear} ERIK'S Bike Shop Inc. All Rights Reserved. | <Link href="/privacy" className={styles.copyrightLink}>Privacy Policy</Link></div>
      </div>
      {createPortal(<Modal />, document.body)}
    </footer>
  );
};

FooterDesktop.schema = {
  title: "FooterDesktop",
  description: "",
  type: "object",
  properties: {

  }
};

export default FooterDesktop;
