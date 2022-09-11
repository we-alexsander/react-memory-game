import { GridItemType } from "../../types/GridItemType";
import * as styles from "./styles";

import b7Icon from "../../svgs/b7.svg";

import { items } from "../../data/items";

type Props = {
  item: GridItemType;
  onClick: () => void;
};

const GridItem = ({ item, onClick }: Props) => {
  return (
    <styles.Container
      showBackground={item.permanentShown || item.shown}
      onClick={onClick}
    >
      {!item.permanentShown && !item.shown && (
        <styles.Icon src={b7Icon} alt="" opacity={0.1} />
      )}
      {(item.permanentShown || item.shown) && item.item !== null && (
        <styles.Icon src={items[item.item].icon} alt="" />
      )}
    </styles.Container>
  );
};

export default GridItem;
