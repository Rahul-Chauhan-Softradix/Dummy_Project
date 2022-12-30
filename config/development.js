import db from './db.js';

module.exports = {
	port: 3000,
	db:db.development,
	logger: {
		maxSize: 512000,
		maxFiles: 100
	}
};
