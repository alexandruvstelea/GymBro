document
  .getElementById("exerciseForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("/admin/exercises/add", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        window.location.href = "/admin/exercises";
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
