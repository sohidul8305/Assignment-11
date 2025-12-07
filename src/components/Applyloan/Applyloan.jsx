import React from 'react';
import { useForm } from 'react-hook-form';

const Applyloan = () => {
    // React Hook Form-এর প্রধান হুক
    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors } 
    } = useForm();

    // ফর্ম জমা দেওয়ার ফাংশন
    const onSubmit = (data) => {
        // Data contains: imageURL, title, maxLimit, shortDesc
        console.log("New Loan Product Data:", data);
        alert(`নতুন লোন প্রোডাক্ট "${data.title}" সেভ করা হয়েছে।`);
        
        // ফর্ম রিসেট
        reset(); 
    };

    // Tailwind CSS ক্লাস
    const inputClass = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150";
    const errorClass = "text-red-600 text-sm mt-1 font-semibold";

    return (
        <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-xl my-10 border-t-4 border-green-600">
            <h2 className="text-3xl font-extrabold text-center text-green-700 mb-2">
                ঋণ প্রোডাক্ট যোগ করুন (Apply Loan Data)
            </h2>
            <p className="text-center text-gray-500 mb-8 text-sm">
                কার্ডে প্রদর্শনের জন্য ছবি, টাইটেল, সীমা এবং সংক্ষিপ্ত বিবরণ যোগ করুন।
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* 1. Title (লোন টাইটেল) */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-800">
                        লোন প্রোডাক্টের নাম (Title):
                    </label>
                    <input
                        type="text"
                        {...register("title", { 
                            required: "টাইটেল অবশ্যই দিতে হবে",
                            maxLength: { value: 60, message: "টাইটেল ৬০ অক্ষরের বেশি হতে পারবে না" }
                        })}
                        id="title"
                        placeholder="যেমন: ব্যক্তিগত ঋণ"
                        className={inputClass}
                    />
                    {errors.title && <p className={errorClass}>{errors.title.message}</p>}
                </div>

                {/* 2. Max Loan Limit (সর্বোচ্চ লোনের সীমা) */}
                <div>
                    <label htmlFor="maxLimit" className="block text-sm font-medium text-gray-800">
                        সর্বোচ্চ ঋণের পরিমাণ:
                    </label>
                    <input
                        type="text"
                        {...register("maxLimit", { required: "সর্বোচ্চ সীমা আবশ্যক" })}
                        id="maxLimit"
                        placeholder="৳ 50,00,000 বা $ 50,000"
                        className={inputClass}
                    />
                    {errors.maxLimit && <p className={errorClass}>{errors.maxLimit.message}</p>}
                </div>
                
                {/* 3. Image URL (ইমেজ) */}
                <div>
                    <label htmlFor="imageURL" className="block text-sm font-medium text-gray-800">
                        কার্ড ইমেজের URL/Path:
                    </label>
                    <input
                        type="url"
                        {...register("imageURL", { required: "ইমেজ URL আবশ্যক" })} 
                        id="imageURL"
                        placeholder="https://yourwebsite.com/loan-card.jpg"
                        className={inputClass}
                    />
                    {errors.imageURL && <p className={errorClass}>{errors.imageURL.message}</p>}
                </div>


                {/* 4. Short Description (সংক্ষিপ্ত বিবরণ) */}
                <div>
                    <label htmlFor="shortDesc" className="block text-sm font-medium text-gray-800">
                        সংক্ষিপ্ত বিবরণ (Short Description):
                    </label>
                    <textarea
                        {...register("shortDesc", { 
                            required: "বিবরণ অবশ্যই দিতে হবে",
                            minLength: { value: 30, message: "বিবরণ কমপক্ষে ৩০ অক্ষরের হতে হবে" }
                        })}
                        id="shortDesc"
                        rows="4"
                        placeholder="এই ঋণটি আপনার শিক্ষা, ব্যবসা বা ব্যক্তিগত প্রয়োজন পূরণে সহায়তা করবে..."
                        className={inputClass}
                    ></textarea>
                    {errors.shortDesc && <p className={errorClass}>{errors.shortDesc.message}</p>}
                </div>
                
                {/* Submit Button (Apply Loan Data) */}
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-medium text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-200 transform hover:scale-[1.01]"
                >
                    প্রোডাক্ট ডাটা সেভ করুন
                </button>
            </form>
        </div>
    );
};

export default Applyloan;