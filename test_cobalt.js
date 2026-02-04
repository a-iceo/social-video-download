
async function testCobalt() {
  const url = "https://www.youtube.com/watch?v=jNQXAC9IVRw";
  try {
    const response = await fetch("https://downloadapi.stuff.solutions/api/json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ url })
    });
    
    console.log("Status:", response.status);
    const text = await response.text();
    console.log("Body:", text);
  } catch (error) {
    console.error("Error:", error);
  }
}

testCobalt();
