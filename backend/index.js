require("dotenv").config();
const app = require("./app/app")

// Server listen
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
