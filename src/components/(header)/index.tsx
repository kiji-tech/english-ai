import styles from './index.module.scss';
import SideMenu from '../(side.menu)';

type HeaderProps = {
    isMenu?: boolean;
};

export default function Header({ isMenu = true }: HeaderProps) {
    return (
        <div className={styles.header}>
            {/* アイコン */}
            {isMenu ? <SideMenu /> : null}
            <div className={styles.appName}>APP Name</div>
            <div></div>
        </div>
    );
}
