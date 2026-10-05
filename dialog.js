// SPDX-License-Identifier: GPL-2.0-or-later
//
// Generated with AI for personal use.
// Do NOT upload to extensions.gnome.org (EGO) unless you understand JavaScript
// and can maintain this code.

import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import GObject from 'gi://GObject';
import St from 'gi://St';

import {gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as ModalDialog from 'resource:///org/gnome/shell/ui/modalDialog.js';

import {FACES, rollDie} from './dice.js';

// 9 × the 16px grid of the icons
const DIE_SIZE = 144;
// A roll flickers through a few faces before it settles, so it is visible
// even when the die lands on the same number again
const TUMBLE_STEPS = 8;
const TUMBLE_STEP_MS = 70;

// Shows the die at a large size and rolls it; onRolled(face) reports where each roll lands
export const DiceDialog = GObject.registerClass(
class DiceDialog extends ModalDialog.ModalDialog {
    _init(faceIcons, face, onRolled) {
        super._init({styleClass: 'dice-dialog'});

        this._faceIcons = faceIcons;
        this._face = face;
        this._onRolled = onRolled;
        this._timeoutId = 0;

        this._die = new St.Icon({
            gicon: faceIcons[face - 1],
            icon_size: DIE_SIZE,
            x_align: Clutter.ActorAlign.CENTER,
        });
        this.contentLayout.add_child(this._die);

        this.addButton({
            label: _('Close'),
            action: () => this.close(),
            key: Clutter.KEY_Escape,
        });
        this.addButton({
            label: _('Roll Again'),
            action: () => this.roll(),
            default: true,
        });
    }

    roll() {
        if (this._timeoutId)
            GLib.Source.remove(this._timeoutId);
        this._timeoutId = 0;

        // Respect the "Reduce Animation" accessibility setting
        if (!St.Settings.get().enable_animations) {
            this._settle();
            return;
        }

        let step = 0;
        this._timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, TUMBLE_STEP_MS, () => {
            step++;
            if (step < TUMBLE_STEPS) {
                this._die.gicon = this._faceIcons[(this._face + step - 1) % FACES];
                return GLib.SOURCE_CONTINUE;
            }

            this._timeoutId = 0;
            this._settle();
            return GLib.SOURCE_REMOVE;
        });
    }

    _settle() {
        this._face = rollDie();
        this._die.gicon = this._faceIcons[this._face - 1];
        this._onRolled(this._face);
    }

    destroy() {
        if (this._timeoutId)
            GLib.Source.remove(this._timeoutId);
        this._timeoutId = 0;

        // Destroying an open dialog would otherwise leave the screen grabbed
        this.popModal();

        this._die = null;
        this._faceIcons = null;
        this._onRolled = null;

        super.destroy();
    }
});
