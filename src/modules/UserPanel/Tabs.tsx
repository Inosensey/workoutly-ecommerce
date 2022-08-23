import styles from "../../../styles/UserPanel/Tabs.module.css";

interface Props {
  current: string;
  tabList: Array<string>;
  setCurrentTab: any;
}

function Tabs({ current, tabList, setCurrentTab }: Props) {
  return (
    <div className={styles.tabContainer}>
      <ul className={styles.tabs}>
        {tabList.map((tab: string, index) => (
          <li
            key={Math.random() * 1000}
            style={{
              borderBottom: current === tab ? "1px solid #ff7777" : "none",
            }}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tabs;
