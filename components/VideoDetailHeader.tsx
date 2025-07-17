"use client";

import { daysAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function VideoDetailHeader({
  id,
  title,
  createdAt,
  userImg,
  username,
  videoId,
  ownerId,
  visibility,
  thumbnailUrl,
}: VideoDetailHeaderProps) {
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    navigator.clipboard.writeText(`${window.location.origin}/video/${id}`);
    setCopied(true);
  }

  useEffect(() => {
    const changeChecked = setTimeout(() => {
      if (copied) setCopied(false);
    }, 2000);

    return () => clearTimeout(changeChecked);
  }, [copied]);

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
            <h2>{username ?? "Guest"}</h2>
          </Link>

          <figcaption>
            <span className="mt-1"> . </span>
            <p>{daysAgo(createdAt)}</p>
          </figcaption>
        </figure>
      </aside>

      <aside className="cta">
        <button onClick={handleCopyLink}>
          <Image
            src={
              copied ? "/assets/images/checked.png" : "/assets/icons/link.svg"
            }
            alt="copy"
            width={24}
            height={24}
          />
        </button>
      </aside>
    </header>
  );
}

export default VideoDetailHeader;
