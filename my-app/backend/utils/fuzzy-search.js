import Fuse from "fuse.js";

const FUSE_OPTIONS = {
  isCaseSensitive: false,
  shouldSort: true,
  threshold: 0.4,
};

export const fuzzySearch = (list, keys = []) => {
  const fuse = new Fuse(list, { ...FUSE_OPTIONS, keys });
  return (pattern) => fuse.search(pattern);
};
