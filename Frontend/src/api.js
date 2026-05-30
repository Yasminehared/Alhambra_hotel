import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
});

api.defaults.xsrfCookieName = "XSRF-TOKEN";
api.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

export async function ensureCsrf() {
  await api.get("/api/csrf-cookie");
}

export async function fetchRoomTypes() {
  const { data } = await api.get("/api/room-types");
  return data;
}

export async function fetchRoomType(slug) {
  const { data } = await api.get(`/api/room-types/${slug}`);
  return data;
}

export async function createReservation(payload) {
  await ensureCsrf();
  const { data } = await api.post("/api/reservations", payload);
  return data;
}

export default api;
