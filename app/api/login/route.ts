import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers"; // ✨ Import the cookies helper

export async function POST(req: Request) {
  try {
    const { roll_number, password } = await req.json();

    if (!roll_number || !password) {
      return NextResponse.json(
        { error: "Required fields missing." },
        { status: 400 },
      );
    }

    const registeredStudent = await prisma.registeredStudent.findUnique({
      where: { roll_number },
    });

    if (!registeredStudent) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      registeredStudent.password,
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 },
      );
    }

    // ✨ Save the roll number into a secure cookie container
    const cookieStore = await cookies();
    cookieStore.set("student_session", registeredStudent.roll_number, {
      httpOnly: true, // Prevents browser JavaScript scripts from hijacking the token
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // Keeps session valid for 24 hours
    });

    return NextResponse.json({ success: true, message: "Login successful!" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
