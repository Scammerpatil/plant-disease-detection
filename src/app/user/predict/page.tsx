"use client";
import { IconClipboardText, IconCloudUpload } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { DISEASES } from "@/utils/diseases";

interface Response {
  disease: string;
  probability: number;
  pesticide: string;
}

const PredictFromImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) return toast.error("Please upload a file first.");
    setLoading(true);
    try {
      const res = axios.postForm("/api/predict/image", { file });
      toast.promise(res, {
        loading: "Predicting...",
        success: (data) => {
          if (data.data.result === "Not a leaf image") {
            setResponse(null);
            toast.error("Not a leaf image.");
            return `Please upload a leaf image.`;
          } else if (data.data.result === "No disease detected") {
            setResponse(null);
            return `No disease detected.`;
          }
          setResponse(data.data.result);
          return `Prediction complete!`;
        },
        error: (error) => error.response.data.message || "Error predicting.",
      });
    } catch (error) {
      toast.error("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const diseaseInfo = response
    ? DISEASES.find((item) => item.label === response.disease)
    : null;

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Predict Leaf Disease from Image
      </h1>

      <div className="flex items-center justify-center w-full max-w-md mx-auto">
        <label
          className="flex flex-col items-center justify-center w-full border-2 border-dashed border-base-content rounded-lg cursor-pointer bg-base-100 py-4 px-6 hover:bg-base-200"
          htmlFor="dropzone-file"
        >
          <div className="flex flex-col items-center justify-center">
            <IconCloudUpload size={48} className="text-base-content mb-2" />
            <p className="text-sm">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-base-content">(Only JPG/PNG images)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setResponse(null);
            }}
          />
          {file && (
            <button className="btn btn-sm btn-info mt-3">
              <IconClipboardText size={14} />
              {file.name}
            </button>
          )}
        </label>
      </div>

      {file && (
        <div className="flex justify-center mt-6">
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded Preview"
            className="w-full max-w-md rounded-lg shadow-lg h-52 object-contain bg-base-200"
          />
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          className="btn btn-primary w-full max-w-md"
          disabled={!file || loading}
          onClick={handleSubmit}
        >
          Predict
        </button>
      </div>

      {response && diseaseInfo && (
        <div className="max-w-3xl mx-auto mt-10">
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body space-y-4">
              <h2 className="card-title text-2xl text-accent font-bold text-center">
                {diseaseInfo.crop} - {diseaseInfo.disease}
                <span className="ml-2">
                  <div
                    className="radial-progress text-primary"
                    style={
                      {
                        "--value": response.probability,
                      } as React.CSSProperties
                    }
                    aria-valuenow={response.probability}
                    role="progressbar"
                  >
                    {response.probability}%
                  </div>
                </span>
              </h2>

              <div>
                <p className="text-lg font-semibold">Causes:</p>
                <ul className="list-disc list-inside ml-4">
                  {diseaseInfo.causes.map((cause, idx) => (
                    <li key={idx}>{cause}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-lg font-semibold">Remedies:</p>
                <ul className="list-disc list-inside ml-4">
                  {diseaseInfo.remedies.map((remedy, idx) => (
                    <li key={idx}>{remedy}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-base">
                  <span className="font-semibold">Recommended Pesticide:</span>{" "}
                  {response?.pesticide}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PredictFromImage;
