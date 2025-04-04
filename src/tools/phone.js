import { z } from 'zod';
    import { zoomApi, handleApiResponse, handleApiError } from '../utils/api.js';

    export const phoneTools = [
      {
        name: "list_phone_users",
        description: "List phone users",
        schema: {
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          next_page_token: z.string().optional().describe("Next page token"),
          site_id: z.string().optional().describe("Site ID")
        },
        handler: async ({ page_size, next_page_token, site_id }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (next_page_token) params.next_page_token = next_page_token;
            if (site_id) params.site_id = site_id;
            
            const response = await zoomApi.get('/phone/users', { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "get_phone_user",
        description: "Get a phone user's information",
        schema: {
          user_id: z.string().describe("The user ID or email address")
        },
        handler: async ({ user_id }) => {
          try {
            const response = await zoomApi.get(`/phone/users/${user_id}`);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "update_phone_user",
        description: "Update a phone user's information",
        schema: {
          user_id: z.string().describe("The user ID or email address"),
          extension_number: z.string().optional().describe("Extension number"),
          site_id: z.string().optional().describe("Site ID"),
          policy_id: z.string().optional().describe("Policy ID")
        },
        handler: async ({ user_id, ...userData }) => {
          try {
            const response = await zoomApi.patch(`/phone/users/${user_id}`, userData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "list_phone_numbers",
        description: "List phone numbers",
        schema: {
          type: z.enum(["assigned", "unassigned", "all"]).optional().describe("Phone number type"),
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          next_page_token: z.string().optional().describe("Next page token")
        },
        handler: async ({ type, page_size, next_page_token }) => {
          try {
            const params = {};
            if (type) params.type = type;
            if (page_size) params.page_size = page_size;
            if (next_page_token) params.next_page_token = next_page_token;
            
            const response = await zoomApi.get('/phone/numbers', { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      }
    ];
