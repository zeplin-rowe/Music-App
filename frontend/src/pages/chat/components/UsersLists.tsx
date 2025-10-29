import UsersListsSkeleton from "@/components/skeletons/UsersListsSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";

const UsersLists = () => {
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } =
    useChatStore();
  return (
    <div className="border-r border-zinc-800">
      <div className="flex flex-col h-full">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-2 p-4">
            {isLoading ? (
              <UsersListsSkeleton />
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg cursor-pointer transition-colors 
                    ${
                      selectedUser?.clerkId === user.clerkId
                        ? "bg-zinc-800/50"
                        : "hover:bg-zinc-800/50"
                    }`}
                >
                  <div className="relative">
                    <Avatar className="size-8 md:size-12">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                    {/* online indicator */}
                    <div
                      className={`absolute bottom-0 right-0 size-3  rounded-full ring-2 ring-zinc-900 
                        ${
                          onlineUsers.has(user.clerkId)
                            ? "bg-green-500"
                            : "bg-zinc-500"
                        }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0 lg:black hidden">
                    <span className="font-medium truncate">
                      {user.fullName}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsersLists;
