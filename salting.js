const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

users = []

function signup(email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    const user = { email, password: `${salt}:${hashedPassword}` }

    users.push(user);

    return user
}

function login(email, password) {
    const user = users.find(v => v.email === email);
    if (!user) {
        return 'login fail!';
    }
    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);

    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if (match) {
        return 'login success!'
    } else {
        return 'login fail!'
    }
}

signup("serg@gmail.com", "bomba");
console.log(login("serg@gmail.com", "bosmba"));
console.log(login("serg@gmail.com", "bomba"));