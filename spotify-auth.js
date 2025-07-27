// Spotify OAuth Helper
class SpotifyAuth {
    constructor() {
        this.clientId = 'YOUR_SPOTIFY_CLIENT_ID'; // Replace with your actual client ID
        this.redirectUri = 'https://vordz23.github.io/porfolio/callback.html';
        this.scopes = [
            'user-read-private',
            'user-read-email',
            'user-top-read',
            'user-read-recently-played',
            'user-read-playback-state',
            'user-modify-playback-state',
            'streaming'
        ];
    }
    
    // Generate random string for state parameter
    generateRandomString(length) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let text = '';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    
    // Start OAuth flow
    authorize() {
        const state = this.generateRandomString(16);
        localStorage.setItem('spotify_auth_state', state);
        
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: this.clientId,
            scope: this.scopes.join(' '),
            redirect_uri: this.redirectUri,
            state: state,
            show_dialog: 'true' // Force user to approve again
        });
        
        const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
        console.log('🔐 Redirecting to Spotify authorization:', authUrl);
        
        window.location.href = authUrl;
    }
    
    // Check if user is authenticated
    isAuthenticated() {
        const token = localStorage.getItem('spotify_access_token');
        const expiresAt = localStorage.getItem('spotify_expires_at');
        
        if (!token || !expiresAt) {
            return false;
        }
        
        // Check if token is expired
        if (Date.now() >= parseInt(expiresAt)) {
            console.log('🔄 Token expired, attempting refresh...');
            return this.refreshToken();
        }
        
        return true;
    }
    
    // Get current access token
    getAccessToken() {
        if (this.isAuthenticated()) {
            return localStorage.getItem('spotify_access_token');
        }
        return null;
    }
    
    // Refresh access token
    async refreshToken() {
        const refreshToken = localStorage.getItem('spotify_refresh_token');
        
        if (!refreshToken) {
            console.log('❌ No refresh token available');
            this.clearTokens();
            return false;
        }
        
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(this.clientId + ':YOUR_SPOTIFY_CLIENT_SECRET') // Replace with your client secret
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const tokenData = await response.json();
            
            // Update stored tokens
            localStorage.setItem('spotify_access_token', tokenData.access_token);
            localStorage.setItem('spotify_expires_at', Date.now() + (tokenData.expires_in * 1000));
            
            // Update refresh token if provided
            if (tokenData.refresh_token) {
                localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
            }
            
            console.log('✅ Token refreshed successfully');
            return true;
            
        } catch (error) {
            console.error('💥 Token refresh failed:', error);
            this.clearTokens();
            return false;
        }
    }
    
    // Clear all stored tokens
    clearTokens() {
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_refresh_token');
        localStorage.removeItem('spotify_expires_at');
        localStorage.removeItem('spotify_auth_state');
        console.log('🗑️ Tokens cleared');
    }
    
    // Logout user
    logout() {
        this.clearTokens();
        console.log('👋 User logged out');
    }
    
    // Make authenticated API request
    async apiRequest(endpoint, options = {}) {
        const token = this.getAccessToken();
        
        if (!token) {
            throw new Error('No valid access token available');
        }
        
        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        
        const mergedOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        };
        
        const response = await fetch(`https://api.spotify.com/v1${endpoint}`, mergedOptions);
        
        if (response.status === 401) {
            // Token expired, try to refresh
            if (await this.refreshToken()) {
                // Retry with new token
                mergedOptions.headers.Authorization = `Bearer ${this.getAccessToken()}`;
                return fetch(`https://api.spotify.com/v1${endpoint}`, mergedOptions);
            } else {
                throw new Error('Authentication failed');
            }
        }
        
        return response;
    }
}

// Export for use in other files
window.SpotifyAuth = SpotifyAuth;
