const typeIconMap: Record<string, string> = {
  video: "icon-park-outline-video-file",
  audio: "icon-park-outline-audio-file",
  image: "icon-park-outline-file-pdf",
  text: "icon-park-outline-file-txt",
  application: "icon-park-outline-file-code",
  unknown: "icon-park-outline-file-question",
};

function getIconnameByMimetype(mimetype: string) {
  const [type, subtype] = mimetype.split("/");
  return typeIconMap[type] || typeIconMap.unknown;
}

function getIcon(mimetype: string) {
  if (mimetype.startsWith("image")) {
    return "icon-fmt-png";
  }
  if (mimetype.startsWith("video")) {
    return "icon-fmt-video";
  }
  if (mimetype.startsWith("text")) {
    return "icon-fmt-txt";
  }
  if (mimetype.startsWith("audio")) {
    return "icon-fmt-mp";
  }
  return "icon-fmt-visio";
}

export { getIcon, getIconnameByMimetype };

