import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import './styles.css';
import Footer from '../../components/Footer';

function ContactPage() {
    const [value, setValue] = useState('');
    const options = useMemo(() => countryList().getData(), []);
    const changeHandler = value => {
        setValue(value);
    };

    return (
        <>



            <div className='container'>
                <h3 className="header">Contact Form</h3>
                <form >
                    <label for="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" placeholder='Your name...' />
                    <br />
                    <label form='lastName'>Last Name</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Your last name..." />
                    <br />
                    <label form='contactEmail'>E-mail</label>
                    <input type="text" id="contactEmail" name="contactEmail" placeholder="Your e-mail adress..." />
                    <br />

                    <label for="country">Country</label>
                    <Select options={ options } value={ value } onChange={ changeHandler } placeholder={ <div className="selectPlc">Select...</div> } />
                    <br />

                    <label for="subject">Subject</label>
                    <br />
                    <textarea id="subject" name="subject" placeholder='Write something...' ></textarea>
                    <input type="submit" value="submit" />
                </form>
            </div>

            <div className='contactInfo'>
                <h3 className='header'>Address</h3>
                <p>P. Sherman 42 Wallaby Way</p>
                <p>Sydney NSW 2000</p>
                <p>Australia</p>
                <p>111-222-333</p>
            </div>
            <Footer />
        </>
    );
}

export default ContactPage;