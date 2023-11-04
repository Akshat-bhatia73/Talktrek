import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentuser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;

    if (!currentuser?.id || !currentuser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentuser.id,
      },
      data: {
        name: name,
        image: image,
      },
    });

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.log(error, "Settings_Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
