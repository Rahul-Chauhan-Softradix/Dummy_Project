const http = require('http')
const Server = require('./bin/server')

class Application {
    constructor(){
        this.app = "";
        this.bind = "";
        this.port = "";
        this.server = "";
        this.serverObj = "";

    }

    async initApp(){
        this.port = 3000;
        this.serverObj = new Server();
        this.app = await this.serverObj.initServer();
        this.app.set('port',this.port);
        await this.initAppServer();
    }

    async initAppServer(){
        this.server = await http.createServer(this.app);
        this.server.listen(this.port);
        this.address = this.server.address();
        this.bind = typeof this.address === 'string'
        ? `pipe ${this.address}`
        :`port ${this.address.port}`;
    }
}

const app = new Application();

(async () => {
    process.setMaxListeners(0);
    await app.initApp();
})();

// The unhandledRejection listener
process.on('unhandledRejection', error => {
	console.error('unhandledRejection', error.message);
});

