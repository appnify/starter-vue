const typeIconMap: Record<string, string> = {
  video: "icon-park-outline-video-file",
  audio: "icon-park-outline-audio-file",
  image: "icon-park-outline-file-pdf",
  text: "icon-park-outline-file-txt",
  application: "icon-park-outline-file-code",
  unknown: "icon-park-outline-file-question",
};

const imageIconMap: Record<string, string> = {
  jpg: "icon-park-outline-file-jpg",
  png: "icon-park-outline-file-jpg",
};

function getIconnameByMimetype(mimetype: string) {
  const [type, subtype] = mimetype.split("/");
  return typeIconMap[type] || typeIconMap.unknown;
}

export { getIconnameByMimetype };
