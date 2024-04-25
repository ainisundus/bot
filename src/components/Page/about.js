import React from 'react';
import '../Style/aboutus.css';
import maldives from '../../assets/pexels.jpg';

function AboutUs() {
  return (
    <div className='about_us'>
      <div className='foto'>
        <img src={maldives} alt="gambar" className="gambar" />
      </div>
      <div className='paragraf'>
        <h2>Background</h2>
        <p>We noticed a gap in the Indonesian market where tourists lack access to personalized travel plans based on their budget and preferences for attractions. </p> 
        <p>While apps like "Traveloka" and "Agoda" exist, there's a scarcity of platforms offering tailored trip advice. Unlike the US market with platforms like "TripAdvisor," our goal is to develop an app or a website to fill this void.</p> 
        <h2>Meet Our Team</h2>
        <h3>Machine Learning</h3>
        <p>John Harry .T</p>
        <p>Poppy Dalama .Z</p>
        <p>Annisa Salsabila</p>
        <h3>Clouud Computing</h3>
        <p>Muhammad Hanif Ardhiansyah</p>
        <p>Hurina Aini Sundus</p>
        <h3>Mobile Development</h3>
        <p>Inu Rengga .E</p>
      </div>
    </div>
  );
}

export default AboutUs;
