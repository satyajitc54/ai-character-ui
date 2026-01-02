export default function VideoBackground({ src }) {
  return (
    <video
      className="video-bg"
      src={src}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}
