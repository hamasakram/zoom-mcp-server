# Zoom API MCP Server

    A comprehensive Model Context Protocol (MCP) server for interacting with the Zoom API.

    ## Features

    - Complete coverage of Zoom API endpoints
    - OAuth 2.0 authentication
    - Structured tools with proper validation
    - API documentation resources
    - Error handling and response formatting

    ## Getting Started

    ### Prerequisites

    - Node.js 16+
    - Zoom API credentials (Client ID, Client Secret, Account ID)

    ### Installation

    1. Clone the repository
    2. Install dependencies:
       ```
       npm install
       ```
    3. Create a `.env` file with your Zoom API credentials:
       ```
       ZOOM_CLIENT_ID=your_client_id
       ZOOM_CLIENT_SECRET=your_client_secret
       ZOOM_ACCOUNT_ID=your_account_id
       ```

    ### Running the Server

    ```
    npm run dev
    ```

    ### Testing with MCP Inspector

    ```
    npm run inspect
    ```

    ## API Categories

    - **Meetings**: Create, read, update, and delete meetings
    - **Users**: Manage users in your Zoom account
    - **Webinars**: Create and manage webinars
    - **Account**: Manage account settings and profile
    - **Chat**: Manage Zoom Chat channels and messages
    - **Phone**: Manage Zoom Phone users and numbers
    - **Contacts**: Manage contacts
    - **Recordings**: Access and manage cloud recordings
    - **Reports**: Generate various reports
    - **Webhooks**: Set up event notifications
    - **Zoom Rooms**: Manage Zoom Rooms

    ## Resources

    Access API documentation through resources:

    ```
    zoom-api://overview
    zoom-api://meetings
    zoom-api://users
    ```

    ## Authentication

    The server handles OAuth 2.0 authentication automatically using the Server-to-Server OAuth app credentials.
