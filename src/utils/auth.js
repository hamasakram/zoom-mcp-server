import axios from 'axios';

    // Cache for the access token
    let accessToken = null;
    let tokenExpiry = 0;

    // Get access token using client credentials flow
    export const getAccessToken = async () => {
      // Check if we have a valid token
      if (accessToken && tokenExpiry > Date.now()) {
        return accessToken;
      }

      try {
        const clientId = process.env.ZOOM_CLIENT_ID;
        const clientSecret = process.env.ZOOM_CLIENT_SECRET;
        const accountId = process.env.ZOOM_ACCOUNT_ID;

        if (!clientId || !clientSecret || !accountId) {
          throw new Error('Missing Zoom API credentials. Please set ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, and ZOOM_ACCOUNT_ID in .env file.');
        }

        // Get new token
        const response = await axios.post(
          'https://zoom.us/oauth/token',
          null,
          {
            params: {
              grant_type: 'account_credentials',
              account_id: accountId
            },
            headers: {
              'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            }
          }
        );

        accessToken = response.data.access_token;
        // Set expiry time with a small buffer
        tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000;
        
        return accessToken;
      } catch (error) {
        console.error('Error getting access token:', error.response?.data || error.message);
        throw error;
      }
    };
