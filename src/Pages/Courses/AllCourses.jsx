import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AllCourses = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch enrolled courses for the current user
  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const response = await fetch(
          "https://course-server-beta-three.vercel.app/allenroll"
        );
        const result = await response.json();
        const userEnrollments = result.filter(
          (course) => course.email === user?.email
        );
        setEnrolledCourses(userEnrollments);
      } catch (error) {
        console.error("Failed to fetch enrolled courses:", error);
      }
    };

    if (user?.email) {
      fetchEnrolled();
    }
  }, [user]);

  // Check if course already enrolled
  const isEnrolled = (courseTitle) => {
    return enrolledCourses.some((course) => course.title === courseTitle);
  };

  // Handle enrollment
  const handleSubmit = async (e, course) => {
    e.preventDefault();

    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Please Login First",
        text: "You need to login to enroll in a course.",
      });
      return navigate("/login");
    }

    if (isEnrolled(course.title)) {
      Swal.fire({
        icon: "info",
        title: "Already Enrolled",
        text: "You are already enrolled in this course.",
      });
      return;
    }

    const courseData = {
      title: course.title,
      imageUrl: course.imageUrl,
      shortDescription: course.shortDescription,
      duration: course.duration,
      price: course.price,
      email: user.email,
      enrolled: "enrolled",
    };

    try {
      const response = await fetch(
        "https://course-server-beta-three.vercel.app/enrollcourse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        }
      );

      const result = await response.json();
      if (result.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Course Enrolled Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setEnrolledCourses((prev) => [...prev, courseData]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Enrollment Failed",
          text: "Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>All Courses</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-3 mx-5 bg-white">
        {data.map((course) => (
          <div
            key={course._id}
            className="card w-full bg-accent-content shadow-xl"
          >
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
                <span className="badge badge-outline">
                  {course.duration} Weeks
                </span>
                <span className="font-bold">$ {course.price}</span>
              </div>
              <div className="card-actions justify-end mt-4">
                <form onSubmit={(e) => handleSubmit(e, course)}>
                  <button
                    type="submit"
                    className={`btn btn-primary btn-sm ${
                      isEnrolled(course.title) ? "btn-disabled" : ""
                    }`}
                    disabled={isEnrolled(course.title)}
                  >
                    {isEnrolled(course.title) ? "Enrolled" : "Enroll"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllCourses;
