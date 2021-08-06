const server = require("./api/server");

const { PORT } = require("./config");

server.listen(PORT || 5000, () => {
	console.log(`listen on ${PORT}`);
});
