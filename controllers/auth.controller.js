import loginService from "../service/auth.js";

const login = async (req, res) => {
    try {
        // const {accessToken, refreshToken}  = await loginService(req, res);
        const response  = await loginService(req, res);
        // send response back to employee
        res.status(200).json({
            message: "User login successfully.",
            // accessToken: accessToken,
            // refreshToken: refreshToken
            data: response
        });
    } catch (err) {
        console.error("Error logging in user:", err);
        const status = err.status || 500;
        const message = err.message || "Internal Server Error";
        res.status(status).json({ error: message });
    }
};

export {login}