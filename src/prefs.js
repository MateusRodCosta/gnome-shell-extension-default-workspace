import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

const DEFAULT_WORKSPACE_KEY = 'default-workspace-number';

export default class DefaultWorkspacePreferences extends ExtensionPreferences {

  fillPreferencesWindow(window) {
    let settings = this.getSettings();

    let builder = new Gtk.Builder();

    builder.add_from_file(`${this.path}/ui/prefs.ui`);

    let spin_row = builder.get_object('default_workspace_spinrow');
    if (spin_row) {
      settings.bind(
        DEFAULT_WORKSPACE_KEY,
        spin_row,
        'value',
        Gio.SettingsBindFlags.DEFAULT
      );
    }

    let page = builder.get_object('preferences_main_page');
    window.add(page);
  }
}
