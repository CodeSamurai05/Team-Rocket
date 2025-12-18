// --- [NEW] API Helper Function: fetchWithRetry ---
// Yeh function API call ko retry karega agar network issue hota hai
async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      }
      // Agar server error (5xx) hai, toh hi retry karein
      if (response.status >= 500 && response.status < 600) {
        throw new Error(`Server error: ${response.status}`);
      } else {
        // Client errors (4xx) par turant fail karein
        return response; // Fail response ko aage handle kiya jayega
      }
    } catch (error) {
      if (i === retries - 1) throw error; // Aakhri try ke baad error throw karein
      await new Promise(res => setTimeout(res, delay * Math.pow(2, i))); // Exponential backoff
    }
  }
}
