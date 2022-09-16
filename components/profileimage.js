import Dropzone from "./dropzone.js";
import { useState, useEffect } from "react";
import Image from "next/image";
import { uploadToIpfs } from "../axios/ipfsUpload.js";
import { usePalette } from "react-palette";

export default function ImageUpload({
	ipfsHash,
	setIpfsHash,
	errors,
	setColor,
	setIsLoading,
}) {
	const [imgFiles, setImgFiles] = useState([]);

	const newColor = usePalette(`https://ipfs.io/ipfs/${ipfsHash}`);
	useEffect(() => {
		if (imgFiles == "") {
			return;
		}
		const HandleUpload = async () => {
			const fileImg = imgFiles[0];
			const hash = await uploadToIpfs(fileImg);
			setIpfsHash(hash);
			setImgFiles("");
		};
		HandleUpload();
	}, [imgFiles]);

	useEffect(() => {
		const updateColor = () => {
			if (newColor) {
				setColor(newColor.data.vibrant);
				console.log(newColor);
			}
		};
		updateColor();
	}, [newColor]);

	const [preview, setPreview] = useState([]);
	const onDrop = (files) => {
		setImgFiles(files);
	};

	const acceptedFiles = {
		"image/jpeg": ["jpeg"],
		"image/png": ["png"],
		"image/jpg": ["jpg"],
	};
	console.log(ipfsHash);

	return (
		<div className="w-full rounded-full p-10">
			<Dropzone onDrop={onDrop} accept={acceptedFiles} hash={ipfsHash} />
		</div>
	);
}
