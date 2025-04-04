import { z } from 'zod';
    import { zoomApi, handleApiResponse, handleApiError } from '../utils/api.js';

    export const zoomRoomsTools = [
      {
        name: "list_zoom_rooms",
        description: "List Zoom Rooms",
        schema: {
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          page_number: z.number().min(1).optional().describe("Page number"),
          location_id: z.string().optional().describe("Location ID")
        },
        handler: async ({ page_size, page_number, location_id }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (page_number) params.page_number = page_number;
            if (location_id) params.location_id = location_id;
            
            const response = await zoomApi.get('/rooms', { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "get_zoom_room",
        description: "Get a Zoom Room's information",
        schema: {
          room_id: z.string().describe("The Zoom Room ID")
        },
        handler: async ({ room_id }) => {
          try {
            const response = await zoomApi.get(`/rooms/${room_id}`);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "update_zoom_room",
        description: "Update a Zoom Room's information",
        schema: {
          room_id: z.string().describe("The Zoom Room ID"),
          name: z.string().optional().describe("Room name"),
          location_id: z.string().optional().describe("Location ID"),
          calendar_resource_id: z.string().optional().describe("Calendar resource ID"),
          room_passcode: z.string().optional().describe("Room passcode")
        },
        handler: async ({ room_id, ...roomData }) => {
          try {
            const response = await zoomApi.patch(`/rooms/${room_id}`, roomData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "list_zoom_room_locations",
        description: "List Zoom Room locations",
        schema: {
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          page_number: z.number().min(1).optional().describe("Page number"),
          parent_location_id: z.string().optional().describe("Parent location ID")
        },
        handler: async ({ page_size, page_number, parent_location_id }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (page_number) params.page_number = page_number;
            if (parent_location_id) params.parent_location_id = parent_location_id;
            
            const response = await zoomApi.get('/rooms/locations', { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "create_zoom_room_location",
        description: "Create a Zoom Room location",
        schema: {
          name: z.string().describe("Location name"),
          parent_location_id: z.string().optional().describe("Parent location ID"),
          type: z.enum(["country", "state", "city", "campus", "building", "floor"]).describe("Location type")
        },
        handler: async (locationData) => {
          try {
            const response = await zoomApi.post('/rooms/locations', locationData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      }
    ];
