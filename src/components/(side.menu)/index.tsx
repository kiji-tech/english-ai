'use client';
import styles from './index.module.scss';
import { Avatar, Text } from 'kiji-tech-ui-component';
import Link from 'next/link';
import { useState } from 'react';
import { TfiClose, TfiMenu } from 'react-icons/tfi';

const SideMenu = () => {
    const [isView, setIsView] = useState(false);

    const handleView = () => {
        setIsView(!isView);
    };

    return (
        <>
            <div className={styles.sideMenuButton} onClick={handleView}>
                {isView ? <TfiClose /> : <TfiMenu />}
            </div>
            <div className={`${styles.sideMenu} ${isView ? styles.open : null}`}>
                {/* アカウントアバター */}
                <div className={styles.profile}>
                    <Avatar size="md" />
                    <div className="space"></div>
                    <Text text="name@xxxx" />
                </div>
                <div className={styles.scoreAreaHead}>
                    {/* 平均スコア */}
                    <p>
                        平均スコア
                        <br />
                        （x / 50）
                    </p>
                    <p>連続日記数</p>
                </div>
                <div className={styles.scoreAreaBody}>
                    <div>{/* サークル */}</div>
                    {/* 連続日記数 */}
                    <p>20日</p>
                </div>
                {/* リンク */}
                <Link className={styles.link} href="/home">
                    Home
                </Link>
                <Link className={styles.link} href="/corrections">
                    AI解析一覧
                </Link>
                <Link className={styles.link} href="/settings">
                    設定
                </Link>
                <Link className={styles.link} href="/qa">
                    Q&A
                </Link>
                <Link className={styles.link} href="/qa">
                    お問い合わせ
                </Link>
                <div className={styles.menuFooter}>English-AI version0.0.1</div>
            </div>
        </>
    );
};
export default SideMenu;
