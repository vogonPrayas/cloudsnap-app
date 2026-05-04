// ==================== API CONFIGURATION ====================
// Replace these URLs with your actual Logic App endpoints

const API_CONFIG = {
    // POST - Upload new image
    UPLOAD_URL: 'https://prod-04.francecentral.logic.azure.com:443/workflows/e6bd1faa38ae4d5a8d7a3b0589c5bf85/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=RKE8MxoLtkfclF6v6T3rwDAqjRqPBaPlt27nYfS2A6E',
    
    // GET - Retrieve all images
    GET_URL: 'https://prod-05.francecentral.logic.azure.com:443/workflows/2c0e64ad1fc24023935f1f7de79c6b9f/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=8OcdeOneEOlnAU8YxXzTzVAttzKuh501-dZ-GIp_CI4',
    
    // PUT - Update image title
    UPDATE_URL: 'https://prod-30.francecentral.logic.azure.com:443/workflows/3aff0b118b744cebb480efae36388235/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=wdkXKinZeJfDAPzy-P8E10d8hMqxCG68ke7rJ4mzkkc',
    
    // DELETE - Remove image
    DELETE_URL: 'https://prod-10.francecentral.logic.azure.com:443/workflows/8ccf0e31cb5b4c28843e2b1340a0cde6/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=qGz6XkEr1qcEMiCabahkG4glIC5El7V84BsY2B8LFPQ'
};

// ==================== CONFIGURATION NOTES ====================
/*
 * These URLs are your Logic App HTTP trigger endpoints
 * They are already configured with your actual endpoints
 * 
 * Security Note: In production, you should:
 * 1. Use Azure API Management for better security
 * 2. Implement authentication (Azure AD B2C)
 * 3. Add rate limiting
 * 4. Use environment variables instead of hardcoding URLs
 */
