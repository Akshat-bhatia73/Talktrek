import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import Body from "@/components/conversations/conversationId/Body";
import Form from "@/components/conversations/conversationId/Form";
import Header from "@/components/conversations/conversationId/Header";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="text-neutral-100 lg:pl-80 h-full">
      <div className="h-full lg:bg-neutral-800 flex flex-col lg:rounded-3xl overflow-hidden">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
