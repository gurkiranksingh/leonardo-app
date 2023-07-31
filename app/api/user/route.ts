import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

//Handle updating a user's title/username
export async function PUT(req: Request) {
  const { email, title, username } = await req.json();
  try {
    //Need to find the user first as we don't have the userId and cannot perform prisma.user.update without both fields
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (user) {
      const results = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: { title, username },
      });

      return NextResponse.json({ status: 200 });
    } else return NextResponse.json({ status: 400 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ status: 500, message: e.toString() });
  }
}
//Handle getting a user's title/username
export async function POST(req: Request) {
  const { email } = await req.json();
  try {
    //Need to find the user first as we don't have the userId and cannot perform prisma.user.update without both fields
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (user) {
      return NextResponse.json({ status: 200, ...user });
    } else return NextResponse.json({ status: 400 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ status: 500, message: e.toString() });
  }
}
