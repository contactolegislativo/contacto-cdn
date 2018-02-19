
export function activity(action, type ) {
  gtag('event', action, { method: type });
}

export function lead(action, destiny ) {
  gtag('event', action, { destiny: destiny });
}
