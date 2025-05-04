import React from "react";

const faqs = [
  {
    question: "What qualifications do I need to become a counselor?",
    answer:
      "While requirements may vary, typically you should have relevant education in psychology, career counseling, or a related field, along with practical experience. Professional certifications are highly valued.",
  },
  {
    question: "How long does the application review process take?",
    answer:
      "We typically review applications within 5–6 business days. Once approved, you can set up your schedule and start accepting session requests.",
  },
  {
    question: "How are payments processed?",
    answer:
      "Payments are processed through our secure platform. After completing sessions, your earnings are added to your balance, which you can withdraw to your bank account.",
  },
  {
    question: "What happens when a student books a session?",
    answer:
      "You’ll receive a notification. You can accept the requested time or suggest a new time. The student will confirm and complete the payment accordingly.",
  },
];

const FAQSection = () => {
  return (
    <section className="bg-[#f5f7fa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1a237e] mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
          Find answers to common questions about our platform and services.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
            >
              <h3 className="text-sm sm:text-base font-semibold text-[#1a237e] mb-1">
                {faq.question}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
