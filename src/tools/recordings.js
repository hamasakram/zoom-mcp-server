import { z } from 'zod';
    import { zoomApi, handleApiResponse, handleApiError } from '../utils/api.js';

    export const recordingsTools = [
      {
        name: "list_recordings",
        description: "List all recordings for a user",
        schema: {
          user_id: z.string().describe("The user ID or email address"),
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          next_page_token: z.string().optional().describe("Next page token"),
          from: z.string().optional().describe("Start date in 'yyyy-MM-dd' format"),
          to: z.string().optional().describe("End date in 'yyyy-MM-dd' format")
        },
        handler: async ({ user_id, page_size, next_page_token, from, to }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (next_page_token) params.next_page_token = next_page_token;
            if (from) params.from = from;
            if (to) params.to = to;
            
            const response = await zoomApi.get(`/users/${user_id}/recordings`, { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "get_meeting_recordings",
        description: "Get recordings for a specific meeting",
        schema: {
          meeting_id: z.string().describe("The meeting ID")
        },
        handler: async ({ meeting_id }) => {
          try {
            const response = await zoomApi.get(`/meetings/${meeting_id}/recordings`);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "delete_meeting_recordings",
        description: "Delete recordings for a specific meeting",
        schema: {
          meeting_id: z.string().describe("The meeting ID"),
          action: z.enum(["trash", "delete"]).optional().describe("Delete action (trash: move to trash, delete: delete permanently)")
        },
        handler: async ({ meeting_id, action }) => {
          try {
            const params = {};
            if (action) params.action = action;
            
            const response = await zoomApi.delete(`/meetings/${meeting_id}/recordings`, { params });
            return {
              content: [{ 
                type: "text", 
                text: "Meeting recordings deleted successfully"
              }]
            };
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "delete_recording_file",
        description: "Delete a specific recording file",
        schema: {
          meeting_id: z.string().describe("The meeting ID"),
          recording_id: z.string().describe("The recording ID"),
          action: z.enum(["trash", "delete"]).optional().describe("Delete action (trash: move to trash, delete: delete permanently)")
        },
        handler: async ({ meeting_id, recording_id, action }) => {
          try {
            const params = {};
            if (action) params.action = action;
            
            const response = await zoomApi.delete(`/meetings/${meeting_id}/recordings/${recording_id}`, { params });
            return {
              content: [{ 
                type: "text", 
                text: "Recording file deleted successfully"
              }]
            };
          } catch (error) {
            return handleApiError(error);
          }
        }
      }
    ];
