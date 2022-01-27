// License: GPLv2 or later
// Uses code from No overview extension and Workspace Indicator
// Contributors: @MateusRodCost, @fthx, @fmuellner

const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const DEFAULT_WORKSPACE_SCHEMA = 'org.gnome.shell.extensions.default-workspace';
const DEFAULT_WORKSPACE_KEY = 'default-workspace-number';

class Extension {

    constructor() {
      this.handlerStartup = null;
    }

    enable() {
      // The following is based on code from No overview at startup extension
      // That will guarantee gnome-shell doesn't crash
      if (!Main.layoutManager._startingUp) {
        return;
      }
      this.handlerStartup = Main.layoutManager.connect('startup-complete', () => {
        let ws = settings.get_int(DEFAULT_WORKSPACE_KEY);
        this._changeWorkspace(ws -1);
      });
    }

    disable() {
      if(this.handlerStartup) {
        Main.layoutManager.disconnect(this.handlerStartup);
        this.handlerStartup = null;
      }
    }

    // This is based on code from Workspace Indicator
    // This will guarantee the workspace in the most correct way
    _changeWorkspace(index) {
      let workspaceManager = global.workspace_manager;

      if (index >= 0 && index < workspaceManager.n_workspaces) {
        let metaWorkspace = workspaceManager.get_workspace_by_index(index);
        if(metaWorkspace) {
          metaWorkspace.activate(global.get_current_time());
        }
      } else {
        log('Unable to switch to a invalid workspace')
      }

    }
}

function init() {
  this.settings = ExtensionUtils.getSettings(DEFAULT_WORKSPACE_SCHEMA);
  return new Extension();
}
