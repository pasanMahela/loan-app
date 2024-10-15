import React from "react";
import { motion } from "framer-motion";
import { FaUserGraduate, FaPassport, FaHandHoldingUsd, FaGraduationCap, FaSmile } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import banner from "../Images/aboutus.jpg"; // Import your banner image
import mission from "../Images/mission.png"; // Import image
import about from "../Images/about.jpg"; // Import image
import PageTitle from "../Components/PageTitle"; // Import your PageTitle component
import SuccessStatus from "./SuccessStatus";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the animation of each card
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function AboutUs() {
  return (
    <div className="bg-blue-50 min-h-screen p-6">
      {/* Title Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle title="About Us" />
      </motion.div>

      {/* Services Banner Section */}
      <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Text Content */}
        <div className="absolute left-10 top-1/2 transform -translate-y-1/2 flex flex-col">
          <h1 className="text-white text-4xl font-bold">Global Reach Sri Lanka</h1>
          <div className="w-12 h-1 bg-red-600 mt-4"></div>
        </div>
      </div>

      {/* Section 4: All About Global Reach */}
      <motion.section
        className="bg-white py-10 px-4 shadow-lg rounded-lg max-w-full mx-auto my-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="text-3xl font-bold text-blue-500 text-center mb-8">All about Global Reach</h2>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          {/* Text Section */}
          <motion.div
            className="lg:w-1/2 p-6 text-left"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <p className="text-gray-800 text-lg mb-4">
              The one name that has become synonymous with overseas education is Global Reach. 
              It’s been more than 33 years since we have been in the industry, and we take pride in 
              calling ourselves "the top overseas educational consultancy" because of our dedication, 
              commitment, and hard work. We represent 500+ universities worldwide, and through us, 
              50000+ students have enrolled in premium and reputed overseas educational institutions 
              to pursue higher education. With sheer pleasure, we are helping students from 6 countries 
              to turn their study abroad dream into reality, and this has made us expand into 40 offices 
              across Australia, India, Sri Lanka, Nepal, Bhutan, and Bangladesh.
            </p>
          </motion.div>
          {/* Image Section */}
          <motion.div
            className="lg:w-1/2 p-6 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={about}
              alt="Global Reach"
              className="rounded-lg shadow-md w-full object-cover"
            />
          </motion.div>
        </div>
      </motion.section>
      
      {/* Section 2: Mission */}
      <motion.section
        className="relative max-w-full my-6 px-6 py-10 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-lg shadow-xl"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* Background graphic for added interest */}
        <div className="absolute inset-0 bg-pattern opacity-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div>
            <h2 className="text-4xl font-extrabold text-blue-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              "To remain the market leader through consistent delivery of quality, ethical, and professionally sound service to our clients (students, education partners, and government agencies). Global Reach will continue setting challenging standards leading to an overall development in the industry."
            </p>
          </div>

          {/* Image Section */}
          <motion.div
            className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-8 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <img src={mission} alt="Mission" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </motion.section>

      {/* Section 3: Why Choose Us */}
      <motion.section
        className="bg-white py-10 px-4 shadow-lg rounded-lg max-w-full mx-auto"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold text-blue-500 text-center mb-8">Why Choose Us?</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div variants={fadeIn} className="p-6 text-center bg-white rounded-lg shadow-md">
            <FaUserGraduate className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Experience</h3>
            <p className="text-gray-600">Over 33 years of guiding students to the best universities worldwide.</p>
          </motion.div>
          <motion.div variants={fadeIn} className="p-6 text-center bg-white rounded-lg shadow-md">
            <FaGraduationCap className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Certified Counselors</h3>
            <p className="text-gray-600">Highest number of certified education counselors.</p>
          </motion.div>
          <motion.div variants={fadeIn} className="p-6 text-center bg-white rounded-lg shadow-md">
            <FaPassport className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Visa Success</h3>
            <p className="text-gray-600">Near 100% success rate in obtaining student visas.</p>
          </motion.div>
          <motion.div variants={fadeIn} className="p-6 text-center bg-white rounded-lg shadow-md">
            <FaHandHoldingUsd className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Scholarships</h3>
            <p className="text-gray-600">Helping you secure scholarships for your studies.</p>
          </motion.div>
          <motion.div variants={fadeIn} className="p-6 text-center bg-white rounded-lg shadow-md">
            <MdWork className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Loan Assistance</h3>
            <p className="text-gray-600">Hassle-free education loan assistance with our partners.</p>
          </motion.div>
          <motion.div variants={fadeIn} className="p-6 text-center bg-white rounded-lg shadow-md">
            <FaSmile className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Friendly Staff</h3>
            <p className="text-gray-600">Our staff is dedicated to providing personalized, friendly service.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      <SuccessStatus />
    </div>
  );
}

export default AboutUs;
