import React from 'react';
import Banner from '../Components/Banner';
import { Helmet } from 'react-helmet';
import PopularCourses from '../Components/PopularCourses';

const Home = () => {
    return (
        <>
         <Helmet>
                <title>Home Page</title>
              </Helmet>
        <Banner></Banner>
        <PopularCourses></PopularCourses>
        <section className="bg-white py-10 px-5">
  <h2 className="text-3xl font-bold text-center text-black mb-6">🌟 What Our Students Say</h2>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {[1, 2, 3].map((id) => (
      <div key={id} className="card bg-accent-content shadow-xl p-4">
        <div className="flex items-center gap-4 mb-3">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={`https://i.pravatar.cc/150?img=${id + 10}`} alt="student" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Student {id}</h3>
            <p className="text-xs text-gray-500">Enrolled in Web Dev</p>
          </div>
        </div>
        <p className=" text-sm">"This platform helped me land my first job! Highly recommended for beginners and pros."</p>
      </div>
    ))}
  </div>
</section>
{/* FAQ */}
<section className="bg-accent-content py-10 px-5">
  <h2 className="text-2xl font-bold text-center mb-6">❓ Frequently Asked Questions</h2>
  <div className="max-w-3xl mx-auto space-y-4">
    <div className="collapse collapse-arrow bg-white shadow-md">
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-lg font-medium text-black">
        How long do I have access to the courses?
      </div>
      <div className="collapse-content text-sm text-gray-600">
        You get lifetime access to all the courses you enroll in.
      </div>
    </div>
    <div className="collapse collapse-arrow bg-white shadow-md text-black">
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-lg font-medium text-black">
        Do I get a certificate after completion?
      </div>
      <div className="collapse-content text-sm text-gray-600">
        Yes! A verifiable certificate is provided upon successful completion.
      </div>
    </div>
    <div className="collapse collapse-arrow bg-white shadow-md text-black">
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-lg font-medium">
        Can I get a refund if not satisfied?
      </div>
      <div className="collapse-content text-sm text-gray-600">
        Absolutely! We offer a 7-day money-back guarantee with no questions asked.
      </div>
    </div>
  </div>
</section>


            
        </>
    );
};

export default Home;