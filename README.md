# Game2048

# Description

This is a web-based implementation of the popular 2048 game. Players slide numbered tiles on a 4x4 grid to combine them and reach the 2048 tile. The game features a dynamic score counter, restart button, animated tiles, and mobile-friendly design.

# Features

⦁	Playable in Browser using HTML, CSS, and JavaScript
⦁	Keyboard Controls: Arrow keys for moving tiles
⦁	Swipe Controls: Touch gestures for mobile devices
⦁	Score Tracking: Updates dynamically as tiles merge
⦁	Win/Loss Detection: Alerts when player wins (2048) or loses (no moves left)
⦁	Restart Button: Resets the game anytime
⦁	Dynamic Tile Colors & Sizes: Matches official 2048 game style
⦁	Animations: New tiles pop with smooth animation
⦁	Responsive Design: Works on desktop, tablet, and mobile

# Installation

1.	Clone or download this repository.
2. Make sure the following files are present:
   ⦁ index.html
   ⦁ style.css
   ⦁ script.js
3. Open index.html in any modern web browser (Chrome, Firefox, Edge, Safari).


# How to Play

1.	Use Arrow Keys (← ↑ → ↓) on desktop or swipe on mobile to move tiles.
2.	Combine tiles with the same number to increase their value.
3.	The score increases each time tiles merge.
4.	The game ends when no more moves are possible.
5.	The goal is to reach the 2048 tile.
6.	Click the Restart Game button to start over anytime.

# Implementation Details

⦁	Board Representation: 2D JavaScript array (board[4][4])
⦁	Tile Movement: Functions moveLeft(), moveRight(), moveUp(), moveDown() handle sliding and merging
⦁	New Tiles: Randomly generated (2 or 4) in empty cells after each move
⦁	Animations: CSS @keyframes pop used for new tiles
⦁	Responsive Layout: Media queries adjust tile size, font, and spacing for small screens

# Technologies Used

⦁	HTML5: Game structure
⦁	CSS3: Styling, colors, responsive design, animations
⦁	JavaScript (ES6): Game logic, moves, merges, score tracking, win/loss detection, keyboard and touch controls.