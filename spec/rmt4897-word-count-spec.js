'use babel';

import Rmt4897WordCount from '../lib/rmt4897-word-count';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Rmt4897WordCount', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('rmt4897-word-count');
  });

  describe('when the rmt4897-word-count:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.rmt4897-word-count')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'rmt4897-word-count:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.rmt4897-word-count')).toExist();

        let rmt4897WordCountElement = workspaceElement.querySelector('.rmt4897-word-count');
        expect(rmt4897WordCountElement).toExist();

        let rmt4897WordCountPanel = atom.workspace.panelForItem(rmt4897WordCountElement);
        expect(rmt4897WordCountPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'rmt4897-word-count:toggle');
        expect(rmt4897WordCountPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.rmt4897-word-count')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'rmt4897-word-count:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let rmt4897WordCountElement = workspaceElement.querySelector('.rmt4897-word-count');
        expect(rmt4897WordCountElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'rmt4897-word-count:toggle');
        expect(rmt4897WordCountElement).not.toBeVisible();
      });
    });
  });
});
