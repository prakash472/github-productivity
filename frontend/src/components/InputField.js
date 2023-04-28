import { useState } from "react";
import Output from "./Output";

function InputField() {
  const [link, setLink] = useState("");
  const [response, setResponse] = useState("");
  const [responseData,setResponseData]=useState({});
  const [isReponseReceived, setIsResponseReceived]= useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Validate link format
      const regex = /^https:\/\/github\.com\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)$/;
      if (!regex.test(link)) {
        throw new Error(
          "Invalid link format. Correct format: https://github.com/{owner}/{repo}"
        );
      }

      // Extract owner and repo from link
      const [_, owner, repo] = link.match(regex);

      // Set loading state to true before sending the request
      setIsLoading(true);

      // Send the owner and repo to the server and get the response
      const response = await fetch(
        `http://127.0.0.1:4000/process_link?owner=${owner}&repo=${repo}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }

      const responseData = await response.json();
      setResponse(responseData.response);
      setIsResponseReceived(true);
      setResponseData(responseData);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      // Set loading state to false after receiving the response or an error
      setIsLoading(false);
    }
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
    setError("");
  };

  return (
    <div className="border border-gray-300 rounded-md p-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="link" className="block font-medium mb-2">
          Insert the Github URL link
        </label>
        <input
          id="link"
          name="link"
          type="text"
          placeholder="https://github.com/<repo_owner>/<repository_name>"
          value={link}
          onChange={handleLinkChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
        />
        {error && !isReponseReceived && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Send Link
        </button>
      </form>
      {isLoading && (
        <div className="mt-4">
          <p className="font-medium mb-2">Loading...</p>
        </div>
      )}
      {isReponseReceived && !isLoading && (
        <Output responseData= {responseData}></Output>
      )}
    </div>
  );
}

export default InputField;
