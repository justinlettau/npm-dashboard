interface PackageProps {
  downloads: number;
  name: string;
}

function Package({ name, downloads }: PackageProps) {
  const intl = new Intl.NumberFormat();

  return (
    <a
      href={`https://www.npmjs.com/package/${name}`}
      target="_blank"
      className="border-b flex px-4 py-2 transition-colors hover:bg-gray-100"
    >
      <h2 className="flex-1">{name}</h2>
      <p className="text-lg font-semibold text-blue-600">
        {intl.format(downloads)}
      </p>
    </a>
  );
}

export default Package;
