import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';

const PopularCourses = () => {
  const enrolledCourses = useLoaderData(); // all enrollments
  console.log(enrolledCourses)
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    const courseMap = {};

    enrolledCourses.forEach(course => {
      const key = course.title;
      if (courseMap[key]) {
        courseMap[key].count += 1;
      } else {
        courseMap[key] = { ...course, count: 1 };
      }
    });

    // Convert object to array, sort by count desc
    const sortedCourses = Object.values(courseMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6); // top 6 courses

    setPopularCourses(sortedCourses);
  }, [enrolledCourses]);

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-4 text-black text-center">🔥 Popular Courses</h2>
      {popularCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularCourses.map((course, idx) => (
            <div key={idx} className="card bg-accent-content shadow-xl">
              <figure>
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{course.title}</h2>
                <p>{course.shortDescription}</p>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="badge badge-outline">{course.duration} Weeks</span>
                  <span className="font-bold">$ {course.price}</span>
                </div>
                <div className="mt-2 text-xs ">Enrolled {course.count} times</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-600'>No popular courses found yet.</p>
      )}
    </div>
  );
};

export default PopularCourses;
