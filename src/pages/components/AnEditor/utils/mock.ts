export const sleep = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

interface MockParams {
  page: number;
  size: number;
}

export const mockLoad = async (params: MockParams) => {
  const { page, size } = params;
  const counts = Array(15).fill(9);
  const data = counts.map((v, i) => {
    return {
      id: (page - 1) * size + i,
      title: "图片1",
      url: `https://source.unsplash.com/random?sig=${(page - 1) * size + i}`,
    };
  });
  return {
    data,
    total: 100,
  };
};
