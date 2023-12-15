const typeIconMap: Record<string, string> = {
  video: 'icon-park-outline-video-file',
  audio: 'icon-park-outline-audio-file',
  image: 'icon-park-outline-file-pdf',
  text: 'icon-park-outline-file-txt',
  application: 'icon-park-outline-file-code',
  unknown: 'icon-park-outline-file-question',
};

function getIconnameByMimetype(mimetype: string) {
  const [type, subtype] = mimetype.split('/');
  return typeIconMap[type] || typeIconMap.unknown;
}

enum MIME {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  TEXT = 'text',
  APPLICATION = 'application',
}

function getIcon(mimetype: string) {
  const [type, subtype] = mimetype.split('/');
  if (type === MIME.IMAGE) {
    return 'icon-file-iimage';
  }
  if (type === MIME.VIDEO) {
    return 'icon-file-ivideo';
  }
  if (type === MIME.TEXT) {
    return 'icon-file-itxt';
  }
  if (type === MIME.AUDIO) {
    return 'icon-file-iaudio';
  }
  if (type === MIME.APPLICATION) {
    if (subtype === 'zip') {
      return 'icon-file-izip';
    }
  }
  return 'icon-file-iunknown';
}

export { getIcon, getIconnameByMimetype };
