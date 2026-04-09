module.exports = {
  apps: [{
    name: 'apiaberta-bdp',
    script: 'src/index.js',
    cwd: '/data/apiaberta/connector-bdp',
    env: {
      NODE_ENV: 'production',
      PORT: 3007,
      MONGO_URI: 'mongodb://localhost:27017/apiaberta-bdp'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
    error_file: '/var/log/pm2/apiaberta-bdp-error.log',
    out_file: '/var/log/pm2/apiaberta-bdp-out.log'
  }]
}
