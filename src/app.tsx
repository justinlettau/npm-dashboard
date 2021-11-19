import { useEffect, useState } from 'react';

import Package from './components/package';

function App() {
  const params = new URLSearchParams(location.search);
  const names = params.get('q')?.split(',') ?? [];

  const examples = [
    'axios',
    'react,tailwindcss,@vitejs/plugin-react,prettier',
    '@angular/core,react,vue',
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] =
    useState<{ name: string; downloads: number }[]>();

  useEffect(() => {
    setIsLoading(true);

    const requests = names.map((name) =>
      fetch(`https://api.npmjs.org/downloads/point/last-week/${name}`)
        .then((res) => res.json())
        .then((data) => ({
          name: data.package,
          downloads: data.downloads,
        }))
    );

    Promise.all(requests).then((res) => {
      setPackages(res.sort((a, b) => b.downloads - a.downloads));
      setIsLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen container mx-auto flex flex-col">
      <section className="flex-1 p-12">
        {names.length > 0 ? (
          isLoading ? (
            <p>Loading ...</p>
          ) : (
            packages?.map((pkg) => (
              <Package
                key={pkg.name}
                name={pkg.name}
                downloads={pkg.downloads}
              />
            ))
          )
        ) : (
          <div>
            <p className="mb-6">
              Add packages to the query string in the URL to get started 👆
            </p>
            <p>For example:</p>
            <ul className="ml-2">
              {examples.map((x) => (
                <li key={x}>
                  <a
                    href={`${import.meta.env.BASE_URL}?q=${x}`}
                    className="hover:underline"
                  >
                    <code>{`/?q=${x}`}</code>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <footer className="p-12">
        <a
          href="https://github.com/justinlettau/npm-dashboard"
          className="text-gray-500 hover:underline"
        >
          View on GitHub
        </a>
      </footer>
    </main>
  );
}

export default App;
