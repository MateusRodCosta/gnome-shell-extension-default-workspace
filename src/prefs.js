import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

const DEFAULT_WORKSPACE_KEY = 'default-workspace-number';

export default class DefaultWorkspacePreferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    const settings = this.getSettings();

    const page = new Adw.PreferencesPage({
      title: _('Behavior'),
      icon_name: 'preferences-desktop-workspaces-symbolic',
    });

    const group = new Adw.PreferencesGroup();
    page.add(group);

    const spinRow = new Adw.SpinRow({
      title: _('Default Workspace'),
      subtitle: _('The workspace index to focus upon login.'),
      adjustment: new Gtk.Adjustment({
        lower: 1.0,
        upper: 36.0,
        step_increment: 1.0,
        page_increment: 1.0,
        page_size: 0.0,
      })
    });
    group.add(spinRow);

    settings.bind(
      DEFAULT_WORKSPACE_KEY,
      spinRow,
      'value',
      Gio.SettingsBindFlags.DEFAULT
    );

    window.add(page);
  }
}
