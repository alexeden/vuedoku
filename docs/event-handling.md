# [Event handling](https://vuejs.org/v2/guide/events.html)

## Methods used as event handlers

- The original DOM event can be passed to a handler using the `$event` template variable

## Built-in event modifiers

Based on event:

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`

Based on key codes:

- `.enter`
- `.tab`
- `.delete` (captures both “Delete” and “Backspace” keys)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

Based on key modifiers:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta` (⌘ on mac, ⊞ on windows)

Based on mouse input:

- `.left`
- `.right`
- `.middle`
