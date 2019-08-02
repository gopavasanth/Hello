import User from '../../../models/user';
import Travel from '../../../models/travel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Chat from '../../../models/message';
import nodemailer from 'nodemailer';

export async function createUser(args) {
    try {
        const {
            email,
            username,
            firstname,
            lastname,
            password,
            confirm,
            imageUrl
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
            password: hashedPassword,
            imageUrl
        }, (err) => { if (err) throw err });

        user.save();

        // if user is registered without errors
        // create a token
        const token = jwt.sign({ id: user._id }, "mysecret", {expiresIn: '24h'});

        // let transporter = nodemailer.createTransport({
        //     host: 'smtp.gmail.com',
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: '@gmail.com',
        //         pass: 'password'
        //     }
        // });
        // let mailOptions = {
        //     to: args.email,
        //     subject: 'Welcome to Hello :)',
        //     text: 'Hello, Login with Hello Password:' + hashedPassword + 'Reset password'
        // };
        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return console.log(error);
        //     }
        //     console.log('Message %s sent: %s', info.messageId, info.response);
        // });

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

export async function updateProfile(args){
    try{
        const decoded = jwt.verify(args.token, "mysecret");
        User.findByIdAndUpdate(
            decoded.id,
            { username: args.username, firstname: args.firstname, lastname: args.lastname },
            { new: true }
        )
        return {token, password: null, ...user.doc }
    }
    catch(err){
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
            token,
            from,
            to,
            // time,
            // date,
        } = args;

        const decoded = jwt.verify(args.token, "mysecret");
        const user = await User.findOne({_id: decoded.id})
        if(user){
            const travel = new Travel({
                users: user.id,
                from,
                to,
                // time,
                // date,
            }, (err) => { if (err) throw err });

            travel.save();

            user.travelDetails.push(travel);
            await user.save();

            return { ...travel._doc }
        }
    }
    catch (err) {
        throw err;
    }
};
export async function Travels(args){
    try{
        const {
            token
        } = args;

        const decoded = jwt.verify(args.token, "mysecret");
        const user = await User.findOne({_id: decoded.id})

        if(user){
            const travels = await Travel.find({})
            .populate()
            .exec();
            return travels.map(travel => ({
                _id: travel._id.toString(),
                from: travel.from,
                to: travel.to,
                users: travel.users.toString()
              }));
        }
    }
    catch (err) {
        throw err;
    }
};

export async function createChat(args) {
    try {
        const {
            token,
            message,
        } = args;

        const decoded = jwt.verify(args.token, "mysecret");
        const user = await User.findOne({_id: decoded.id});

        if (user) {
            const chatMessage = new Chat({
                users: user.id,
                message,
            }, (err) => {
                if (err) throw err
            });

            chatMessage.save();

            user.message.push(chatMessage);
            await user.save();

            return { ...chatMessage._doc , ...user._doc}

        }

    }
    catch (err) {
        throw err;
    }
}

export async function getMyTravels(args) {
    try {
        const decoded = jwt.verify(args.token, "mysecret");
        const traveldetails = await Travel.find({ users:decoded.id })
        return traveldetails.map(travel =>({
            _id: travel.id.toString(),
            from: travel.from,
            to: travel.to,
        }));
    }
    catch (err) {
        throw err;
    }
}