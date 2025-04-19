"use client";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    profileImage: "",
    password: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.contact ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const response = axios.post("/api/auth/signup", { formData });
      toast.promise(response, {
        loading: "Creating Account",
        success: (data) => {
          router.push("/login");
          return data.data.message;
        },
        error: (err: any) => {
          console.log(err);
          return err.response?.data?.message || "Error creating account";
        },
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to create account");
    }
  };

  const handleProfileImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    folderName: string,
    imageName: string,
    path: string
  ) => {
    if (!formData.name) {
      toast.error("Name is required for images");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const imageResponse = axios.postForm("/api/helper/upload-img", {
        file,
        name: imageName,
        folderName: folderName,
      });
      console.log(imageResponse);
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setFormData({
            ...formData,
            [path]: data.data.path,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };
  return (
    <div className="flex justify-center items-center w-full bg-base-200 px-5 py-5 min-h-[calc(100vh-5.6rem)]">
      <div className="xl:max-w-7xl bg-base-100 drop-shadow-xl border border-base-content/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
        <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
          <img src="login.png" alt="login" className="h-[500px]" />
        </div>
        <div className="mx-auto w-full lg:w-1/2 flex flex-col items-center justify-center md:p-10 md:py-0">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-primary">
            Create Account
          </h1>
          <div className="w-full mt-5 sm:mt-8">
            <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="Enter Your Mobile Number"
                minLength={10}
                maxLength={10}
                className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                value={formData.contact}
                onChange={(e) => {
                  setFormData({ ...formData, contact: e.target.value });
                }}
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-base">
                  Profile Image
                </legend>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full text-base-content"
                  accept="image/* .jpg"
                  onChange={(e) => {
                    handleProfileImageChange(
                      e,
                      "profileImage",
                      formData.name,
                      "profileImage"
                    );
                  }}
                />
              </fieldset>

              <label className="input input-primary input-bordered w-full flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full text-base-content placeholder:text-base-content/70"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
                {showPassword ? (
                  <IconEyeOff
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <IconEye
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </label>
              <div className="flex items-center gap-1.5  justify-start pl-2">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => {
                        setFormData({ ...formData, terms: !formData.terms });
                      }}
                    />
                  </label>
                </div>
                <h3 className="flex items-center whitespace-nowrap text-base text-base-content">
                  I agree to the
                  <span className="text-primary">&nbsp;Terms</span>
                  &nbsp;and
                  <span className="text-primary">&nbsp;Privacy Policy</span>.
                </h3>
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                <button
                  className="btn btn-outline btn-primary btn-block max-w-[200px]"
                  onClick={handleSubmit}
                  disabled={
                    !formData.email ||
                    !formData.password ||
                    !formData.name ||
                    !formData.contact ||
                    !formData.terms
                  }
                >
                  Sign Up
                </button>
              </div>
              <p className="text-center mt-3 text-base text-base-content">
                Already have an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
