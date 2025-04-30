import React from 'react'

const QuestionSection = () => {
    const faqs = [
        {
          question: "How do I choose the right counselor for me?",
          answer:
            "You can browse counselor profiles, read reviews from other students, and filter by specialization to find a counselor who matches your needs. Each counselor has detailed information about their expertise and experience.",
        },
        {
          question: "How much does a counseling session cost?",
          answer:
            "Counseling sessions vary in cost depending on the counselor’s experience and specialization. Each counselor sets their own rates, which are clearly displayed on their profile. You can filter counselors based on your budget.",
        },
        {
          question: "How do I schedule a session?",
          answer:
            "Once you’ve found a counselor you’d like to work with, you can book a session directly through their profile page by selecting an available date and time. After payment confirmation, your session will be scheduled.",
        },
        {
          question: "Can I cancel or reschedule my booked session?",
          answer:
            "Yes, you can cancel or reschedule your session up to 24 hours before the scheduled time without any penalty. Cancellations made less than 24 hours in advance may be subject to the counselor’s cancellation policy.",
        },
       
      ];
  return (
    <section className="bg-[#F0FAFF] py-16 px-4">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-[#040B57] mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-[#4B4F58] max-w-2xl mx-auto">
          Find answers to common questions about our platform and services.
        </p>
      </div>

      <div className="space-y-4 max-w-5xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-[#D1D5DB] rounded-lg p-5 text-left"
          >
            <h4 className="font-semibold text-[#040B57] text-md mb-1">
              {faq.question}
            </h4>
            <p className="text-gray-600 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default QuestionSection