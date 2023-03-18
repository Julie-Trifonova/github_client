import React, {useState} from "react";

import styles from "./ScrollButton.module.scss";

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    window.addEventListener("scroll", toggleVisible);

    return (
        <button
            onClick={scrollToTop}
            style={{display: visible ? "inline" : "none"}}
            className={styles.scroll_button}
        >
            <svg width="40px" height="40px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
                 aria-hidden="true" role="img"
                 preserveAspectRatio="xMidYMid meet">
                <circle cx="32" cy="32" r="30" fill="#F55"></circle>
                <path fill="#ffffff" d="M48 30.3L32 15L16 30.3h10.6V49h10.3V30.3z"></path>
            </svg>
        </button>
    );
};

export default ScrollButton;
