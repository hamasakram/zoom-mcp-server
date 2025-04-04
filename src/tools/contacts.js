import { z } from 'zod';
    import { zoomApi, handleApiResponse, handleApiError } from '../utils/api.js';

    export const contactsTools = [
      {
        name: "list_contacts",
        description: "List contacts",
        schema: {
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          next_page_token: z.string().optional().describe("Next page token"),
          status: z.enum(["active", "inactive", "pending"]).optional().describe("Contact status")
        },
        handler: async ({ page_size, next_page_token, status }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (next_page_token) params.next_page_token = next_page_token;
            if (status) params.status = status;
            
            const response = await zoomApi.get('/contacts', { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "get_contact",
        description: "Get a contact's information",
        schema: {
          contact_id: z.string().describe("The contact ID")
        },
        handler: async ({ contact_id }) => {
          try {
            const response = await zoomApi.get(`/contacts/${contact_id}`);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "search_company_contacts",
        description: "Search company contacts",
        schema: {
          query_string: z.string().describe("Search query string"),
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          next_page_token: z.string().optional().describe("Next page token")
        },
        handler: async ({ query_string, page_size, next_page_token }) => {
          try {
            const params = { query_string };
            if (page_size) params.page_size = page_size;
            if (next_page_token) params.next_page_token = next_page_token;
            
            const response = await zoomApi.get('/contacts/search', { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      }
    ];
