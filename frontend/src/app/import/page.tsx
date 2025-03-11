"use client";

import { useState } from "react";

/**
 * This page allows the user to upload a CSV file containing product reviews, which will be used by the assistant to
 * provide its answers.
 *
 * This page contains a very simply form with a single file input. For this reason, we don't need to use a form library
 * like React Hook Form, and we can manage the form state with React's built-in state management.
 *
 * Note that we could have used a server action to handle the file upload, but we decided to use a route handler instead
 * since we are already using a route handler for the chat endpoint.
 */
const ImportPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * Handles the file change event. Check if the selected file is a CSV file and set it in the state.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type !== "text/csv") {
      setError("Please select a CSV file");
      setFile(null);
      return;
    }
    setError(null);
    setFile(selectedFile || null);
  };

  /**
   * Handles the form submit event. Uploads the selected file to the server.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file, file.name);

    try {
      const response = await fetch("/api/import", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          errorText || `Error: ${response.status} ${response.statusText}`
        );
      }

      setSuccess(true);
    } catch (err) {
      setError(
        `Failed to upload file: ${err instanceof Error ? err.message : err}`
      );
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="mb-2">Upload Product Reviews</h1>

      {success ? (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            CSV file uploaded successfully! You may go back to the chat.
          </span>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">
                    Select CSV File with Product Reviews
                  </span>
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                  disabled={loading}
                />
                <label className="label">
                  <span className="label-text-alt text-info">
                    Only CSV files are accepted
                  </span>
                </label>
              </div>

              {error && (
                <div className="alert alert-error mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div className="card-actions justify-end mt-4">
                <button
                  type="submit"
                  className={`btn btn-primary ${loading ? "loading" : ""}`}
                  disabled={!file || loading}
                >
                  {loading ? "Uploading..." : "Upload CSV"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportPage;
