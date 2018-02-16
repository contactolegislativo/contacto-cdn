
export function activity(action, type ) {
  gtag(action, 'UA-92111911-1', { method: type });
}

export function lead(action, destiny ) {
  gtag(action, 'UA-92111911-1', { destiny: destiny });
}
