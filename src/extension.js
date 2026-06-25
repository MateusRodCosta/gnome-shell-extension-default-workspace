// License: GPLv2 or later
// Uses code from No overview extension and Workspace Indicator
// Contributors: @MateusRodCost, @fthx, @fmuellner

import { layoutManager } from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

const DEFAULT_WORKSPACE_KEY = 'default-workspace-number';

export default class DefaultWorkspaceExtension extends Extension {
  enable() {
    this._settings = this.getSettings();

    if (!layoutManager._startingUp) {
      return;
    }

    layoutManager.connectObject('startup-complete',
      () => this._changeWorkspace(), this);
  }

  disable() {
    layoutManager.disconnectObject(this);
    this._settings = null;
  }

  _changeWorkspace() {
    const targetIndex = this._settings.get_int(DEFAULT_WORKSPACE_KEY);
    const targetIndexZeroBased = targetIndex - 1;
    const workspaceManager = global.workspace_manager;

    while (workspaceManager.get_n_workspaces() <= targetIndexZeroBased) {
      workspaceManager.append_new_workspace(false, global.get_current_time());
    }

    const goalWorkspace = workspaceManager.get_workspace_by_index(targetIndexZeroBased);

    if(goalWorkspace){
      goalWorkspace.activate(global.get_current_time());
      console.info(`${this.uuid}: Switched to workspace ${targetIndex} on login`);
    } else {
      console.warn(`${this.uuid}: CRITICAL - Workspace ${targetIndex} failed to instantiate.`);
    }
  }
}