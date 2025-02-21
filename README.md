# trilium-kanban
A Kanban integration for Trilium Notes

![Demo](screenshots/demo.gif)

## Features

- Change a card of board by drag-and-drop.
- Reorder boards and cards by drag-and-drop.
- Scroll view on drag to side.
- Click on a card to open it.
- Double click on board title to edit it.
- Button to add cards.
- Custom template for Kanban view (easy setup).
- Icons for cards and boards.
- Custom style for cards and boards.

[Demo](screenshots/README.md)

## Installation

1. Download the latest `.zip` release from the [releases page](https://github.com/CyrilLeblanc/trilium-kanban/releases)
2. Import the `.zip` file into Trilium by right-clicking on a note and selecting `Import into note` (With `Safe mode` unchecked).
3. Setup a Kanban view. See [Create a Kanban board](#create-a-kanban-view) for more details.

## Create a Kanban view

### Using the template

- Right-click on a note and select `Insert child note > Kanban View`.

### From scratch

- Create a note of type `Render Note`.
  - Give this note the `template` relation that points to the kanban integration note (`~template=Kanban View`).
  - Give this note the `sorted` label with a value of `sortOrder` (`#sorted=sortOrder`).
- Create a board by creating a sub-note of the main `Render Note` you created above.
- Create an item by creating a sub-note of a board

## Settings

You can customize the Kanban view by editing the `kanban/js/settings` note. \
Here is what you can customize:

- `showCardIcons`: Show icons on cards.
- `showBoardIcons`: Show icons on boards.
- `useCustomColors`: Use custom style for boards and cards.

## Icons

Icons will be shown on cards and boards if the `showCardIcons` and `showBoardIcons` settings are enabled. \
The icon used is defined by the label `#iconClass` (it's the same used by default for notes).

## Custom style

You can customize the style of the cards and boards by adding a `#kanbanStyle` label to the note. \
Here are the available values:

- `#kanbanStyle=primary`: Primary color.
- `#kanbanStyle=secondary`: Secondary color.
- `#kanbanStyle=success`: Success color.
- `#kanbanStyle=error`: Error color.
- `#kanbanStyle=warning`: Warning color.
- `#kanbanStyle=info`: Info color.


## Credits
- [Trilium Notes](https://github.com/zadam/trilium)
- [jKanban](https://github.com/riktar/jkanban)