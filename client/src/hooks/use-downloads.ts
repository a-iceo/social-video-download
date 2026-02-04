import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type Download, type CreateDownloadRequest } from "@shared/schema";

export function useDownloads() {
  return useQuery({
    queryKey: [api.downloads.list.path],
    queryFn: async () => {
      const res = await fetch(api.downloads.list.path);
      if (!res.ok) throw new Error("Failed to fetch downloads");
      return api.downloads.list.responses[200].parse(await res.json());
    },
  });
}

export function useProcessDownload() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateDownloadRequest) => {
      const validated = api.downloads.process.input.parse(data);
      const res = await fetch(api.downloads.process.path, {
        method: api.downloads.process.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to process download");
      }

      return api.downloads.process.responses[200].parse(await res.json());
    },
    onSuccess: (newDownload) => {
      queryClient.setQueryData<Download[]>([api.downloads.list.path], (old) => {
        return old ? [newDownload, ...old] : [newDownload];
      });
    },
  });
}
