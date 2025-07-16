import Image from "next/image";
import Link from "next/link";

function VideoDetailHeader({
  title,
  createdAt,
  userImg,
  username,
  videoId,
  ownerId,
  visibility,
  thumbnailUrl,
}: VideoDetailHeaderProps) {
  return (
    <header className="detail-header">
      <aside className="user-info">
        <h1>{title}</h1>
        <figure>
          <Link href={`/profile/${ownerId}`}>
            <Image
              src={userImg || "/assets/images/dummy.jpg"}
              alt="User"
              width={24}
              height={24}
              className="rounded-full"
            />
          </Link>
        </figure>
      </aside>
    </header>
  );
}

export default VideoDetailHeader;
