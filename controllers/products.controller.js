import { getProductsService } from "../service/productsService.js";

const products = async (req, res) => {
    try {
        // Call the service function to fetch products
        const products = await getProductsService();
    
        // Return the products in the response
        return res.status(200).json({
          success: true,
          message: "Products fetched successfully",
          data: products,
        });
      } catch (error) {
        console.error("Error in getProductsController:", error);
        // Handle known error when no products are found
        if (error.message === "No products found.") {
          return res.status(404).json({ success: false, message: error.message });
        }
    
        // Handle other unexpected errors
        return res.status(500).json({
          success: false,
          message: "Error fetching products",
          error: error.message,
        });
      }
};

export {products}
