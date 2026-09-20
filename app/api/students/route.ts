import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  const students = await prisma.student.findMany();
  return NextResponse.json({ students });
}

export async function POST(req: Request) {
  try {
    const { roll_number, password, dob, course } = await req.json();

    if (!roll_number || !password || !dob || !course) {
      return NextResponse.json(
        {
          error:
            "All registration fields (ID, DOB, Course, Password) are required.",
        },
        { status: 400 },
      );
    }

    const studentExists = await prisma.student.findUnique({
      where: { roll_number },
    });

    if (!studentExists) {
      return NextResponse.json(
        {
          error:
            "Roll number not found in college database. Registration denied.",
        },
        { status: 404 },
      );
    }

    const recordDobString = new Date(studentExists.dob)
      .toISOString()
      .split("T")[0];
    const inputDobString = new Date(dob).toISOString().split("T")[0];

    if (recordDobString !== inputDobString) {
      return NextResponse.json(
        {
          error: "Provided Date of Birth does not match our official records.",
        },
        { status: 400 },
      );
    }

    if (
      studentExists.programme.trim().toLowerCase() !==
      course.trim().toLowerCase()
    ) {
      return NextResponse.json(
        {
          error: "Provided Course choice does not match our official records.",
        },
        { status: 400 },
      );
    }

    const alreadyRegistered = await prisma.registeredStudent.findUnique({
      where: { roll_number },
    });

    if (alreadyRegistered) {
      return NextResponse.json(
        {
          error: "This student is already registered. Try logging in instead.",
        },
        { status: 400 },
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.registeredStudent.create({
      data: {
        roll_number,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Student successfully registered!",
    });
  } catch (e) {
    console.error("Registration Error:", e);
    return NextResponse.json(
      { error: "Internal server error during registration" },
      { status: 500 },
    );
  }
}
