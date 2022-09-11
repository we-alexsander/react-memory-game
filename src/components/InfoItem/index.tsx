import * as styles from "./styles";

type Props = {
  label: string;
  value: string;
};

const InfoItem = ({ label, value }: Props) => {
  return (
    <styles.Container>
      <styles.Label>{label}</styles.Label>
      <styles.Value>{value}</styles.Value>
    </styles.Container>
  );
};

export default InfoItem;
