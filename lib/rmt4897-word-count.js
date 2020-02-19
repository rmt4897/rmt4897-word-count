'use babel';

import Rmt4897WordCountView from './rmt4897-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  rmt4897WordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.rmt4897WordCountView = new Rmt4897WordCountView(state.rmt4897WordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.rmt4897WordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rmt4897-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.rmt4897WordCountView.destroy();
  },

  serialize() {
    return {
      rmt4897WordCountViewState: this.rmt4897WordCountView.serialize()
    };
  },

  toggle() {
    //console.log('Rmt4897WordCount was toggled!');
    if (this.modalPanel.isVisible()) {
    this.modalPanel.hide();
  } else {
    const editor = atom.workspace.getActiveTextEditor();
    const words = editor.getText().split(/\s+/).length;
    this.yourNameWordCountView.setCount(words);
    this.modalPanel.show();
    
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
