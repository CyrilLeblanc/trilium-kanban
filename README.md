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

[Demo](screenshots/README.md)

## Installation

1. Download the latest `.zip` release from the [releases page](https://github.com/CyrilLeblanc/trilium-kanban/releases)
2. Import the `.zip` file into Trilium by right-clicking on a note and selecting `Import into note` (Use default import options).
3. Setup a Kanban view. See [Create a Kanban board](#create-a-kanban-view) for more details.

## Create a Kanban view

### Using the template

- Right-click on a note and select `Insert child note > Kanban View`.

### From scratch

- Create a note of type `Render Note`.
  - Give this note the `renderNote` relation that points to the kanban integration note (`~renderNote=Kanban View`).
  - Give this note the `sorted` label with a value of `sortOrder` (`#sorted=sortOrder`).
- Create a board by creating a sub-note of the main `Render Note` you created above.
- Create an item by creating a sub-note of a board

## Credits
- [Trilium Notes](https://github.com/zadam/trilium)
- [jKanban](https://github.com/riktar/jkanban)
