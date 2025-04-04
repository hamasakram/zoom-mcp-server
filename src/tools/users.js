import { z } from 'zod';
    import { zoomApi, handleApiResponse, handleApiError } from '../utils/api.js';

    export const usersTools = [
      {
        name: "list_users",
        description: "List users on the account",
        schema: {
          status: z.enum(["active", "inactive", "pending"]).optional().describe("User status"),
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          page_number: z.number().min(1).optional().describe("Page number"),
          role_id: z.string().optional().describe("Role ID")
        },
        handler: async ({ status, page_size, page_number, role_id }) => {
          try {
            const params = {};
            if (status) params.status = status;
            if (page_size) params.page_size = page_size;
            if (page_number) params.page_number = page_number;
            if (role_id) params.role_id = role_id;
            
            const response = await zoomApi.get('/users', { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "create_user",
        description: "Create a new user on the account",
        schema: {
          action: z.enum(["create", "autoCreate", "custCreate", "ssoCreate"]).describe("Action to create user"),
          user_info: z.object({
            email: z.string().email().describe("User email address"),
            type: z.number().min(1).max(99).describe("User type (1: Basic, 2: Licensed, 3: On-prem)"),
            first_name: z.string().optional().describe("User's first name"),
            last_name: z.string().optional().describe("User's last name"),
            password: z.string().optional().describe("User password")
          }).describe("User information")
        },
        handler: async ({ action, user_info }) => {
          try {
            const response = await zoomApi.post('/users', { action, user_info });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "get_user",
        description: "Get a user's information",
        schema: {
          user_id: z.string().describe("The user ID or email address")
        },
        handler: async ({ user_id }) => {
          try {
            const response = await zoomApi.get(`/users/${user_id}`);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "update_user",
        description: "Update a user's information",
        schema: {
          user_id: z.string().describe("The user ID or email address"),
          first_name: z.string().optional().describe("User's first name"),
          last_name: z.string().optional().describe("User's last name"),
          type: z.number().min(1).max(99).optional().describe("User type"),
          pmi: z.string().optional().describe("Personal Meeting ID"),
          use_pmi: z.boolean().optional().describe("Use Personal Meeting ID for instant meetings"),
          timezone: z.string().optional().describe("User timezone"),
          dept: z.string().optional().describe("Department")
        },
        handler: async ({ user_id, ...userData }) => {
          try {
            const response = await zoomApi.patch(`/users/${user_id}`, userData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "delete_user",
        description: "Delete a user",
        schema: {
          user_id: z.string().describe("The user ID or email address"),
          action: z.enum(["delete", "disassociate"]).describe("Delete action (delete: permanently delete, disassociate: disassociate from account)")
        },
        handler: async ({ user_id, action }) => {
          try {
            const response = await zoomApi.delete(`/users/${user_id}`, { 
              params: { action }
            });
            return {
              content: [{ 
                type: "text", 
                text: "User deleted successfully"
              }]
            };
          } catch (error) {
            return handleApiError(error);
          }
        }
      }
    ];
