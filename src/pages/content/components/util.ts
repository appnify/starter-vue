const typeIconMap: Record<string, string> = {
  video: 'i-icon-park-outline-video-file',
  audio: 'i-icon-park-outline-audio-file',
  image: 'i-icon-park-outline-file-pdf',
  text: 'i-icon-park-outline-file-txt',
  application: 'i-icon-park-outline-file-code',
  unknown: 'i-icon-park-outline-file-question',
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

function getFmtIcon(mimetype: string) {
  const [type, subtype] = mimetype.split('/');
  if (type === MIME.IMAGE) {
    return 'icon-fmt-png';
  }
  if (type === MIME.VIDEO) {
    return 'icon-fmt-video';
  }
  if (type === MIME.TEXT) {
    return 'icon-fmt-txt';
  }
  if (type === MIME.AUDIO) {
    return 'icon-fmt-mp3';
  }
  if (type === MIME.APPLICATION) {
    if (subtype === 'zip') {
      return 'icon-fmt-zip';
    }
  }
  return 'icon-fmt-visio';
}

function getFileIcon(mimetype: string) {
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

function getIcon(mimetype: string) {
  return getFmtIcon(mimetype)
}

export { getIcon, getIconnameByMimetype };
