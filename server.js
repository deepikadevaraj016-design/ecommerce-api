const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan"); 
const { sequelize } = require("./config/db");

const logger = require("./middleware/logger");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger);
app.use(morgan("dev"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/stores", require("./routes/storeRoutes"));
app.use("/api/brands", require("./routes/brandRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/order-items", require("./routes/orderItemRoutes"));

app.get("/", (req, res) => {
  res.send(" API is running...");
});
app.post("/test-body", (req, res) => {
  res.json(req.body);
});

app.use((err, req, res, next) => {
  console.error(" Error:", err.message);
  res.status(500).json({ msg: err.message });
});

const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () =>
    console.log(` Server running on http://localhost:${PORT}`)
  );
});

