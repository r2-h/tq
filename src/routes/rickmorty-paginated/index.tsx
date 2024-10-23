import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { rickmortyApi } from "../../modules/rickmorty/api";

type PageParams = {
  page: number;
};

export const Route = createFileRoute("/rickmorty-paginated/")({
  component: RickmortyCharacters,
  validateSearch: (search: Record<string, unknown>): PageParams => {
    return {
      page: Number(search?.page ?? 1),
    };
  },
});

function RickmortyCharacters() {
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { data, error, isPending, isPlaceholderData } = useQuery({
    ...rickmortyApi.getCharacters(page),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-10 ">
      <h1 className="font-bold text-3xl underline mb-10 text-center">Tasks</h1>
      <ul
        className={`flex flex-col gap-5 ${
          isPlaceholderData ? "opacity-30" : ""
        }`}
      >
        {data?.results.map((character) => (
          <Link
            to="/rickmorty-paginated/$id"
            params={{ id: String(character.id) }}
            search={{ page }}
            key={character.id}
          >
            {character.name}
          </Link>
        ))}
      </ul>
      <div className="flex  justify-around p-10">
        <input
          className="border w-fit"
          value={page}
          type={"number"}
          onChange={(e) =>
            navigate({
              search: (prev) => ({ ...prev, page: Number(e.target.value) }),
            })
          }
        />

        <button
          onClick={() =>
            navigate({
              search: (prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }),
            })
          }
          className="shadow-md "
        >
          Previous
        </button>

        <button
          onClick={() =>
            navigate({
              search: (prev) => ({
                ...prev,
                page: Math.min(prev.page + 1, data?.info.pages ?? 100),
              }),
            })
          }
          className="shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}
