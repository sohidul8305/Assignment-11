import React from 'react';
import HowItWorksSection from '../../components/How to Work/HowItWorksSection';
import Available from '../../components/Available/Available';
import CustomerFeedback from '../../Customereview/CustomerFeedback';
import WhyChooseUs from '../../components/Whyhoose/WhyChooseUs';
import OurPartners from '../../components/OurPartners/OurPartners';
import HeroBanner from '../../components/Banner/HeroBanner';

const Home = () => {
    return (
        <div>
   <HeroBanner></HeroBanner>
    <Available></Available>
    <HowItWorksSection></HowItWorksSection>
    <CustomerFeedback></CustomerFeedback>
    <WhyChooseUs></WhyChooseUs>
    <OurPartners></OurPartners>
        </div>
    );
};

export default Home;