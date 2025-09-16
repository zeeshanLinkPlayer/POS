import app from "./app";
import config from "./src/config";
const port = config.port;

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
