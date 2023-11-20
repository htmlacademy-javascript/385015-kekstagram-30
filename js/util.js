const getRandom = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const debounce = (callback, timeoutDelay = 1000) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const EventOptions = {
  TYPE: {
    CHANGE: 'change',
    CLICK: 'click',
    KEYDOWN: 'keydown',
    SUBMIT: 'submit',
  },
  ACTION: {
    ADD: 'add',
    REMOVE: 'remove',
  },
};

const updateHandlers = (action, handlers) => {
  handlers.forEach((item) => {
    const [evtTarget, evtType, evtCallback] = item;

    if (action === EventOptions.ACTION.ADD) {
      evtTarget.addEventListener(evtType, evtCallback);
    } else {
      evtTarget.removeEventListener(evtType, evtCallback);
    }
  });
};

const addHandlers = (handlers) => {
  updateHandlers(EventOptions.ACTION.ADD, handlers);
};

const removeHandlers = (handlers) => {
  updateHandlers(EventOptions.ACTION.REMOVE, handlers);
};

export { getRandom, debounce, EventOptions, addHandlers, removeHandlers };
