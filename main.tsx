import { z } from "zod";
import { AbsoluteFill, staticFile, Video } from "remotion";
import React from "react";

// Define the schema for cropSizes
const cropSizesSchema = z.object({
  gameFeedX: z.number(),
  gameFeedY: z.number(),
  gameFeedWidth: z.number(),
  gameFeedHeight: z.number(),
  facecamX: z.number(),
  facecamY: z.number(),
  facecamWidth: z.number(),
  facecamHeight: z.number(),
});

// Define the props schema using Zod
const propsSchema = z.object({
  cropStyle: z.string(),
  cropSizes: cropSizesSchema,
});

type Props = z.infer<typeof propsSchema>;

const containerStyle = {
  position: 'relative',
  width: '1080px',
  height: '1920px',
  overflow: 'hidden',
};

const getBlurredStyle = () => ({
  filter: 'blur(20px)',
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100%',
  height: '100%',
  transform: 'translate(-50%, -50%) scale(1.2)',
  objectFit: 'cover',
  zIndex: 1,
});

const getMainVideoStyle = (cropSizes) => ({
  position: 'absolute',
  top: cropSizes.gameFeedY,
  left: cropSizes.gameFeedX,
  width: cropSizes.gameFeedWidth,
  height: cropSizes.gameFeedHeight,
  objectFit: 'cover',
  zIndex: 2,
});

export const Main1: React.FC<Props> = ({ cropStyle, cropSizes }) => {
  const blurStyle = getBlurredStyle();
  const MainVideoStyle = getMainVideoStyle(cropSizes);

  return (
    <AbsoluteFill className="bg-white" style={containerStyle}>
      {cropStyle === "blurred" && (
        <>
          <div className="w-full">
            <Video src={staticFile("video2.mp4")} style={MainVideoStyle} />
          </div>
          <Video src={staticFile("video2.mp4")} style={blurStyle} />
        </>
      )}
    </AbsoluteFill>
  );
};
