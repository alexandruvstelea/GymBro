async function deleteEntity(entityId) {
  try {
    const response = await fetch(`/exercises/delete/${entityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Failed to delete entity");
    }
  } catch (error) {
    console.error("Error deleting entity:", error);
  }
}
