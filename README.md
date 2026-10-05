# Dice

A GNOME Shell extension that puts a die in the top panel. Click it to roll it
and see the result at a large size. Handy for board games, picking who goes
first or making a quick decision.

## How it works

- The die sits in the top panel and starts on a random number from 1 to 6.
- Click it and a dialog opens with the die at a large size. It tumbles through
  a few faces and lands on a random number.
- In the dialog:
  - **Roll Again**, or the Enter key, rolls the die once more.
  - **Close**, or the Esc key, closes the dialog.
- The die in the panel keeps the last number you rolled.

Every face has the same chance of coming up. A roll can land on the same number
twice in a row, just like a real die.

The die follows the colors of your system theme. If you have **Reduce
Animation** turned on in the accessibility settings, the die shows the result
right away, without tumbling.

The extension is available in **English, Spanish and French**, following your
system language.

## Installation

Requires GNOME Shell 50 and `git`.

```bash
git clone https://github.com/asterion/dice.git \
    ~/.local/share/gnome-shell/extensions/dice@asterion
```

Log out and back in, then enable it:

```bash
gnome-extensions enable dice@asterion
```

## Uninstalling

```bash
gnome-extensions disable dice@asterion
rm -rf ~/.local/share/gnome-shell/extensions/dice@asterion
```

## License

[GPL-2.0-or-later](LICENSE)
