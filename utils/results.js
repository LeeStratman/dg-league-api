const calculateEventResults = (scorecards) => {
  const totals = scorecards.reduce((acc, scorecard) => {
    if (scorecard.status === "complete") {
      const scorecardScores = scorecard.scores.map((score) => {
        const total = score.holes.reduce((acc, hole) => acc + hole, 0);
        return { player: score.player, total };
      });
      return [...acc, ...scorecardScores];
    }
    return [...acc];
  }, []);

  const sortedPlayers = sortResults(totals);

  return sortedPlayers.map((player, index) => {
    const nextPlayers = sortedPlayers.slice(index + 1);
    const prevPlayers = sortedPlayers.slice(0, index);
    const nextPoints = nextPlayers.reduce((acc, nextPlayer) => {
      if (nextPlayer.total === player.total) {
        return acc + 0.5;
      } else {
        return acc + 1;
      }
    }, 0);

    const prevPoints = prevPlayers.reduce((acc, prevPlayer) => {
      if (prevPlayer.total === player.total) {
        return acc + 0.5;
      } else {
        return acc + 0;
      }
    }, 0);
    return { ...player, points: nextPoints + prevPoints };
  });
};

const sortResults = (results) => {
  if (results.length < 2) {
    return results;
  }

  const middle = Math.floor(results.length / 2);
  const left = results.slice(0, middle);
  const right = results.slice(middle);
  return mergeResults(sortResults(left), sortResults(right));
};

const mergeResults = (left, right) => {
  const sorted = [];
  while (left.length && right.length) {
    if (left[0].total <= right[0].total) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }

  const results = [...sorted, ...left, ...right];
  return results;
};

module.exports = { calculateEventResults };
