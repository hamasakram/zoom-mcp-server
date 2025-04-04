import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
    import { meetingsTools } from './tools/meetings.js';
    import { usersTools } from './tools/users.js';
    import { webinarsTools } from './tools/webinars.js';
    import { accountTools } from './tools/account.js';
    import { chatTools } from './tools/chat.js';
    import { phoneTools } from './tools/phone.js';
    import { contactsTools } from './tools/contacts.js';
    import { recordingsTools } from './tools/recordings.js';
    import { reportsTools } from './tools/reports.js';
    import { webhooksTools } from './tools/webhooks.js';
    import { zoomRoomsTools } from './tools/zoom-rooms.js';
    import { apiDocs } from './resources/api-docs.js';

    // Create an MCP server for Zoom API
    const server = new McpServer({
      name: "Zoom API",
      version: "1.0.0",
      description: "MCP Server for interacting with the Zoom API"
    });

    // Register all tools
    const registerTools = (toolsArray) => {
      toolsArray.forEach(tool => {
        server.tool(
          tool.name,
          tool.schema,
          tool.handler,
          { description: tool.description }
        );
      });
    };

    // Register all resources
    const registerResources = (resourcesArray) => {
      resourcesArray.forEach(resource => {
        server.resource(
          resource.name,
          resource.template,
          resource.handler
        );
      });
    };

    // Register all tools
    registerTools(meetingsTools);
    registerTools(usersTools);
    registerTools(webinarsTools);
    registerTools(accountTools);
    registerTools(chatTools);
    registerTools(phoneTools);
    registerTools(contactsTools);
    registerTools(recordingsTools);
    registerTools(reportsTools);
    registerTools(webhooksTools);
    registerTools(zoomRoomsTools);

    // Register all resources
    registerResources(apiDocs);

    export { server };
