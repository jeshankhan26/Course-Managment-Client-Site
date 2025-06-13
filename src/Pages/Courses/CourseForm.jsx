import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

const CourseForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    imageUrl: "",
    duration: "",
    price: "", // ✅ New price field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      ...formData,
      price: parseFloat(formData.price),
      instructorName: user?.displayName || "Anonymous",
      email: user?.email,
    };

    try {
      const response = await fetch(
        "https://course-server-beta-three.vercel.app/addcourse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        }
      );

      const data = await response.json();
      if (data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Course Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        // Reload page after SweetAlert closes
      setTimeout(() => {
          navigate("/courses");
        }, 1600);
      } else {
        Swal.fire({
          icon: "error",
          title: "Add Failed",
          text: "No course inserted. Please try again.",
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
        <title>Add Courses</title>
      </Helmet>
      <div className="my-14">
        <div className="max-w-xl mx-auto p-6 bg-accent-content rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Add New Course
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Course Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter course title"
                className="input bg-white text-black input-bordered w-full"
                onChange={handleChange}
                value={formData.title}
                required
              />
            </div>

            <div>
              <label className="label">Short Description</label>
              <textarea
                name="shortDescription"
                placeholder="Enter short description"
                className="textarea bg-white text-black textarea-bordered w-full"
                onChange={handleChange}
                value={formData.shortDescription}
                required
              />
            </div>

            <div>
              <label className="label">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                placeholder="Enter image URL"
                className="input bg-white text-black input-bordered w-full"
                onChange={handleChange}
                value={formData.imageUrl}
                required
              />
            </div>

            <div>
              <label className="label">Duration (e.g., 5 weeks)</label>
              <input
                type="text"
                name="duration"
                placeholder="Enter course duration"
                className="input bg-white text-black input-bordered w-full"
                onChange={handleChange}
                value={formData.duration}
                required
              />
            </div>

            <div>
              <label className="label">Price (in USD)</label>
              <input
                type="number"
                name="price"
                placeholder="Enter course price"
                className="input bg-white text-black input-bordered w-full"
                onChange={handleChange}
                value={formData.price}
                required
                min="0"
                step="0.01"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit Course
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CourseForm;
