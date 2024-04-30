import { useForm } from "react-hook-form";
import { useState } from "react";
import axiosClient from "../../api/axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/messages/Toast";

export default function CreateType() {
  const navigate = useNavigate();

  const [formloading, setFormlaoding] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [multipleImages, setMultipleImages] = useState([]);
  const changeMultipleFiles = (e) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setMultipleImages((prevImages) => prevImages.concat(imageArray));
    }
  };

  const render = (data) => {
    return data.map((image) => {
      return <img className="image" src={image} alt="" key={image} />;
    });
  };

  const onSubmit = (data) => {
    setFormlaoding(true);
    const formData = new FormData();
    formData.append("type", data.type);
    // formData.append("images", data.images);

    for (const key of Object.keys(multipleImages)) {
      formData.append("images", data.images[key]);
    }
    axiosClient
      .post("/types", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setFormlaoding(false);
        setMultipleImages([]);
        Toast("Creation Successfull");
        setTimeout(() => {
          navigate("admin/dashboard");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        notifyFail();
      });
  };

  const notifyFail = () =>
    toast.error("Error during upload", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-gray-100 w-96 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className=" flex justify-center text-2xl leading-6 font-medium text-gray-900 font-titleH3 mb-3">
            Lege eine neue Kursart an
          </h2>

          <form className="uploadform" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Titel / Name
              </label>
              <input
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                placeholder="Activity Type"
                {...register("type", {
                  required: "You must provide a name",
                })}
              />
              {errors.type?.type === "required" && (
                <span className="label self-start mt-2 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  {errors.type.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Bilder hinzufügen
              </label>
              <input
                className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                placeholder="Product Image"
                {...register("images", { required: true })}
                type="file"
                name="images"
                multiple
                onChange={changeMultipleFiles}
              />
            </div>
            {formloading ? (
              <button className=" w-full btn btn-primary text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2">
                <span className="loading loading-spinner"></span>
                loading
              </button>
            ) : (
              <button
                type="submit"
                className="w-full btn btn-primary text-white px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2"
              >
                Submit
              </button>
            )}
          </form>
          {render(multipleImages)}
        </div>
      </div>
    </div>
  );
}
