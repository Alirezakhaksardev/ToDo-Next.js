import connectDB from "utils/connectDB";
import User from "models/Users";
import { hashPassword } from "utils/auth";

export default async function handler(req , res){
    try {
        await connectDB();
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ status: "failed", message: "Error in connecting to DB" });
      }
    
      const { email, password } = req.body;
    
      if (!email || !password) {
        return res.status(422).json({
          status: "failed",
          message: "Invalid data",
        });
      }
    
      const existingUser = await User.findOne({ email: email });
    
      if (existingUser) {
        return res
          .status(422)
          .json({ status: "failed", message: "User exists already!" });
      }
    
      const hashedPassword = await hashPassword(password);
    
      try{
          const newUser = await User.create({ email: email, password: hashedPassword });
          console.log(newUser);
          res.status(201).json({ status: "success", message: "Created user!" });

      }catch(err){
        res.status(500).json({ status: "success", message: "Error in connecting to DB" });
      }
    

}