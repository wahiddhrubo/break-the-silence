import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

export const useAlbum = (tokenIds) => {
  const { token } = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();

  const [songsDta, setSongsDta] = useState();

  useEffect(() => {
    const setAlbumDta = async () => {
      const songs = await fetchAlbum();
      setSongsDta(songs);
    };
    setAlbumDta();
  }, [isInitialized]);

  const fetchAlbum = async () => {
    const tokens = await token.getAllTokenIds({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      chain: "mumbai",
    });
    console.log(tokens);
    const tokensFilteredById = tokens.result.filter((t) =>
      tokenIds.includes(t.token_id)
    );
    console.log(tokensFilteredById, tokenIds);
    return tokensFilteredById;
  };

  return { fetchAlbum, songsDta };
};
