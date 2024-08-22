const { Router } = require("express");

const router = Router();


// Get products
router.get("/products", async (req, res) => {
    try {
      const productsRef = db.collection("products");
      const snapshot = await productsRef.get();
  
      if (snapshot.empty) {
        return res.status(404).send("No products found.");
      }
  
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.send(products);
    } catch (error) {
      res.status(500).send("Error fetching products: " + error.message);
    }
  });

module.exports = router