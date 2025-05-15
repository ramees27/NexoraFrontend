import React from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import FAQSection from './FAQSection';
import Footer from '../../Footer/Footer';
import { usePost } from '../../../api/authapi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CouncelorApplicationForm = () => {
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        fullName: Yup.string()
            .trim()
            .required("Full Name is required")
            .min(3, "Name must be at least 3 characters"),

        phone: Yup.string()
            .trim()
            .required("Phone Number is required")
            .min(10, "Phone must be at least 10 digits"),

        rate: Yup.number()
            .typeError("Hourly rate must be a number")
            .positive("Rate must be positive")
            .required("Hourly rate is required"),

        experience: Yup.number()
            .typeError("Experience must be a number")
            .min(0, "Experience must be a non-negative number")
            .required("Experience is required"),

        bio: Yup.string()
            .required("Professional Bio is required")
            .test("word-count", function (value) {
                if (!value) return false;
                return value.trim().split(/\s+/).length >= 3;
            }),

        specializations: Yup.string()
            .required("Specializations are required")
            .test(
                "max-three",
                "You can specify a maximum of 3 specializations",
                function (value) {
                    if (!value) return false;
                    const items = value.split(",").map((item) => item.trim()).filter(Boolean);
                    return items.length > 0 && items.length <= 3;
                }
            ),

        upi: Yup.string()
            .trim()
            .required("UPI ID is required"),

        education: Yup.array().of(
            Yup.object({
                degree: Yup.string().required("Education is required"),
                certificate: Yup.mixed().required("Certificate is required"),
            })
        ),
    });


    const initialValues = {
        fullName: "",
        phone: "",
        rate: "",
        experience: "",
        bio: "",
        specializations: "",
        upi: "",
        education: [{ degree: "", certificate: null }],
    };

    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append("full_name", values.fullName);
            formData.append("specialization", values.specializations);
            formData.append("short_bio", values.bio);
            formData.append("mobile_number", values.phone);
            formData.append("experience", values.experience);
            formData.append("hourly_rate", values.rate);
            formData.append("upi_id", values.upi);

            // Optional: If you add a profile image input
            // formData.append("ProfileImage", values.profileImage);

            const response = await usePost("/CouncelorAuth/Apply-Councelor", formData);

            // Now handle education uploads
            for (const edu of values.education) {
                const eduForm = new FormData();
                eduForm.append("CounselorId", response.data);
                eduForm.append("Qualification", edu.degree);
                eduForm.append("CertificateImage", edu.certificate);

                await usePost("/Councelor/add", eduForm);
            }

            console.log("Success", response.data);
            toast.success("Your application was submitted successfully")
            navigate("/")
        } catch (error) {
            console.log("Error", error);
        }
    };
    const inputClass =
        "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent transition";
    return (
        <>
            <div className="bg-[#f6f8fa] py-10 px-4 sm:px-8">
                <div className="bg-gradient-to-r from-[#1a237e] to-[#3949ab] py-12 px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                        Become a Career Counselor
                    </h1>
                    <p className="text-white text-sm sm:text-base mt-2 max-w-2xl mx-auto">
                        Share your expertise, guide the next generation, and earn while making a
                        difference in students' lives.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-blue-200">
                    <h2 className="text-2xl font-semibold text-center text-[#1a237e]">Information</h2>
                    <p className="text-sm text-center text-gray-600 mb-6">Tell us about yourself and your counseling services</p>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Field name="fullName" placeholder="Full Name*" className={inputClass} />
                                        <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <Field name="phone" placeholder="Phone Number*" className={inputClass} />
                                        <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <Field name="rate" placeholder="$ Your hourly rate" className={inputClass} />
                                        <ErrorMessage name="rate" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <Field name="experience" placeholder="Years of Experience" className={inputClass} />
                                        <ErrorMessage name="experience" component="div" className="text-red-500 text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <Field as="textarea" name="bio" placeholder="Professional Bio....ex:- Dr. Anjali Menon is a certified career counselor with over 8 years of experience guiding students and professionals toward meaningful career paths. She specializes in academic planning, competitive exam guidance, and career transitions. Known for her empathetic approach and personalized strategies, Dr. Menon has helped 1000+ individuals gain clarity and confidence in their career choices. She combines psychometric assessments with real-world insights to deliver impactful counseling sessions.*" className={`${inputClass} h-24`} />
                                    <ErrorMessage name="bio" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <Field name="specializations" placeholder="Specializations (e.g. Data Science, Finance)" className={inputClass} />
                                    <ErrorMessage name="specializations" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <Field name="upi" placeholder="UPI ID (e.g. your@upi)" className={inputClass} />
                                    <ErrorMessage name="upi" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="border-b border-gray-300 my-4"></div>

                                <FieldArray name="education">
                                    {({ push, remove }) => (
                                        <>
                                            {values.education.map((_, index) => (
                                                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start mb-4">
                                                    <div>
                                                        <Field
                                                            name={`education[${index}].degree`}
                                                            placeholder="Degree (e.g., B.Sc. Psychology)"
                                                            className={inputClass}
                                                        />
                                                        <ErrorMessage
                                                            name={`education[${index}].degree`}
                                                            component="div"
                                                            className="text-red-500 text-sm"
                                                        />
                                                    </div>

                                                    <div>
                                                        <input
                                                            type="file"
                                                            className={inputClass}
                                                            onChange={(event) =>
                                                                setFieldValue(`education[${index}].certificate`, event.currentTarget.files[0])
                                                            }
                                                        />
                                                        <ErrorMessage
                                                            name={`education[${index}].certificate`}
                                                            component="div"
                                                            className="text-red-500 text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => push({ degree: "", certificate: null })}
                                                className="bg-[#6a1b9a] text-white px-4 py-2 rounded text-sm hover:bg-[#5e178a] transition"
                                            >
                                                + Add Education
                                            </button>
                                        </>
                                    )}
                                </FieldArray>

                                <button
                                    type="submit"
                                    className="w-full bg-[#1a237e] text-white text-lg font-semibold py-3 mt-6 rounded hover:bg-[#1a237e]/90 transition"
                                >
                                    Submit Application
                                </button>

                                <p className="text-xs text-center text-gray-600 mt-4">
                                    By clicking "Submit Application", you agree to our{" "}
                                    <a href="#" className="underline text-blue-700">Terms of Service</a> and{" "}
                                    <a href="#" className="underline text-blue-700">Privacy Policy</a>.
                                </p>
                            </Form>
                        )}
                    </Formik>
                    
                </div>
                <p className="text-sm text-center text-gray-600 mt-2">
                        After you submit, our team will review your application. Once verified, you’ll receive a notification. <br/> You can then login as a counselor from the <strong>My Details</strong> section. We’ll reach out to you soon.
                    </p>

            </div>
            <FAQSection />
            <Footer />
        </>

    )

}


export default CouncelorApplicationForm