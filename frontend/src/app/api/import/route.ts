/**
 * Route handler used by the client-side components to upload a CSV file containing reviews into the backend.
 *
 * This route handler exposes this functionality to the client-side components without exposing the backend directly
 * to the client. While currently there is no authentication or authorization implemented, this will be useful in the
 * future to avoid exposing the backend's credentials to the client, which could lead to security vulnerabilities.
 *
 * @param req Request object containing the CSV file to upload.
 * @returns Response object indicating the status of the upload operation.
 */
export async function POST(req: Request) {
  try {
    // Parse the incoming form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("File is required", { status: 400 });
    }

    // Create a new FormData to send to the backend
    const backendFormData = new FormData();
    backendFormData.append("file", file, file.name);

    // Send the request to the backend
    const response = await fetch(`${process.env.BACKEND_URL!}/reviews/csv`, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      return new Response(
        `Error uploading reviews: ${response.status} ${response.statusText}`,
        { status: response.status }
      );
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error processing file upload:", error);
    return new Response(
      `Error processing file upload: ${
        error instanceof Error ? error.message : String(error)
      }`,
      { status: 500 }
    );
  }
}
