import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getCommunity, updateCommunity } from "@/lib/community.functions";
import { CommunityAction } from "@/lib/community-schema";
export const communityOptions = queryOptions({ queryKey: ["community"], queryFn: () => getCommunity() });
export function useCommunity() {
  const query = useSuspenseQuery(communityOptions);
  const client = useQueryClient();
  const update = useServerFn(updateCommunity);
  const mutation = useMutation({ mutationFn: (data: z.infer<typeof CommunityAction>) => update({ data }), onSuccess: async () => { await client.invalidateQueries({ queryKey: ["community"] }); } });
  return { ...query, mutation };
}