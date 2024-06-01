import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

const DEFAULT_WORKSPACE_KEY = 'default-workspace-number';

export default class DefaultWorkspacePreferences extends ExtensionPreferences {

  fillPreferencesWindow(window) {
    let settings = this.getSettings();

    const page = new Adw.PreferencesPage({
      title: _('Default Workspace'),
      icon_name: 'dialog-information-symbolic',
    });
    window.add(page);

    const group = new Adw.PreferencesGroup({
      title: _('Workspace'),
    });
    page.add(group);

    const spin_row = new Adw.SpinRow({
      title: _('Default Workspace'),
    });
    group.add(spin_row);

    const adjustment = new Gtk.Adjustment({
      lower: 1.0,
      page_increment: 1.0,
      page_size: 1.0,
      step_increment: 1.0,
      upper: 37.0,
      lower: 1.0,
    });
    spin_row.set_adjustment(adjustment);

    settings.bind(
      DEFAULT_WORKSPACE_KEY,
      spin_row,
      'value',
      Gio.SettingsBindFlags.DEFAULT
    );

    window.add(page);
  }
}
