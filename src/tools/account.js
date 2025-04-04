import { z } from 'zod';
    import { zoomApi, handleApiResponse, handleApiError } from '../utils/api.js';

    export const accountTools = [
      {
        name: "get_account_settings",
        description: "Get account settings",
        schema: {
          option: z.enum(["meeting_authentication", "recording_authentication", "security"]).optional().describe("Setting option to query")
        },
        handler: async ({ option }) => {
          try {
            const params = {};
            if (option) params.option = option;
            
            const response = await zoomApi.get('/accounts/me/settings', { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "update_account_settings",
        description: "Update account settings",
        schema: {
          settings: z.object({}).passthrough().describe("Account settings to update")
        },
        handler: async ({ settings }) => {
          try {
            const response = await zoomApi.patch('/accounts/me/settings', settings);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "get_account_profile",
        description: "Get account profile information",
        schema: {},
        handler: async () => {
          try {
            const response = await zoomApi.get('/accounts/me');
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "list_sub_accounts",
        description: "List sub accounts",
        schema: {
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          page_number: z.number().min(1).optional().describe("Page number")
        },
        handler: async ({ page_size, page_number }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (page_number) params.page_number = page_number;
            
            const response = await zoomApi.get('/accounts', { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "create_sub_account",
        description: "Create a sub account",
        schema: {
          first_name: z.string().describe("First name of the account owner"),
          last_name: z.string().describe("Last name of the account owner"),
          email: z.string().email().describe("Email address of the account owner"),
          password: z.string().describe("Password"),
          phone_country: z.string().optional().describe("Country for phone"),
          phone_number: z.string().optional().describe("Phone number"),
          company_name: z.string().describe("Company name"),
          address: z.string().optional().describe("Address"),
          city: z.string().optional().describe("City"),
          state: z.string().optional().describe("State/Province"),
          zip: z.string().optional().describe("ZIP/Postal Code"),
          country: z.string().describe("Country")
        },
        handler: async (accountData) => {
          try {
            const response = await zoomApi.post('/accounts', accountData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      }
    ];
