import React from 'react';
import Link from 'react-router-dom';
import { SocialIcon } from "react-social-icons";
import './styles.css';

function Footer() {
    return (
        <div className="footer">
            <div className='categories'>
                <h4>Categories</h4>
                <p>Laptops & Computers</p>
                <p>Cameras & Photography</p>
                <p>Smart Phones & Tablets</p>
                <p>Video Games & Consoles</p>
                <p>Waterproof Headphones</p>
            </div >
            <div className='account'>
                <h4>My Account</h4>
                <p>My Account</p>
                <p>Discount</p>
                <p>Returns</p>
                <p>Orders History</p>
                <p>Order Tracking</p>
            </div>
            <div className='socials'>
                <h4>Follow us</h4>
                <SocialIcon url="https://facebook.com" bgColor="#ffffff" style={ { maxHeight: 25, width: 25 } } />
                <SocialIcon url="https://instagram.com" bgColor="#ffffff" style={ { maxHeight: 25, width: 25 } } />
                <SocialIcon url="https://twitter.com" bgColor="#ffffff" style={ { maxHeight: 25, width: 25 } } />
            </div>
        </div>
    );
}

export default Footer;