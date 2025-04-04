import { z } from 'zod';
    import { zoomApi, handleApiResponse, handleApiError } from '../utils/api.js';

    export const chatTools = [
      {
        name: "list_channels",
        description: "List channels",
        schema: {
          page_size: z.number().min(1).max(300).optional().describe("Number of records returned"),
          next_page_token: z.string().optional().describe("Next page token")
        },
        handler: async ({ page_size, next_page_token }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (next_page_token) params.next_page_token = next_page_token;
            
            const response = await zoomApi.get('/chat/users/me/channels', { params });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "create_channel",
        description: "Create a channel",
        schema: {
          name: z.string().describe("Channel name"),
          type: z.number().min(1).max(2).describe("Channel type (1: Private, 2: Public)"),
          members: z.array(z.object({
            email: z.string().email().describe("Member email address")
          })).optional().describe("Channel members")
        },
        handler: async (channelData) => {
          try {
            const response = await zoomApi.post('/chat/users/me/channels', channelData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "get_channel",
        description: "Get a channel's information",
        schema: {
          channel_id: z.string().describe("The channel ID")
        },
        handler: async ({ channel_id }) => {
          try {
            const response = await zoomApi.get(`/chat/channels/${channel_id}`);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "update_channel",
        description: "Update a channel's information",
        schema: {
          channel_id: z.string().describe("The channel ID"),
          name: z.string().optional().describe("Channel name")
        },
        handler: async ({ channel_id, ...channelData }) => {
          try {
            const response = await zoomApi.patch(`/chat/channels/${channel_id}`, channelData);
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "delete_channel",
        description: "Delete a channel",
        schema: {
          channel_id: z.string().describe("The channel ID")
        },
        handler: async ({ channel_id }) => {
          try {
            const response = await zoomApi.delete(`/chat/channels/${channel_id}`);
            return {
              content: [{ 
                type: "text", 
                text: "Channel deleted successfully"
              }]
            };
          } catch (error) {
            return handleApiError(error);
          }
        }
      },
      {
        name: "send_channel_message",
        description: "Send a message to a channel",
        schema: {
          channel_id: z.string().describe("The channel ID"),
          message: z.string().describe("Message content")
        },
        handler: async ({ channel_id, message }) => {
          try {
            const response = await zoomApi.post(`/chat/users/me/channels/${channel_id}/messages`, {
              message
            });
            return handleApiResponse(response);
          } catch (error) {
            return handleApiError(error);
          }
        }
      }
    ];
