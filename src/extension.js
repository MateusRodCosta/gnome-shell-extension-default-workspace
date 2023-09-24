// License: GPLv2 or later
// Uses code from No overview extension and Workspace Indicator
// Contributors: @MateusRodCost, @fthx, @fmuellner

import {layoutManager} from 'resource:///org/gnome/shell/ui/main.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const DEFAULT_WORKSPACE_KEY = 'default-workspace-number';

export default class DefaultWorkspaceExtension extends Extension {
  enable() {
    this._settings = this.getSettings();
    let defaultWorkspace = this._settings.get_int(DEFAULT_WORKSPACE_KEY);

    if (!layoutManager._startingUp) {
      return;
    }

    this._startupHandler = layoutManager.connect('startup-complete', () => {
      this._changeWorkspace(defaultWorkspace);
    });
  }

  disable() {
    if (this._startupHandler) {
      layoutManager.disconnect(this.handlerStartup);
      this._startupHandler = null;
    }
    this._settings = null;
  }

  _changeWorkspace(index) {
    let workspaceManager = global.workspace_manager;
    let goalWorkspace = workspaceManager.get_workspace_by_index(index - 1);

    if(goalWorkspace){
      goalWorkspace.activate(global.get_current_time());
      console.info(`${this.uuid}: Switched to workspace ${index} on login`);
    } else {
      console.warn(`${this.uuid}: Unable to switch to a invalid workspace (chosen workspace was ${index})`);
    }
  }
}