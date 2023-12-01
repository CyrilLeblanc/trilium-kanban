# trilium-kanban
A Kanban integration for Trilium Notes

![Demo](screenshots/demo.gif)

## Installation

1. Download the latest `.zip` release from the [releases page](https://github.com/CyrilLeblanc/trilium-kanban/releases)
2. Import the `.zip` file into Trilium by right-clicking on a note and selecting `Import into note` (Use default import options).
3. Setup a Kanban board. See [Create a Kanban board](#create-a-kanban-board) for more details.

## Features

- Kanban view for child notes.
- Change an item of board by drag-and-drop.
- Reorder boards and items by drag-and-drop.
- Click on an item to open the note.
- Custom template for Kanban view (easy setup).
- Button to create child note on each board.

## Planned changes

- Button to add a board.
- Move the "+" button at bottom of boards.
- Remove "min-height" of boards
- Add an input for new item title.
- Set default position of new items to be the last of each boards.
- Don't auto open new items when created.

## Create a Kanban board

### Using the template

- Right-click on a note and select `Insert child note > Kanban View`.

### From scratch

- Create a note of type `Render Note`.
  - Give this note the `renderNote` relation that points to the kanban integration note (`~renderNote=kanban`).
  - Give this note the `sorted` label with a value of `sortOrder` (`#sorted=sortOrder`).
- Create a board by creating a sub-note of the main `Render Note` you created above.
- Create an item by creating a sub-note of a board.

## Credits
- [Trilium Notes](https://github.com/zadam/trilium)
- [jKanban](https://github.com/riktar/jkanban)
