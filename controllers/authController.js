const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

const readUsers = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const writeUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    let users = readUsers();

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.json({
            success: false,
            message: "User Already Exists"
        });
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password
    };

    users.push(newUser);

    writeUsers(users);

    res.json({
        success: true,
        message: "Signup Successful"
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;

    let users = readUsers();

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        return res.json({
            success: false,
            message: "Invalid Credentials"
        });
    }

    res.json({
        success: true,
        message: "Login Successful",
        user
    });
};

exports.resetPassword = (req, res) => {
    const { email, newPassword } = req.body;

    let users = readUsers();

    const userIndex = users.findIndex(user => user.email === email);

    if (userIndex === -1) {
        return res.json({
            success: false,
            message: "User Not Found"
        });
    }

    users[userIndex].password = newPassword;

    writeUsers(users);

    res.json({
        success: true,
        message: "Password Updated"
    });
};

exports.getUsers = (req, res) => {
    const users = readUsers();
    res.json(users);
};