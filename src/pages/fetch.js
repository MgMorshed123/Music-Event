export const fetchEvents = () => {
  api
    .get("/events")
    .then((res) => {
      setEvents(res.data);
      setError("");
    })
    .catch((err) => {
      console.error("Error refetching events:", err);
      setError("Failed to refresh events.");
    });
};
