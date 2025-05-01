module.exports = {
  apps: [{
    name: 'apollo-demo-app',
    script: './src/index.js',
    env: {
      NODE_ENV: 'production',
      PORT: 4000,
      API_URL: 'https://express-demo-app-production.up.railway.app'
    },
    watch: false,
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '256M'
  }]
}