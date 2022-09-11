import * as styles from "./styles";

type Props = {
  label: string;
  icon?: any;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const Button = ({ label, icon, onClick }: Props) => {
  return (
    <styles.Container onClick={onClick}>
      {icon && (
        <styles.IconArea>
          <styles.Icon src={icon} />
        </styles.IconArea>
      )}
      <styles.Label>{label}</styles.Label>
    </styles.Container>
  );
};

export default Button;
