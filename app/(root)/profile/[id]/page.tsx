import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "@/constants";

async function page({ params }: ParamsWithSearch) {
  const { id } = await params;

  return (
    <div className="wrapper page">
      <Header
        subHeader="mail@mail.com"
        title="Adrian | JS"
        userImg="/assets/images/dummy.jpg"
      />

      <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...card} />
        ))}
      </section>
    </div>
  );
}

export default page;
