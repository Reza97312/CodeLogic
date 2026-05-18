let compared = [];
const listeners = new Set();

const notify = () => listeners.forEach((cb) => cb([...compared]));

const subscribe = (cb) => {
  listeners.add(cb);
  cb([...compared]);
  return () => listeners.delete(cb);
};

const toggle = (courseId) => {
  if (compared.includes(courseId)) {
    compared = compared.filter((id) => id !== courseId);
  } else if (compared.length < 2) {
    compared = [...compared, courseId];
  } else {
    compared = [compared[1], courseId];
  }
  notify();
};

const clear = () => {
  compared = [];
  notify();
};

const get = () => [...compared];

export default { subscribe, toggle, clear, get };
