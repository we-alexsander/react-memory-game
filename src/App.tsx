import * as styles from "./App.styles";

import logoImage from "./assets/devmemory_logo.png";
import restartIcon from "./svgs/restart.svg";

import Button from "./components/Button";
import InfoItem from "./components/InfoItem";
import GridItem from "./components/GridItem";

import { useEffect, useState } from "react";
import { items } from "./data/items";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";

import { GridItemType } from "./types/GridItemType";

const App = () => {
  const [playing, setPlaying] = useState<Boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      playing ? setTimeElapsed(timeElapsed + 1) : "";
    }, 1000);

    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // Verify if opened are equal
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter((item) => item.shown);
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          // If both are equal, make every shown permanent
          let tmpGrid = [...gridItems];

          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        } else {
          // If they are NOT equal, close all shown
          setTimeout(() => {
            let tmpGrid = [...gridItems];

            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 1000);
        }

        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [shownCount, gridItems]);

  useEffect(() => {
    moveCount > 0 && gridItems.every((item) => item.permanentShown)
      ? setPlaying(false)
      : "";
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    // Reset the game
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // Create a empty grid
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });
    }

    // Fill a grid
    for (let w = 0; w < 2; w++) {
      for (let x = 0; x < items.length; x++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item != null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = x;
      }
    }

    // Put in state
    setGridItems(tmpGrid);

    // Play the game
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];

      if (!tmpGrid[index].permanentShown && !tmpGrid[index].shown) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }

      setGridItems(tmpGrid);
    }
  };

  return (
    <styles.Container>
      <styles.Info>
        <styles.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </styles.LogoLink>

        <styles.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </styles.InfoArea>

        <Button
          label="Reiniciar"
          icon={restartIcon}
          onClick={resetAndCreateGrid}
        ></Button>
      </styles.Info>
      <styles.GridArea>
        <styles.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => {
                handleItemClick(index);
              }}
            />
          ))}
        </styles.Grid>
      </styles.GridArea>
    </styles.Container>
  );
};

export default App;
