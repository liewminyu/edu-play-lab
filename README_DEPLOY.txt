Edu Play Lab — Shared Module Refactor
===================================

Deploy these folders/files together at the repository root:

index.html
games/
shared/
tools/

Shared files
------------
shared/game-setup.css
  The approved universal Game Setup appearance.

shared/game-setup.js
  Player entry, direct group typing/pasting, drag-and-drop, touch support,
  Undo/Redo, Randomize, Add player names to game, Game_Setup.txt import/export,
  validation and localStorage persistence.

shared/player-scheduler.js
  Shared 30-player scheduling for the ten-round Battle Royale/Race/Cooperative
  formats and the Jeopardy format.

Game files now contain only thin adapters to these shared modules. Future
Game Setup changes should be made in shared/game-setup.css or
shared/game-setup.js rather than copied into each game. Scheduler changes
should be made in shared/player-scheduler.js.

New tools
---------
tools/Make_a_Pattern.html
tools/Shape_Architect.html

Important
---------
Keep the existing previews/ folder in the GitHub repository. The updated
index still references the existing preview GIFs. The two new tools use an
inline fallback preview until you add dedicated GIFs later.

The current refactor intentionally preserves the existing 30-player /
6-groups-of-5 / 10-round rules. Flexible player counts can now be implemented
centrally in the shared modules in a later pass.
