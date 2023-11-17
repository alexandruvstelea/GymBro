document.addEventListener("DOMContentLoaded", () => {
  const editExerciseForm = document.getElementById("editExerciseForm");
  const exerciseIdInput = document.getElementById("exerciseId");

  editExerciseForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const exerciseId = exerciseIdInput.value;
    const url = `/exercises/update/${exerciseId}`;

    const formData = new FormData(editExerciseForm);

    try {
      const serializedData = Array.from(formData.entries())
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: serializedData,
      });

      if (response.ok) {
        window.location.href = "/admin/exercises";
      } else {
        const errorMessage = await response.json();
        alert(errorMessage.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});
