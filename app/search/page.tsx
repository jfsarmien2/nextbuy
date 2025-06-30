type SearchPageProps = {
    searchParams: Promise<{ query?: string; sort?: string }>;
};

async function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div>SearchPage</div>
  )
}

export default SearchPage