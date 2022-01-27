const {GObject, Gtk, Gio} = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const DEFAULT_WORKSPACE_SCHEMA = 'org.gnome.shell.extensions.default-workspace';
const DEFAULT_WORKSPACE_KEY = 'default-workspace-number';

const DefaultWorkspaceBuilderScope = GObject.registerClass({
    Implements: [Gtk.BuilderScope],
}, class DefaultWorkspaceBuilderScope extends GObject.Object {

  vfunc_create_closure(builder, handlerName, flags, connectObject) {
    if (flags & Gtk.BuilderClosureFlags.SWAPPED)
      throw new Error('Unsupported template signal flag "swapped"');

    if (typeof this[handlerName] === 'undefined')
      throw new Error(`${handlerName} is undefined`);

    return this[handlerName].bind(connectObject || this);
  }

});

function init () {}

function buildPrefsWidget () {

  this.settings = ExtensionUtils.getSettings(DEFAULT_WORKSPACE_SCHEMA);

  let builder = new Gtk.Builder();

  builder.set_scope(new DefaultWorkspaceBuilderScope());
  builder.set_translation_domain('gettext-domain');
  builder.add_from_file(Me.dir.get_path() + '/ui/prefs.ui');

  let sb = builder.get_object('default_workspace_spinbutton');
  if(sb) {
    this.settings.bind(
      DEFAULT_WORKSPACE_KEY,
      sb,
      'value',
      Gio.SettingsBindFlags.DEFAULT
    );
  }

  return builder.get_object('box');
}
