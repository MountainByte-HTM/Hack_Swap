// Import node-fetch (ESM style)
import fetch from 'node-fetch';

export default async (inputs) => {
  const data = {
    inputs: inputs.prompt, // Assuming 'prompt' is provided in 'inputs'
  };

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      {
        headers: {
          Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Replace with your actual token
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const result = await response.blob(); // Get the result as a blob (image data)
    
    // Return the result (you could handle it here)
    console.log('Image Blob:', result);
    return {
      image: result, // Return the image (blob) as part of the response object
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      error: "There was an error with the request.",
    };
  }
};

// Example usage:
const inputs = { prompt: "Astronaut riding a horse" };
(async () => {
  const result = await (await import('./script.js')).default(inputs);
  console.log(result);
})();