import User from '../../../models/user';
import Travel from '../../../models/travel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function createUser(args) {
    try {
        const {
            email,
            username,
            firstname,
            lastname,
            password,
            confirm
        } = args; //retrieve values from arguments

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error('User already exists!');
        }

        if (password !== confirm) {
            throw new Error('Passwords are inconsistent!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            username,
            firstname,
            lastname,
            password: hashedPassword
        }, (err) => { if (err) throw err });

        user.save();

        // if user is registered without errors
        // create a token
        const token = jwt.sign({ id: user._id }, "mysecret", {expiresIn: '24h'});

        return { token, password: null, ...user._doc }
    }
    catch (err) {
        throw err;
    }
}

export async function tokenAuth(args) {
    try {
        const user = await User.findOne({ email: args.email });
        if (!user) throw new Error('Email does not exist');

        const passwordIsValid = await bcrypt.compareSync(args.password, user.password);
        if (!passwordIsValid) throw new Error('Email or Password is invalid');

        const token = jwt.sign({ id: user._id }, "mysecret", {expiresIn: '24h'});

        return { token, password: null, ...user._doc }
    }
    catch (err) {
        throw err;
    }
}

export async function getProfile(args) {
    try {
        const decoded = jwt.verify(args.token, "mysecret");
        const user = await User.findOne({ _id: decoded.id })
        return { ...user._doc, password: null };
    }
    catch (err) {
        throw err;
    }
}

export async function Users(){
    try{
        const users = await User.find({})
            .populate()
            .exec();
            return users.map(user => ({
                _id: user._id.toString(),
                username: user.username,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
              }));
    }
    catch (err) {
        throw err;
    }
};
export async function createTravel(args) {
    try {
        const {
            location,
            time,
            date
        } = args; 
        
        const travel = new Travel({
           location,
           time,
           date,
        }, (err) => { if (err) throw err });

        travel.save();

        return { ...travel._doc }
    }
    catch (err) {
        throw err;
    }
};
export async function Travels(){
    try{
        const travels = await Travel.find({})
            .populate()
            .exec();
            return travels.map(travel => ({
                _id: travel._id.toString(),
                location: travel.location,
                time: travel.time,
                date: travel.date,
              }));
    }
    catch (err) {
        throw err;
    }
};