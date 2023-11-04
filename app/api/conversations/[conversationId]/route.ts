import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const exixstingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!exixstingConversation) {
      return new NextResponse("Conversation not found", { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.log(error, "Error_Conversation_Delete");
    return new NextResponse("Internal Error", { status: 500 });
  }
}