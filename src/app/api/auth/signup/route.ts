import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";

export async function POST(req : Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Please enter valid information" },
        { status: 422 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "This account exists" },
        { status: 422 }
      );
    }

    const hasshedPassword = await hashPassword(password);

    const newUser = await User.create({
      email: email,
      password: hasshedPassword,
    });

    console.log(newUser);

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "A problem has occurred on the server" },
      { status: 500 }
    );
  }
}
