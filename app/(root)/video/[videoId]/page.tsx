// url?page=2&filter=asc -> searchParams
// url/:id 123 -> params

import VideoDetailHeader from "@/components/VideoDetailHeader";
import VideoPlayer from "@/components/VideoPlayer";
import { getVideoById } from "@/lib/actions/video";
import { redirect } from "next/navigation";

async function page({ params }: Params) {
  const { videoId } = await params;

  const { user, video } = await getVideoById(videoId);

  if (!video) redirect("/404");

  return (
    <main className="wrapper page">
      <VideoDetailHeader
        ownerId={user?.id ?? ""}
        {...video}
        userImg={user?.image}
        username={user?.name}
      />
      <section className="video-details">
        <div className="content">
          {/* <VideoPlayer videoId={video.videoId} /> */}
        </div>
      </section>
    </main>
  );
}

export default page;
