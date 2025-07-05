import React, { useState, useRef } from "react";
import "./ComponentForm.css";
import "intro.js/introjs.css";
import introJs from "intro.js";

const buildPresets = [
  "Python",
  "Java",
  "NodeJS",
  "Go",
  ".NET",
  "Ballerina",
  "PHP",
  "Ruby",
  "Docker",
  "WSO2 MI",
  "Prism Mock",
];

const typeIntoField = async (
  ref: HTMLInputElement | HTMLSelectElement,
  value: string,
  setter: (value: string) => void,
  delay = 50
) => {
  ref.focus();
  for (let i = 0; i <= value.length; i++) {
    const current = value.substring(0, i);
    setter(current);
    await new Promise((res) => setTimeout(res, delay));
  }
};

function ComponentFormContent() {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    organization: "",
    repository: "",
    branch: "",
    directory: "/",
    displayName: "",
    name: "",
    description: "",
  });

  // Refs for intro.js targeting
  const orgRef = useRef<HTMLSelectElement | null>(null);
  const repoRef = useRef<HTMLSelectElement | null>(null);
  const branchRef = useRef<HTMLSelectElement | null>(null);
  const dirRef = useRef<HTMLInputElement | null>(null);
  const displayNameRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);
  const buildPresetRef = useRef<HTMLButtonElement | null>(null); // For "Go"
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const result = {
      ...formValues,
      buildPreset: selectedPreset ?? "None",
    };
    alert("Component Created:\n\n" + JSON.stringify(result, null, 2));
  };

  const startIntroWithAutofill = () => {
    const intro = introJs();

    intro.setOptions({
      steps: [
        { element: orgRef.current!, intro: "" },
        { element: repoRef.current!, intro: "" },
        { element: branchRef.current!, intro: "" },
        { element: dirRef.current!, intro: "" },
        { element: displayNameRef.current!, intro: "" },
        { element: nameRef.current!, intro: "" },
        { element: descRef.current!, intro: "" },
        { element: buildPresetRef.current!, intro: "" },
        { element: submitBtnRef.current!, intro: "" },
      ],
      showBullets: false,
      showStepNumbers: false,
      showProgress: false,
      overlayOpacity: 0,
      disableInteraction: true,
      tooltipClass: "no-tooltip",
      highlightClass: "no-highlight",
    });

    intro.onafterchange(async (el) => {
      if (el === orgRef.current) {
        await typeIntoField(orgRef.current, "hanzjk", (v) =>
          setFormValues((f) => ({ ...f, organization: v }))
        );
      } else if (el === repoRef.current) {
        await typeIntoField(
          repoRef.current,
          "samples-for-connections-testing",
          (v) => setFormValues((f) => ({ ...f, repository: v }))
        );
      } else if (el === branchRef.current) {
        await typeIntoField(branchRef.current, "main", (v) =>
          setFormValues((f) => ({ ...f, branch: v }))
        );
      } else if (el === dirRef.current) {
        await typeIntoField(dirRef.current, "/greeting-service-go", (v) =>
          setFormValues((f) => ({ ...f, directory: v }))
        );
      } else if (el === displayNameRef.current) {
        await typeIntoField(displayNameRef.current, "Greeting Service", (v) =>
          setFormValues((f) => ({ ...f, displayName: v }))
        );
      } else if (el === nameRef.current) {
        await typeIntoField(nameRef.current, "greeting-service", (v) =>
          setFormValues((f) => ({ ...f, name: v }))
        );
      } else if (el === descRef.current) {
        await typeIntoField(
          descRef.current,
          "A Go-based greeting microservice",
          (v) => setFormValues((f) => ({ ...f, description: v }))
        );
      } else if (el === buildPresetRef.current) {
        setSelectedPreset("Go");
      } else if (el === submitBtnRef.current) {
        // wait a moment then click
        setTimeout(() => {
          submitBtnRef.current?.click();
        }, 300); // allow any typing animation to finish
        return; // don't call nextStep after this
      }

      setTimeout(() => {
        if (intro._currentStep < intro._options.steps.length - 1) {
          intro.nextStep();
        } else {
          intro.exit(true);
        }
      }, 500);
    });

    intro.start();
  };

  return (
    <div className="form-container">
      <h2>Repository Details</h2>
      <button onClick={startIntroWithAutofill}>Start Guided Autofill</button>
      <br />
      <div className="row">
        <div className="form-group">
          <label>Organization</label>
          <select
            ref={orgRef}
            name="organization"
            value={formValues.organization}
            onChange={handleInputChange}
          >
            <option value="">-- Select Organization --</option>
            <option value="hanzjk">hanzjk</option>
            <option value="choreo">choreo</option>
            <option value="sjp">sjp</option>
          </select>
        </div>
        <div className="form-group">
          <label>Repository</label>
          <select
            ref={repoRef}
            name="repository"
            value={formValues.repository}
            onChange={handleInputChange}
          >
            <option value="">-- Select Repo --</option>
            <option value="samples-for-connections-testing">
              samples-for-connections-testing
            </option>
            <option value="choreo-samples">choreo-samples</option>
            <option value="choreo-marketplace">choreo-marketplace</option>
          </select>
        </div>
        <div className="form-group">
          <label>Branch</label>
          <select
            ref={branchRef}
            name="branch"
            value={formValues.branch}
            onChange={handleInputChange}
          >
            <option value="">-- Select Branch --</option>
            <option value="main">main</option>
            <option value="dev">dev</option>
            <option value="dev-prod">dev-prod</option>
          </select>
        </div>
        <div className="form-group">
          <label>Component Directory</label>
          <input
            ref={dirRef}
            name="directory"
            type="text"
            value={formValues.directory}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <h2>Component Details</h2>
      <div className="row">
        <div className="form-group">
          <label>Display Name</label>
          <input
            ref={displayNameRef}
            name="displayName"
            type="text"
            placeholder="Enter display name here"
            value={formValues.displayName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            ref={nameRef}
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            ref={descRef}
            name="description"
            type="text"
            placeholder="Enter description here"
            value={formValues.description}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <h2>Build Details</h2>
      <div className="preset-grid">
        {buildPresets.map((preset) => (
          <button
            key={preset}
            ref={preset === "Go" ? buildPresetRef : undefined}
            type="button"
            className={`preset-button ${
              selectedPreset === preset ? "selected" : ""
            }`}
            onClick={() => setSelectedPreset(preset)}
          >
            {preset}
          </button>
        ))}
      </div>

      <br />
      <button
        className="submit-button"
        onClick={handleSubmit}
        ref={submitBtnRef}
      >
        Create Component
      </button>
    </div>
  );
}

export default ComponentFormContent;
