# Day 02: Rock Paper Scissors

Suppose the following text:

```
A Y
B X
C Z
```

The first column is what your opponent is going to play,
the second column is what you play in response:

```
A: Rock
B: Paper
C: Scissors
---
X: Rock
Y: Paper
Z: Scissors
```

Rock defeats Scissors,
Scissors defeats Paper,
and Paper defeats Rock.
If both players choose the same shape,
the round instead ends in a draw.

A single round is calculated by `yourShape + outcome`:

```
Rock: 1
Paper: 2
Scissors: 3
---
Lost: 0
Draw: 3
Won: 6
```

Your total score is the sum of your scores for each round.
