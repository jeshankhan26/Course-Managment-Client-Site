import React, { useContext } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const EnrolledCourse = () => {
    const data=useLoaderData();
    console.log(data)
    const { user } = useContext(AuthContext);
    
      const matchedCourses = data.filter((item) => item.email === user.email);
       const handleDelete = (id) => {
      
              console.log(id);
              Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                  console.log(result.isConfirmed)
              if (result.isConfirmed) {
                  // Start Deleting the coffee
                  fetch(`https://course-server-beta-three.vercel.app/enroll/${id}`, {
                      method: 'DELETE',
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  }).then(res => res.json())
                  .then(data => {
                      console.log(data);
                      if (data.deletedCount) {
                          Swal.fire(
                              'Deleted!',
                              'Enrolled Data Has been deleted.',
                              'success'
                          ).then(() => {
                              // Reload the page or update the UI as needed
                              window.location.reload();
                          });
                          
                      }
                  })
                 
              }
              })}
    return (
        <>
        <Helmet>
                <title>Enrolled Courses</title>
              </Helmet>
            <div className="overflow-x-auto text-black p-4 ">
      {matchedCourses.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-500">
          No course available
        </div>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-black">Course</th>
              <th className="text-black">Course Duration</th>
              <th className="text-black">Course Price</th>
              <th className="text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matchedCourses.map((course, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={course.imageUrl} alt="Course" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{course.title}</div>
                      <div className="text-sm opacity-50">
                        {course.shortDescription || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{course.duration} Weeks</td>
                <td>$ {course.price} </td>
                <td className="flex flex-wrap gap-2">

                  <button onClick={()=>handleDelete(course._id)} className="btn btn-xs bg-red-500 hover:bg-red-600 text-white shadow-md transition duration-200 ease-in-out">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
        </>
    );
};

export default EnrolledCourse;