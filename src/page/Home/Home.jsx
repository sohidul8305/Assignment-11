import React from 'react';
import Banner from '../../components/Banner/Banner';
import HowItWorksSection from '../../components/How to Work/HowItWorksSection';
import Available from '../../components/Available/Available';
import CustomerFeedback from '../../Customereview/CustomerFeedback';
import WhyChooseUs from '../../components/Whyhoose/WhyChooseUs';
import OurPartners from '../../components/OurPartners/OurPartners';

const Home = () => {
    return (
        <div>
    <Banner></Banner>
    <Available></Available>
    <HowItWorksSection></HowItWorksSection>
    <CustomerFeedback></CustomerFeedback>
    <WhyChooseUs></WhyChooseUs>
    <OurPartners></OurPartners>
        </div>
    );
};

export default Home;