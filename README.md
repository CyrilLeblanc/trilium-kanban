# trilium-kanban
A Kanban integration for Trilium Notes

![Demo](screenshots/demo.gif)

## Installation

1. Download the latest release from the [releases page](https://github.com/CyrilLeblanc/trilium-kanban/releases)
2. Import the `.zip` file into Trilium by right-clicking on a note and selecting `Import into note`.
3. Setup a Kanban board. See [Usage](#usage) for more details.

## Features

- Kanban view for child notes.
- Change an item of board by drag-and-drop.
- Reorder boards by drag-and-drop.
- Click on an item to open the note.

## Planned changes

- Reorder items in a board by drag-and-drop.
- Add a template for a Kanban view (easy setup).
- Add buttons to create boards and items.

## Create a Kanban board

- Create a note of type `Render Note`.
- Add the relation to `~renderNote=kanban` HTML note.
- Add the label `#sorted=sortOrder`.
- Create a board by creating a sub-note.
- Create an item by creating a sub-note of a board.

## Credits
- [Trilium Notes](https://github.com/zadam/trilium)
- [jKanban](https://github.com/riktar/jkanban)
