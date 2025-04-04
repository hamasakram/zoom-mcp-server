import { z } from 'zod';
    import { zoomApi, handleApiResponse, handleApiError } from '../utils/api.js';

    export const webhooksTools = [
      {
        name: "list_webhooks",
        description: "List webhooks",
        schema: {},
        handler: async () => {
          try {
            const response = await zoomApi.get('/webhooks');
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "create_webhook",
        description: "Create a webhook",
        schema: {
          url: z.string().url().describe("Webhook URL"),
          event_types: z.array(z.string()).describe("Event types to subscribe to"),
          authorization_header: z.string().optional().describe("Authorization header"),
          description: z.string().optional().describe("Webhook description")
        },
        handler: async (webhookData) => {
          try {
            const response = await zoomApi.post('/webhooks', webhookData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "get_webhook",
        description: "Get a webhook's information",
        schema: {
          webhook_id: z.string().describe("The webhook ID")
        },
        handler: async ({ webhook_id }) => {
          try {
            const response = await zoomApi.get(`/webhooks/${webhook_id}`);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "update_webhook",
        description: "Update a webhook's information",
        schema: {
          webhook_id: z.string().describe("The webhook ID"),
          url: z.string().url().optional().describe("Webhook URL"),
          event_types: z.array(z.string()).optional().describe("Event types to subscribe to"),
          authorization_header: z.string().optional().describe("Authorization header"),
          description: z.string().optional().describe("Webhook description"),
          status: z.enum(["active", "inactive"]).optional().describe("Webhook status")
        },
        handler: async ({ webhook_id, ...webhookData }) => {
          try {
            const response = await zoomApi.patch(`/webhooks/${webhook_id}`, webhookData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "delete_webhook",
        description: "Delete a webhook",
        schema: {
          webhook_id: z.string().describe("The webhook ID")
        },
        handler: async ({ webhook_id }) => {
          try {
            const response = await zoomApi.delete(`/webhooks/${webhook_id}`);
            return {
              content: [{ 
                type: "text", 
                text: "Webhook deleted successfully"
              }]
            };
          } catch (error) {
            return handleApiError(error);
          }
        }
      }
    ];
