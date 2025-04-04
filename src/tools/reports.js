import { z } from 'zod';
    import { zoomApi, handleApiResponse, handleApiError } from '../utils/api.js';

    export const reportsTools = [
      {
        name: "get_daily_report",
        description: "Get daily usage report",
        schema: {
          year: z.number().describe("Year"),
          month: z.number().min(1).max(12).describe("Month")
        },
        handler: async ({ year, month }) => {
          try {
            const response = await zoomApi.get(`/report/daily`, {
              params: { year, month }
            });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "get_meeting_participants_report",
        description: "Get meeting participants report",
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
      },
      {
        name: "get_meeting_details_report",
        description: "Get meeting details report",
        schema: {
          meeting_id: z.string().describe("The meeting ID")
        },
        handler: async ({ meeting_id }) => {
          try {
            const response = await zoomApi.get(`/report/meetings/${meeting_id}`);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "get_webinar_participants_report",
        description: "Get webinar participants report",
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
      },
      {
        name: "get_webinar_details_report",
        description: "Get webinar details report",
        schema: {
          webinar_id: z.string().describe("The webinar ID")
        },
        handler: async ({ webinar_id }) => {
          try {
            const response = await zoomApi.get(`/report/webinars/${webinar_id}`);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      }
    ];
