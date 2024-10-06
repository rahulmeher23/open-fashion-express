import { loginService, signUpService} from "../service/auth.js";

const login = async (req, res) => {
    try {
        const response  = await loginService(req, res);
        // send response back to employee
        res.status(200).json({
            message: "User login successfully.",
            data: response
        });
    } catch (err) {
        console.error("Error logging in user:", err);
        const status = err.status || 500;
        const message = err.message || "Internal Server Error";
        res.status(status).json({ error: message });
    }
};

const signUp = async(req, res) => {
    try {
        // Pass request body to the service function
        const userData = await signUpService(req, res);
    
        // Send success response
        return res.status(201).json({
          success: true,
          message: "User registered successfully",
          data: userData,
        });
      } catch (error) {
        // Handle known error codes from Firebase Admin SDK
        if (error.code === "auth/email-already-exists") {
        //   throw new CustomError(400, "Email already in use.");
            return res.status(400).json({ error: "Email already in use." });
        }
    
        // If user creation failed but no Firestore error, delete the created user to maintain consistency
        if (error.message.includes("Firebase Auth")) {
          try {
            await admin.auth().deleteUser(error.uid);
          } catch (deleteError) {
            console.error("Failed to delete inconsistent user:", deleteError);
          }
        }
    
        console.log("error errorerror", error)
        // Forward all other errors to the error-handling middleware
        // throw new CustomError(500, error?.message || "Internal Server Error");
        return res.status(500).json({error: "Internal Server Error"})
      }
}

export {login, signUp}