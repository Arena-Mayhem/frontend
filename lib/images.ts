import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { createIcon, renderIcon } from "./blockies";

const atomImages = atomWithStorage(
  "arenam.images",
  {} as Record<string, string>,
);

export const useImageForAddress = ({
  address,
  expectedImageURL,
}: {
  address?: string;
  expectedImageURL?: string;
}) => {
  const [images, setImages] = useAtom(atomImages);
  const [imageURL, setImageURL] = useState<string>();

  const IMAGES_TOTAL_SIZE = Object.keys(images).length;

  useEffect(() => {
    const seedImage = images[address!] || getImageForSeed(address);

    if (seedImage) {
      setImageURL(seedImage);
    }

    if (expectedImageURL) {
      const image = new Image();
      image.src = expectedImageURL;
      image.onerror = () => {
        if (address && seedImage) {
          setImages((prev) => ({
            ...prev,
            [address]: seedImage,
          }));
        }
      };
      image.onload = () => setImageURL(expectedImageURL);
    }
  }, [expectedImageURL, IMAGES_TOTAL_SIZE, address]);

  return {
    imageURL,
  };
};

export function getImageForSeed(seed?: string) {
  if (seed && typeof window !== "undefined") {
    const canvas = document.createElement("canvas");
    renderIcon(
      createIcon({
        seed,
        size: 15, // default: 10
        scale: 3, // default: 5
      }),
      canvas,
    );
    return canvas.toDataURL("base64");
  }

  return null;
}
