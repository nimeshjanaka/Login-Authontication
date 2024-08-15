import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbConnect(); // Ensure the database is connected
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    }); // Use the User model properly
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
