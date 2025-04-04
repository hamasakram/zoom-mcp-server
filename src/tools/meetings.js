import { z } from 'zod';
    import { zoomApi, handleApiResponse, handleApiError } from '../utils/api.js';

    export const meetingsTools = [
      {
        name: "list_meetings",
        description: "List all meetings for a user",
        schema: {
          user_id: z.string().describe("The user ID or email address"),
          type: z.enum(["scheduled", "live", "upcoming", "pending"]).optional().describe("Meeting type"),
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned per page"),
          page_number: z.number().min(1).optional().describe("Page number")
        },
        handler: async ({ user_id, type, page_size, page_number }) => {
          try {
            const params = {};
            if (type) params.type = type;
            if (page_size) params.page_size = page_size;
            if (page_number) params.page_number = page_number;
            
            const response = await zoomApi.get(`/users/${user_id}/meetings`, { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "create_meeting",
        description: "Create a new meeting for a user",
        schema: {
          user_id: z.string().describe("The user ID or email address"),
          topic: z.string().describe("Meeting topic"),
          type: z.number().min(1).max(8).describe("Meeting type (1: instant, 2: scheduled, 3: recurring with no fixed time, 8: recurring with fixed time)"),
          start_time: z.string().optional().describe("Meeting start time in format YYYY-MM-DDThh:mm:ss"),
          duration: z.number().optional().describe("Meeting duration in minutes"),
          timezone: z.string().optional().describe("Time zone for start_time"),
          password: z.string().optional().describe("Password for the meeting"),
          agenda: z.string().optional().describe("Meeting description"),
          settings: z.object({}).passthrough().optional().describe("Meeting settings")
        },
        handler: async ({ user_id, ...meetingData }) => {
          try {
            const response = await zoomApi.post(`/users/${user_id}/meetings`, meetingData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "get_meeting",
        description: "Retrieve a meeting's details",
        schema: {
          meeting_id: z.string().describe("The meeting ID")
        },
        handler: async ({ meeting_id }) => {
          try {
            const response = await zoomApi.get(`/meetings/${meeting_id}`);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "update_meeting",
        description: "Update a meeting's details",
        schema: {
          meeting_id: z.string().describe("The meeting ID"),
          topic: z.string().optional().describe("Meeting topic"),
          type: z.number().min(1).max(8).optional().describe("Meeting type"),
          start_time: z.string().optional().describe("Meeting start time"),
          duration: z.number().optional().describe("Meeting duration in minutes"),
          timezone: z.string().optional().describe("Time zone"),
          password: z.string().optional().describe("Password"),
          agenda: z.string().optional().describe("Meeting description"),
          settings: z.object({}).passthrough().optional().describe("Meeting settings")
        },
        handler: async ({ meeting_id, ...meetingData }) => {
          try {
            const response = await zoomApi.patch(`/meetings/${meeting_id}`, meetingData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "delete_meeting",
        description: "Delete a meeting",
        schema: {
          meeting_id: z.string().describe("The meeting ID"),
          occurrence_id: z.string().optional().describe("The occurrence ID for a recurring meeting"),
          schedule_for_reminder: z.boolean().optional().describe("Send cancellation email to registrants")
        },
        handler: async ({ meeting_id, occurrence_id, schedule_for_reminder }) => {
          try {
            const params = {};
            if (occurrence_id) params.occurrence_id = occurrence_id;
            if (schedule_for_reminder !== undefined) params.schedule_for_reminder = schedule_for_reminder;
            
            const response = await zoomApi.delete(`/meetings/${meeting_id}`, { params });
            return {
              content: [{ 
                type: "text", 
                text: "Meeting deleted successfully"
              }]
            };
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "list_meeting_participants",
        description: "List participants from a meeting",
        schema: {
          meeting_id: z.string().describe("The meeting ID"),
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          next_page_token: z.string().optional().describe("Next page token")
        },
        handler: async ({ meeting_id, page_size, next_page_token }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (next_page_token) params.next_page_token = next_page_token;
            
            const response = await zoomApi.get(`/report/meetings/${meeting_id}/participants`, { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      }
    ];
