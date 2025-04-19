"use client";

import { DISEASES } from "@/utils/diseases";

export default function DiseaseDashboard() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Agriscan-ai Leaf Disease Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DISEASES.map((item, index) => (
          <div key={index} className="card bg-base-300 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-xl font-semibold mb-2">
                {item.label.split("__").join(" ").split("_").join(" ")}
              </h2>
              <p className="text-sm mb-2 text-base-content capitalize">
                <strong>Crop:</strong> {item.crop}
                <br />
                <strong>Disease:</strong> {item.disease}
                <br />
                <strong>Severity:</strong> {item.severity}
              </p>
              <div role="tablist" className="tabs tabs-border">
                <input
                  type="radio"
                  name="my_tabs_2"
                  className="tab"
                  aria-label="Causes"
                  defaultChecked
                />
                <div className="tab-content">
                  <p className="text-sm my-1 mb-2 text-base-content">
                    {item.causes.map((cause, index) => (
                      <span key={index} className="block">
                        {index + 1}. {cause}
                      </span>
                    ))}
                  </p>
                </div>

                <input
                  type="radio"
                  name="my_tabs_2"
                  className="tab"
                  aria-label="Remedies"
                />
                <div className="tab-content">
                  <p className="text-sm my-2 text-base-content">
                    {item.remedies.map((remedy, index) => (
                      <span key={index} className="block">
                        {index + 1}. {remedy}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
