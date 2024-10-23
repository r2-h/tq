import { createFileRoute } from "@tanstack/react-router";
import { CharacterDto, rickmortyApi } from "../../modules/rickmorty/api";

type PageParams = {
  page: number;
};

async function getCharacter(id: string): Promise<CharacterDto | undefined> {
  const data = rickmortyApi.getCharacter(id);
  return data;
}

export const Route = createFileRoute("/rickmorty-paginated/$id")({
  component: RickmortyCharacter,
  validateSearch: (search: Record<string, unknown>): PageParams => {
    return {
      page: Number(search?.page ?? 1),
    };
  },
  loader: ({ params }) => getCharacter(params.id),
  errorComponent: ({ error }) => <div>404 {error.message}</div>,
});

function RickmortyCharacter() {
  const { id } = Route.useParams();
  const data = Route.useLoaderData();
  const { page } = Route.useSearch();

  return (
    <div className="p-10">
      <h1 className="font-bold text-center text-xl">
        Rick and Morty character
      </h1>
      <p>current id = {id}</p>
      <p>current query page = {page}</p>
      <p>Name: = {data?.name}</p>
    </div>
  );
}
