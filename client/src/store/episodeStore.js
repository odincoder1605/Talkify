import { create } from "zustand";

import axios from "axios";

const CLIENT_URL = "http://localhost:5000/api/episode";

axios.defaults.withCredentials = true;

export const useEpisodeStore = create((set)=> ({
    episode : null,
    error : null,
    isLoading : false,

    create: async (title, thumbnail, description, video, category, tags) => {
        set({ isLoading: true, error: null });
      
        try {
          const formData = new FormData();
          formData.append("title", title);
          formData.append("thumbnail", thumbnail); // should be a File object
          formData.append("description", description);
          formData.append("video", video); // should be a File object
          formData.append("category", category);
          formData.append("tags", JSON.stringify(tags)); // in case it's an array
      
          const response = await axios.post(`${CLIENT_URL}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      
          set({ episode: response.data, isLoading: false });
        } catch (error) {
          set({
            error: error?.response?.data?.message || "Error in uploading",
            isLoading: false,
          });
          throw error;
        }
      },
      
      getAll: async () => {
        // Clear any existing errors
        set({ error: null });
      
        try {
          // Perform the GET request
          const response = (await axios.get(`${CLIENT_URL}/getAll`)).data;
      
          // Log the full response for debugging
          console.log(response);
      
          // Update the state with the fetched data
          set({ episode: response.data });
        } catch (error) {
          // Extract the error message, defaulting to a generic message if not available
          const errorMessage = error?.response?.data?.message || "Error in Getting Videos";
      
          // Update the state with the error message
          set({ error: errorMessage });
      
          // Optionally, re-throw the error if further handling is needed
          throw error;
        }
      }
      
})
)