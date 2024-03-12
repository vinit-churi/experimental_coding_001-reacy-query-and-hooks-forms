"use client";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Page = () => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["test"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      ),
  });

  const mutation = useMutation({
    mutationFn: (text: string) =>
      fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["test"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <button
        onClick={() => {
          mutation.mutate("text");
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        click
      </button>
      <h1>Experimental-query-01</h1>
      <p>{data?.name}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Page;
