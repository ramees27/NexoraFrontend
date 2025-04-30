import React from 'react'
import { FaUserGraduate, FaCertificate, FaThumbsUp, FaUserTie, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import TopRatedSection from './TopRatedSection';
import ApplySection from './ApplySection';
import UserSaySection from './UserSaySection';
import QuestionSection from './QuestionSection';

const HomePage = () => {
    return (
        <>
            <section className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Guide Your Career Path <br className="hidden sm:block" />
                        With Expert Counselors
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-gray-200">
                        <strong>Nexora</strong> is a student-focused platform that connects you with verified career
                        counselors across various fields. Discover experts, view their profiles,
                        and book personalized sessions through chat or secure video calls.
                        Whether you’re choosing a stream, college, or career path, Nexora helps
                        you make confident, informed decisions.
                    </p>

                    {/* Stats */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                        {/* Card 1 */}
                        <div className="bg-white text-black p-6 rounded-xl shadow-lg transform transition-transform duration-300 shadow-xl flex flex-col items-center">
                            <FaUserGraduate className="text-3xl text-blue-700 mb-2" />
                            <h2 className="text-2xl font-bold">100+</h2>
                            <p className="text-center text-sm font-medium">Students Joined</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white text-black p-6 rounded-xl shadow-lg transform transition-transform duration-300 shadow-xl flex flex-col items-center">
                            <FaCertificate className="text-3xl text-blue-700 mb-2" />
                            <h2 className="text-2xl font-bold">10+</h2>
                            <p className="text-center text-sm font-medium">Certified Counselors</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white text-black p-6 rounded-xl shadow-lg transform transition-transform duration-300 shadow-xl flex flex-col items-center">
                            <FaThumbsUp className="text-3xl text-blue-700 mb-2" />
                            <h2 className="text-2xl font-bold">100%</h2>
                            <p className="text-center text-sm font-medium">Satisfaction Rate</p>
                        </div>
                    </div>


                </div>
                </section>
                <section className="py-12 bg-white">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        {/* Updated heading with #040B57 */}
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#040B57] mb-2">
                            How Nexora Works
                        </h2>
                        <p className="text-gray-600 mb-10">
                            We make it easy to connect with professional career counselors <br/> who can guide you through your career decisions.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="bg-gray-50 rounded-2xl p-6 shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition duration-300 transform">
                                <div className="text-indigo-600 text-4xl mb-4 mx-auto w-fit">
                                    <FaUserTie />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#040B57]">
                                    Find Your Counselor
                                </h3>
                                <p className="text-gray-600">
                                    Browse through our network of professional career counselors and find the perfect match for your needs.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-gray-50 rounded-2xl p-6 shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition duration-300 transform">
                                <div className="text-indigo-600 text-4xl mb-4 mx-auto w-fit">
                                    <FaCalendarAlt />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#040B57]">
                                    Book a Session
                                </h3>
                                <p className="text-gray-600">
                                    Schedule a session at a convenient time and get personalized guidance from your chosen counselor.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-gray-50 rounded-2xl p-6 shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition duration-300 transform">
                                <div className="text-indigo-600 text-4xl mb-4 mx-auto w-fit">
                                    <FaChartLine />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-[#040B57]">
                                    Advance Your Career
                                </h3>
                                <p className="text-gray-600">
                                    Apply the expert advice and insights to make informed decisions about your career path.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </section>
                <hr className="mx-auto  my-8 border-t-2 w-[1250px] " />


<TopRatedSection/>
<ApplySection/>
<UserSaySection/>
<QuestionSection/>
            </>

            )
}

            export default HomePage