import { FC } from "react";

interface Props {
  count: number;
}

const Filter: FC<Props> = (props: Props) => {
  const { count } = props;

  const filterName = ["All", "Active", "Completed"];

  const handleClick = (target: EventTarget & HTMLInputElement) => {
    const buttons = document.querySelectorAll("#filter-button");
    buttons.forEach((btn) => {
      btn.className = "filter-button";
    });
    target.className = "filter-button actived";
  };

  return (
    <div className="filter-container">
      <h2>{count} tasks</h2>
      <div className="filters">
        {filterName.map((filter: string) => (
          <input
            id="filter-button"
            key={filter}
            type="button"
            className="filter-button"
            value={filter}
            onClick={(e) => handleClick(e.currentTarget)}
          />
        ))}
      </div>
    </div>
  );
};

export default Filter;
