import { db } from "../config/firebase.js";

const getProductsService = async(req, res) => {
    try {
        // Reference to the 'products' collection
        const productsRef = db.collection("products");
    
        // Fetch all documents in the 'products' collection
        const snapshot = await productsRef.get();
    
        let products = [];
        // Check if the collection is empty
        if (snapshot.empty) { 
          throw new Error("No products found.");
        } else {
            products = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
        }
        
    
        // Map through the snapshot to create an array of products
    
        return products;
      } catch (error) {
        throw new Error("Error fetching products: " + error.message);
      }

}

export { getProductsService }