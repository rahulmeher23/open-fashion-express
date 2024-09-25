import bcrypt from "bcrypt";

const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
};

const comparePassword = async (prevPassword, currentPassword) => {
    const hashedPassword = await bcrypt.compare(prevPassword, currentPassword);
    return hashedPassword;
};

export {
    hashPassword,
    comparePassword
}