import styles from './Button.module.css';

type ButtonProps = {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
  Icon,
  text,
  onClick,
}: ButtonProps) => {
  return (
    <div className={styles.button}>
      <button type='button' onClick={onClick}>
        {Icon ? <Icon /> : undefined}
        <span>{text}</span>
      </button>
    </div>
  );
};

export default Button;
