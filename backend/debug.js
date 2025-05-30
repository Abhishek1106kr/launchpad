// Create this file as get-ip.js
const https = require('https');

function getCurrentIP() {
    console.log('🔍 Getting your current IP address...');
    
    const options = {
        hostname: 'api.ipify.org',
        path: '/',
        method: 'GET'
    };

    const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('📍 Your current IP address is:', data);
            console.log('💡 Add this IP to your MongoDB Atlas Network Access list');
        });
    });

    req.on('error', (error) => {
        console.error('❌ Error getting IP:', error.message);
        console.log('🌐 You can also visit https://whatismyipaddress.com/ to get your IP');
    });

    req.end();
}

getCurrentIP();