const bcrypt = require("bcryptjs");
const User = require("../../models/user")

module.exports = {
    signIn: async ({ email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');
        }
        const token = user.generateAuthToken();
        return { user: user._id, token };
    },
    signUp: async (args) => {
        try {
            const { email, password } = args.userInput;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User exists already.');
            }
            const user = await new User({ email, password }).save();
            const token = user.generateAuthToken();
            return { token }
        }
        catch (e) {
            console.log(e)
        }
    }
};
