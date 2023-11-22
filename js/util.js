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

const eventOptions = {
  type: {
    change: 'change',
    click: 'click',
    keydown: 'keydown',
    submit: 'submit',
  },
  action: {
    add: 'add',
    remove: 'remove',
  },
};

const updateHandlers = (action, handlers) => {
  handlers.forEach((item) => {
    const [evtTarget, evtType, evtCallback] = item;

    if (action === eventOptions.action.add) {
      evtTarget.addEventListener(evtType, evtCallback);
    } else {
      evtTarget.removeEventListener(evtType, evtCallback);
    }
  });
};

const addHandlers = (handlers) => {
  updateHandlers(eventOptions.action.add, handlers);
};

const removeHandlers = (handlers) => {
  updateHandlers(eventOptions.action.remove, handlers);
};

export { getRandom, debounce, eventOptions, addHandlers, removeHandlers };
