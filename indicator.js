// SPDX-License-Identifier: GPL-2.0-or-later
//
// Generated with AI for personal use.
// Do NOT upload to extensions.gnome.org (EGO) unless you understand JavaScript
// and can maintain this code.

import Clutter from 'gi://Clutter';
import Gio from 'gi://Gio';
import GObject from 'gi://GObject';
import St from 'gi://St';

import {gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

import {DiceDialog} from './dialog.js';
import {FACES, rollDie} from './dice.js';

export const DiceIndicator = GObject.registerClass(
class DiceIndicator extends PanelMenu.Button {
    _init(name, iconsDir) {
        super._init(0.0, name, true);

        this._faceIcons = Array.from({length: FACES},
            (_v, i) => new Gio.FileIcon({file: iconsDir.get_child(`die-${i + 1}-symbolic.svg`)}));
        this._dialog = null;

        this._icon = new St.Icon({style_class: 'system-status-icon'});
        this.add_child(this._icon);

        this._showFace(rollDie());
    }

    vfunc_event(event) {
        const type = event.type();
        if (type === Clutter.EventType.BUTTON_PRESS || type === Clutter.EventType.TOUCH_BEGIN)
            this._openDialog();

        return Clutter.EVENT_PROPAGATE;
    }

    // Open the large die and roll it; the panel follows every roll
    _openDialog() {
        if (this._dialog)
            return;

        // The dialog destroys itself when closed
        this._dialog = new DiceDialog(this._faceIcons, this._face, face => this._showFace(face));
        this._dialog.connectObject('destroy', () => (this._dialog = null), this);
        this._dialog.open();
        this._dialog.roll();
    }

    _showFace(face) {
        this._face = face;
        this._icon.gicon = this._faceIcons[face - 1];
        // Translators: read by screen readers; %d is the number the die shows, 1 to 6
        this.accessible_name = _('Die showing %d').format(face);
    }

    destroy() {
        // The dialog lives outside the panel, so it is not destroyed along with the indicator
        if (this._dialog)
            this._dialog.destroy();

        this._icon = null;
        this._faceIcons = null;

        super.destroy();
    }
});
