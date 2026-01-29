export function NewsCard({ title, description, img }) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={img}
        alt=""
        className="h-32 w-full object-cover"
      />

      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>

        <p className="mt-1 text-sm text-gray-600 flex-1">
          {description}
        </p>

        <button
          type="button"
          className="mt-4 inline-flex items-center self-start rounded-md bg-orange-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default function NewsAnnouncements() {
  const items = [
    {
      title: "Thank You One Hack After Another!",
      description: "Jamie wins best presenter again...",
      img: "/highfive.jpg"
    },
    {
      title: "Summer Hackathon: Registration Now Open",
      description: "We're excited to announce...",
      img: "/signing.jpg"
    },
    {
      title: "Child Protection Refresher Training",
      description: "Major case study...",
      img: "/boredBook.jpg"
    }
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        News & Announcements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <NewsCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
}