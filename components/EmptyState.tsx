const EmptyState = () => {
  return (
    <div
      className="
        px-4 py-10 sm:px-6 lg:px-8
        h-full
        flex items-center justify-center
        bg-neutral-800
        rounded-3xl
      "
    >
      <div
        className="
          text-center flex flex-col items-center
        "
      >
        <h3
          className="
            mt-2
            text-lg font-semibold text-neutral-300 animate-pop
          "
        >
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
