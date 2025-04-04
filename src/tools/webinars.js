import { z } from 'zod';
    import { zoomApi, handleApiResponse, handleApiError } from '../utils/api.js';

    export const webinarsTools = [
      {
        name: "list_webinars",
        description: "List all webinars for a user",
        schema: {
          user_id: z.string().describe("The user ID or email address"),
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          page_number: z.number().min(1).optional().describe("Page number")
        },
        handler: async ({ user_id, page_size, page_number }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (page_number) params.page_number = page_number;
            
            const response = await zoomApi.get(`/users/${user_id}/webinars`, { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "create_webinar",
        description: "Create a webinar for a user",
        schema: {
          user_id: z.string().describe("The user ID or email address"),
          topic: z.string().describe("Webinar topic"),
          type: z.number().min(5).max(9).describe("Webinar type (5: Webinar, 6: Recurring webinar with no fixed time, 9: Recurring webinar with fixed time)"),
          start_time: z.string().optional().describe("Webinar start time"),
          duration: z.number().optional().describe("Webinar duration in minutes"),
          timezone: z.string().optional().describe("Time zone"),
          password: z.string().optional().describe("Webinar password"),
          agenda: z.string().optional().describe("Webinar description"),
          settings: z.object({}).passthrough().optional().describe("Webinar settings")
        },
        handler: async ({ user_id, ...webinarData }) => {
          try {
            const response = await zoomApi.post(`/users/${user_id}/webinars`, webinarData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "get_webinar",
        description: "Retrieve a webinar's details",
        schema: {
          webinar_id: z.string().describe("The webinar ID")
        },
        handler: async ({ webinar_id }) => {
          try {
            const response = await zoomApi.get(`/webinars/${webinar_id}`);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "update_webinar",
        description: "Update a webinar's details",
        schema: {
          webinar_id: z.string().describe("The webinar ID"),
          topic: z.string().optional().describe("Webinar topic"),
          type: z.number().min(5).max(9).optional().describe("Webinar type"),
          start_time: z.string().optional().describe("Webinar start time"),
          duration: z.number().optional().describe("Webinar duration in minutes"),
          timezone: z.string().optional().describe("Time zone"),
          password: z.string().optional().describe("Password"),
          agenda: z.string().optional().describe("Webinar description"),
          settings: z.object({}).passthrough().optional().describe("Webinar settings")
        },
        handler: async ({ webinar_id, ...webinarData }) => {
          try {
            const response = await zoomApi.patch(`/webinars/${webinar_id}`, webinarData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "delete_webinar",
        description: "Delete a webinar",
        schema: {
          webinar_id: z.string().describe("The webinar ID"),
          occurrence_id: z.string().optional().describe("The occurrence ID for a recurring webinar"),
          cancel_webinar_reminder: z.boolean().optional().describe("Send cancellation email to registrants")
        },
        handler: async ({ webinar_id, occurrence_id, cancel_webinar_reminder }) => {
          try {
            const params = {};
            if (occurrence_id) params.occurrence_id = occurrence_id;
            if (cancel_webinar_reminder !== undefined) params.cancel_webinar_reminder = cancel_webinar_reminder;
            
            const response = await zoomApi.delete(`/webinars/${webinar_id}`, { params });
            return {
              content: [{ 
                type: "text", 
                text: "Webinar deleted successfully"
              }]
            };
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "list_webinar_participants",
        description: "List participants from a webinar",
        schema: {
          webinar_id: z.string().describe("The webinar ID"),
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          next_page_token: z.string().optional().describe("Next page token")
        },
        handler: async ({ webinar_id, page_size, next_page_token }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (next_page_token) params.next_page_token = next_page_token;
            
            const response = await zoomApi.get(`/report/webinars/${webinar_id}/participants`, { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      }
    ];
