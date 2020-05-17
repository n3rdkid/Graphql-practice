const Shows = require("../../models/shows")
const User = require("../../models/user")
module.exports = {
    shows: async () => {
        return await Shows.find()
    },
    addShow: async ({ title, releasedYear, poster }) => {
        const show = new Shows({ title, releasedYear, poster });
        console.log(title);
        console.log(show)
        await show.save();
        return title
    },
    addShowToWatchList: async ({ id }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const userId = req.user._id;
        const user = await User.findOne({ _id: userId });
        const showExists = user.watchList.find(show =>show._id.toString() === id)
        if (showExists)
            return "Already in watch list.";
        user.watchList = [...user.watchList, id]
        await user.save();
        return id;

    },
    addShowToWatchLater: async ({ id }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const userId = req.user._id;
        const user = await User.findOne({ _id: userId });
        const showExists = user.watchLater.find(show =>show._id.toString() === id)
        if (showExists)
            return "Already in watch later list.";
        user.watchLater = [...user.watchLater, id]
        await user.save();
        return id;

    },
    getWatchLater: async (_, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const user = await User.findOne({ _id: req.user._id })
        const populatedUser = await user.populate('watchLater').execPopulate();
        return populatedUser.watchLater;
    }
};
