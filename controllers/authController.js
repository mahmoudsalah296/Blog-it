const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require("../models/userModel");
const isAdmin = require('../middleware/isAdmin');

const register = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const image = req.file ? req.file.filename : 'defaultImage.jpg';
    const bio = req.body.bio || null;


    if (!username || !email || !password) {
        return res.status(400).json({message: "please fill in the required fields."});
    }

    const foundUser = await User.findOne({email}).exec();

    if (foundUser) {
        return res.status(401).json({message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        profilePicture: image,
        bio: bio? bio : null
    });

    const accessToken = jwt.sign({
        UserInfo: {
            id: user._id,
            isAdmin: user.isAdmin ? user.isAdmin : false, // added 
        }
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"15m"});

    const refreshToken = jwt.sign({
        UserInfo: {
            id: user._id,
            isAdmin: user.isAdmin ? user.isAdmin : false, // added 
        }
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"7d"});

    res.cookie("jwt", refreshToken, {
        // httpOnly:true,
        // secure: true,
        // sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
        accessToken, 
        email: user.email,
        username: user.username
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({message: "All fields are required."});
    }

    const foundUser = await User.findOne({email}).exec();

    if (!foundUser) {
        return res.status(401).json({message: 'User does not exist'});
    }

    const validPassword = await bcrypt.compare(password, foundUser.password);

    if (!validPassword) {
        return res.status(401).json({message: 'Wrong password'});
    }

    const accessToken = jwt.sign({
        UserInfo: {
            id: foundUser._id,
            isAdmin: foundUser.isAdmin ? foundUser.isAdmin : false, // added 
        }
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});

    const refreshToken = jwt.sign({
        UserInfo: {
            id: foundUser._id,
            isAdmin: foundUser.isAdmin ? foundUser.isAdmin : false, // added 
        }
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"7d"});

    res.cookie("jwt", refreshToken, {
		// httpOnly:true,
        // secure: true,
        // sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
        accessToken,
        email: foundUser.email
    });
}

const refresh = async (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) {
        return res.status(401).json({message: "Unauthorized"});
    }

    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, decoded) => {
        if (err) {
            return res.status(403).json({message: "Forbidden"});
        }

        const foundUser = await User.findById(decoded.UserInfo.id).exec();

        if (!foundUser) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const accessToken = jwt.sign({
            UserInfo: {
                id: foundUser._id,
                isAdmin: foundUser.isAdmin ? foundUser.isAdmin : false, // added 
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});

        res.json({accessToken});
    });
}

const logout = (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) {
        return res.sendStatus(204);
    }

    res.clearCookie('jwt', {
        // httpOnly: true,
        // sameSite: "None",
        // secure: true
    });

    res.json({message: "cookie cleared"})
}

module.exports = {
    register,
    login,
    refresh,
    logout
}