import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";
import { Helmet } from "react-helmet";

const CourseEdit = () => {
  const course = useLoaderData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    imageUrl: "",
    duration: "",
    price: "",
  });

  // Populate form with loaded course
  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        shortDescription: course.shortDescription || "",
        imageUrl: course.imageUrl || "",
        duration: course.duration || "",
        price: course.price || "",
      });
    }
  }, [course]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    try {
      const response = await fetch(
        `https://course-server-beta-three.vercel.app/updatecourse/${course._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        }
      );

      const data = await response.json();

      if (data.modifiedCount > 0 || data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Course Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/my-course");
        }, 1600);
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes Made",
          text: "The course remains the same.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Courses</title>
      </Helmet>
      <div className="my-14">
        <div className="max-w-xl mx-auto p-6 bg-accent-content rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Course</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Course Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input bg-white text-black input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Short Description</label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                className="textarea bg-white text-black textarea-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="input bg-white text-black input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="input bg-white text-black input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Price (in USD)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input bg-white text-black input-bordered w-full"
                required
                min="0"
                step="0.01"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Update Course
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CourseEdit;
