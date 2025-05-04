import Link from 'next/link';

async function getActivities() {
  // This runs on the server
  console.error(`Fetching from ${process.env.NEXT_PUBLIC_API_URL}/activities`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function ActivitiesPage() {
  // Server-side rendering with data fetching
  const activities = await getActivities().catch((error) => {
    console.error('Error fetching activities:', error);
    return { activities: [] };
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Activities</h1>

      {activities?.length > 0 ? (
        <ul className="space-y-4">
          {activities.map((activity: { id: string; name: string }) => (
            <li
              key={activity.id}
              className="p-4 border border-gray-200 rounded-md"
            >
              <h2 className="text-xl font-semibold">{activity.name}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities found or could not connect to API.</p>
      )}

      <div className="mt-8">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
