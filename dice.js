// SPDX-License-Identifier: GPL-2.0-or-later
//
// Generated with AI for personal use.
// Do NOT upload to extensions.gnome.org (EGO) unless you understand JavaScript
// and can maintain this code.

export const FACES = 6;

/**
 * Roll the die.
 *
 * @returns {number} a random face, 1 to FACES
 */
export function rollDie() {
    return 1 + Math.floor(Math.random() * FACES);
}
