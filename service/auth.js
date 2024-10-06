import CustomError from "../utils/customError.js";
import { loginSchema, signUpSchema } from "../validators/auth.js";
import admin from "../config/firebase.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

const loginService = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    throw new CustomError(400, error.details[0].message);
  }

  let userCredentials;
  try {
    userCredentials = await admin.auth().getUserByEmail(value.email);
  } catch (error) {
    if (error.code == "auth/user-not-found") {
      throw new CustomError(404, "User not found.");
    }
    throw new CustomError(500, "Internal Server Error.");
  }
  //   userCredentials = await admin.auth().getUserByEmail(value)
  //   if(!userCredentials) {
  //     throw new CustomError(404, 'User not found.')
  //   }
  let userDetails;
  try {
    const userDocRef = await admin
      .firestore()
      .collection("users")
      .doc(userCredentials.uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      throw new CustomError(404, "User details not found.");
    }

    userDetails = userDoc.data();
  } catch (error) {
    throw new CustomError(500, "Failed to fetch user details.");
  }

  const passwordMatch = value.password === userDetails.password;

  if (!passwordMatch) {
    throw new CustomError(401, "Invalid email or password");
  }

  const claims = {
    uid: userCredentials.uid,
    email: userDetails.email,
  };

  const accessToken = generateAccessToken(claims);
  const refreshToken = generateRefreshToken(claims);

  const response = {
    userDetails,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  delete response.userDetails.password;
  delete response.userDetails.createdAt;

  //   return res.status(200).json({
  //     success: true,
  //     message: "User Logged In Successfully",
  //     data: response,
  //   });

  return response;
};

const signUpService = async (req, res) => {
  const { error, value } = signUpSchema.validate(req.body);

  if (error) {
    throw new CustomError(400, error.details[0].message);
  }

  console.log("value", value);

  const newRecord = await admin.auth().createUser({
    email: value.email,
    password: value?.password,
  });

  const newUserBody = {
    ...value,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const newUser = await  admin.firestore().collection("users").doc(newRecord.uid).set(newUserBody);

  return {
    uid: newRecord.uid,
    email: value.email,
    name: value.name,
    phone: value.phone,
  };
};

export { loginService, signUpService };
