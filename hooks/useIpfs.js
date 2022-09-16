export const useIPFS = (url) => {
  if (!url || !url.includes("ipfs://")) return url;
  const link = url.replace("ipfs://", "https://ipfs.io/ipfs/");
  return link;
};
