import Head from "next/head";
import Image from "next/image";
import { BreakTheSilenceContext } from "../context/BreakTheSilenceContext.js";
import { useState, useEffect, useContext } from "react";
import Slider from "../components/sliderComp.js";
import SongDiv from "../components/homeSong.js";
import Card from "../components/card.js";
import Loader from "../components/loader.js";

export default function Home() {
  const [albums, setAlbums] = useState();
  const [latestAlbums, setLatestAlbums] = useState();
  const [songs, setSongs] = useState();
  const [loading, setLoading] = useState();
  const { getFeaturedAlbum, fetchLatestSong, getLatestAlbum } = useContext(
    BreakTheSilenceContext
  );

  useEffect(() => {
    const fetchAlbumsAndSongs = async () => {
      setLoading(true);
      const newAlbums = await getFeaturedAlbum();
      const newSongs = await fetchLatestSong();
      const newAlbumsLatest = await getLatestAlbum();
      setSongs(newSongs);
      setAlbums(newAlbums);
      setLatestAlbums(newAlbumsLatest);
      setLoading(false);
    };
    fetchAlbumsAndSongs();
  }, []);

  const styles = {
    Wrapper:
      "text-center  text-4xl font-semibold lg:w-[900px] w-[350px] mx-auto",
    albumDiv: "py-20",
    Header: "lg:flex text-left gap-[90px] mx-auto  h-[650px] ",
    title:
      "lg:text-5xl lg:text-left mt-[50px] text-center text-2xl lg:w-[500px] !leading-[1.5] lg:my-auto font-semibold",
    slider: "lg:w-[450px] mx-auto ",
    songsDiv: "text-center text-4xl font-semibold ",
    latestAlbums:
      "lg:mr-auto text-center text-4xl font-semibold justify-between lg:w-full lg:ml-[50px] text-center text-lg font-normal mx-auto h-min-screen  flex flex-wrap lg:gap-20 gap-2 mx-auto  mt-[80px] ",
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Head>
            <title>Break The Silence</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="bg-[#000e10] w-full">
            <div className={styles.Wrapper}>
              <div className={styles.Header}>
                <div className={styles.title}>
                  Discover The Noice In Silence & The Silence In Noice
                </div>
                <div className={styles.slider}>
                  {albums && <Slider divs={albums} />}
                </div>
              </div>
              <div className="py-20">Latest Songs</div>
              <div className={styles.songsDiv}>
                <div>
                  {songs &&
                    songs.map((s) => (
                      <SongDiv
                        key={songs.indexOf(s) + 1}
                        id={s.id}
                        title={s.metadata.name}
                        index={songs.indexOf(s) + 1}
                        singer={s.metadata.singer}
                        audio={s.metadata}
                        dateAdded={s.metadata.year}
                      />
                    ))}
                </div>
              </div>
              <div className={styles.albumDiv}>
                Latest Albums
                <div className={styles.latestAlbums}>
                  {latestAlbums &&
                    latestAlbums.map((a) => (
                      <div key={a.attributes.ipfs}>
                        <Card
                          img={a.attributes.image}
                          title={a.attributes.title}
                          singer={a.attributes.singer}
                          year={a.attributes.year}
                          id={a.id}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}{" "}
    </div>
  );
}
