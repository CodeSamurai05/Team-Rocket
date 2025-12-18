// --- 3. Video Card Component ---
// Yeh component video results ko dikhane ke liye hai.
function VideoCard({ video }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#1e1e1e] rounded-lg overflow-hidden flex transition hover:bg-[#2a2a2a]"
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-32 h-20 object-cover"
        onError={(e) => e.target.src = 'https://placehold.co/128x80/1e1e1e/606060?text=Video'}
      />
      <div className="p-3">
        <h4 className="font-semibold text-gray-100 text-sm">{video.title}</h4>
        <p className="text-xs text-gray-400">{video.source}</p>
      </div>
    </a>
  );
}